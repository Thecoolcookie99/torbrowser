export function buildSocks5ConnectRequest(host: string, port: number): Uint8Array {
  const domain = new TextEncoder().encode(host);
  const header = new Uint8Array(4 + 1 + domain.length + 2);
  let offset = 0;

  header[offset++] = 0x05;
  header[offset++] = 0x01;
  header[offset++] = 0x00;
  header[offset++] = 0x03;
  header[offset++] = domain.length;

  header.set(domain, offset);
  offset += domain.length;

  header[offset++] = (port >> 8) & 0xff;
  header[offset++] = port & 0xff;

  return header;
}

export function parseSocks5Reply(buffer: Uint8Array): { status: number; bndAddr: string; bndPort: number } {
  if (buffer.length < 10) {
    throw new Error('Invalid SOCKS5 reply');
  }

  const version = buffer[0];
  const status = buffer[1];
  const addrType = buffer[3];
  let offset = 4;

  let bndAddr = '0.0.0.0';
  if (addrType === 0x01) {
    bndAddr = `${buffer[offset++]}.${buffer[offset++]}.${buffer[offset++]}.${buffer[offset++]}`;
  } else if (addrType === 0x03) {
    const len = buffer[offset++];
    bndAddr = new TextDecoder().decode(buffer.subarray(offset, offset + len));
    offset += len;
  } else if (addrType === 0x04) {
    const bytes = Array.from(buffer.subarray(offset, offset + 16));
    bndAddr = bytes.map((b) => b.toString(16).padStart(2, '0')).join(':');
    offset += 16;
  }

  const bndPort = (buffer[offset] << 8) | buffer[offset + 1];
  return { status, bndAddr, bndPort };
}
