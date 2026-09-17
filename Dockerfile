FROM node:20-bookworm-slim

# Install GCC, G++, Make and Python for node-pty build and compiling C programs
RUN apt-get update && apt-get install -y gcc g++ make python3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV HOST=0.0.0.0
ENV PORT=3002
EXPOSE 3002

CMD ["npm", "start"]
