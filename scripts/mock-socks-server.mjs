import net from 'node:net';

const host = process.env.MOCK_SOCKS_HOST ?? '127.0.0.1';
const port = Number(process.env.MOCK_SOCKS_PORT ?? 19050);

const page = `<!DOCTYPE html>
<html>
  <head>
    <title>Mock Onion Loaded</title>
    <style>.hero{background:url("/hero.png")}</style>
  </head>
  <body>
    <h1>Loaded through mock onion service</h1>
    <a href="/login">Login</a>
    <img src="/logo.png" alt="Logo">
  </body>
</html>`;

const server = net.createServer((socket) => {
  let stage = 'greeting';
  let buffered = Buffer.alloc(0);

  socket.on('data', (chunk) => {
    buffered = Buffer.concat([buffered, chunk]);

    if (stage === 'greeting' && buffered.length >= 3) {
      const methodCount = buffered[1];
      if (buffered.length < 2 + methodCount) return;
      buffered = buffered.subarray(2 + methodCount);
      socket.write(Buffer.from([0x05, 0x00]));
      stage = 'connect';
    }

    if (stage === 'connect' && buffered.length >= 7) {
      if (buffered[0] !== 0x05 || buffered[1] !== 0x01 || buffered[3] !== 0x03) {
        socket.destroy();
        return;
      }

      const domainLength = buffered[4];
      const requestLength = 4 + 1 + domainLength + 2;
      if (buffered.length < requestLength) return;

      buffered = buffered.subarray(requestLength);
      socket.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 127, 0, 0, 1, 0x50, 0x00]));
      stage = 'http';
    }

    if (stage === 'http') {
      const marker = buffered.indexOf('\r\n\r\n');
      if (marker === -1) return;

      const body = Buffer.from(page);
      socket.end([
        'HTTP/1.1 200 OK',
        'Content-Type: text/html',
        `Content-Length: ${body.length}`,
        'Connection: close',
        '',
        '',
      ].join('\r\n') + page);
      stage = 'done';
    }
  });
});

server.listen(port, host, () => {
  console.log(`mock SOCKS5 server listening on ${host}:${port}`);
});
