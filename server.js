const express = require('express');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFile } = require('child_process');
const WebSocket = require('ws');
const pty = require('node-pty');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3002);
const ROOT = __dirname;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(ROOT));

function send(ws, type, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type, data }));
  }
}

function removeDir(directory) {
  fs.rm(directory, { recursive: true, force: true }, () => {});
}

wss.on('connection', (ws) => {
  let child = null;
  let tempDir = null;
  let closed = false;

  const cleanup = () => {
    if (closed) return;
    closed = true;
    if (child) child.kill();
    if (tempDir) removeDir(tempDir);
  };

  ws.on('message', (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch {
      send(ws, 'error', 'Invalid WebSocket message.');
      return;
    }

    if (message.type === 'input' && child) {
      child.write(String(message.data || ''));
      return;
    }

    if (message.type === 'resize' && child) {
      const cols = Math.max(20, Math.min(240, Number(message.cols) || 80));
      const rows = Math.max(5, Math.min(100, Number(message.rows) || 24));
      child.resize(cols, rows);
      return;
    }

    if (message.type !== 'start' || child) return;

    const code = String(message.code || '');
    if (!code.trim()) {
      send(ws, 'error', 'C source is empty.');
      return;
    }

    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tyn-c-'));
    const sourcePath = path.join(tempDir, 'main.c');
    const exePath = path.join(tempDir, process.platform === 'win32' ? 'main.exe' : 'main');
    fs.writeFileSync(sourcePath, code, 'utf8');

    const gcc = process.platform === 'win32' ? 'gcc.exe' : 'gcc';
    execFile(gcc, ['-std=c11', '-O0', sourcePath, '-o', exePath], { cwd: tempDir }, (error, stdout, stderr) => {
      if (closed) return;
      if (error) {
        send(ws, 'compile-error', stderr || stdout || error.message);
        removeDir(tempDir);
        tempDir = null;
        return;
      }

      child = pty.spawn(exePath, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 24,
        cwd: tempDir,
        env: { ...process.env, TERM: 'xterm-256color' },
        useConpty: process.platform === 'win32'
      });

      child.onData((data) => send(ws, 'output', data));
      child.onExit(({ exitCode, signal }) => {
        send(ws, 'exit', { code: exitCode, signal });
        child = null;
        removeDir(tempDir);
        tempDir = null;
      });
    });
  });

  ws.on('close', cleanup);
  ws.on('error', cleanup);
});

server.listen(PORT, HOST, () => {
  console.log(`TYN Notes running at http://${HOST}:${PORT}`);
  console.log('Open dsa1.html and use the C playground.');
});
