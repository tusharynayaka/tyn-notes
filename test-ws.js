const WebSocket = require('ws');
const ws = new WebSocket('ws://127.0.0.1:3002');
ws.on('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({
    type: 'start',
    code: '#include <stdio.h>\nint main(){printf("hello world\\n");return 0;}'
  }));
});
ws.on('message', (d) => {
  const msg = JSON.parse(d.toString());
  console.log('TYPE:', msg.type, '|', JSON.stringify(msg.data).slice(0, 120));
  if (msg.type === 'exit' || msg.type === 'error' || msg.type === 'compile-error') {
    ws.close();
    process.exit(0);
  }
});
ws.on('error', (e) => { console.error('WS ERROR:', e.message); process.exit(1); });
setTimeout(() => { console.log('timeout'); ws.close(); process.exit(0); }, 8000);
