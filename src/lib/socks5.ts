const SOCKS_VERSION = 0x05;
const NO_AUTH = 0x00;
const USERNAME_PASSWORD_AUTH = 0x02;
const NO_ACCEPTABLE_METHODS = 0xff;

const STATUS_MESSAGES = new Map<number, string>([
  [0x00, 'succeeded'],
  [0x01, 'general SOCKS server failure'],
  [0x02, 'connection not allowed by ruleset'],
  [0x03, 'network unreachable'],
  [0x04, 'host unreachable'],
  [0x05, 'connection refused'],
  [0x06, 'TTL expired'],
  [0x07, 'command not supported'],
  [0x08, 'address type not supported'],
]);

export type Socks5Greeting = {
  method: number;
};

export type Socks5Reply = {
  status: number;
  bndAddr: string;
  bndPort: number;
};

export function buildSocks5Greeting(useUsernamePasswordAuth = false): Uint8Array {
  return useUsernamePasswordAuth
    ? new Uint8Array([SOCKS_VERSION, 0x02, NO_AUTH, USERNAME_PASSWORD_AUTH])
    : new Uint8Array([SOCKS_VERSION, 0x01, NO_AUTH]);
}

export function parseSocks5GreetingReply(buffer: Uint8Array): Socks5Greeting {
  if (buffer.length !== 2 || buffer[0] !== SOCKS_VERSION) {
    throw new Error('Invalid SOCKS5 greeting reply.');
  }

  if (buffer[1] === NO_ACCEPTABLE_METHODS) {
    throw new Error('SOCKS5 proxy did not accept any offered authentication method.');
  }

  if (buffer[1] !== NO_AUTH && buffer[1] !== USERNAME_PASSWORD_AUTH) {
    throw new Error(`SOCKS5 proxy selected unsupported authentication method 0x${buffer[1].toString(16)}.`);
  }

  return { method: buffer[1] };
}

export function buildSocks5UsernamePasswordAuthRequest(username: string, password: string): Uint8Array {
  const encodedUsername = new TextEncoder().encode(username);
  const encodedPassword = new TextEncoder().encode(password);

  if (encodedUsername.length > 255 || encodedPassword.length > 255) {
    throw new Error('SOCKS5 username and password must each be 255 bytes or shorter.');
  }

  const request = new Uint8Array(3 + encodedUsername.length + encodedPassword.length);
  let offset = 0;
  request[offset++] = 0x01;
  request[offset++] = encodedUsername.length;
  request.set(encodedUsername, offset);
  offset += encodedUsername.length;
  request[offset++] = encodedPassword.length;
  request.set(encodedPassword, offset);

  return request;
}

export function parseSocks5UsernamePasswordAuthReply(buffer: Uint8Array): void {
  if (buffer.length !== 2 || buffer[0] !== 0x01) {
    throw new Error('Invalid SOCKS5 username/password authentication reply.');
  }

  if (buffer[1] !== 0x00) {
    throw new Error('SOCKS5 username/password authentication failed.');
  }
}

export function buildSocks5ConnectRequest(host: string, port: number): Uint8Array {
  const domain = new TextEncoder().encode(host);
  if (domain.length === 0 || domain.length > 255) {
    throw new Error('SOCKS5 domain names must be between 1 and 255 bytes.');
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('SOCKS5 port must be an integer between 1 and 65535.');
  }

  const header = new Uint8Array(4 + 1 + domain.length + 2);
  let offset = 0;

  header[offset++] = SOCKS_VERSION;
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

export function parseSocks5Reply(buffer: Uint8Array): Socks5Reply {
  if (buffer.length < 6 || buffer[0] !== SOCKS_VERSION || buffer[2] !== 0x00) {
    throw new Error('Invalid SOCKS5 connect reply.');
  }

  const status = buffer[1];
  const addrType = buffer[3];
  let offset = 4;

  let bndAddr: string;
  if (addrType === 0x01) {
    assertLength(buffer, offset + 4 + 2);
    bndAddr = `${buffer[offset++]}.${buffer[offset++]}.${buffer[offset++]}.${buffer[offset++]}`;
  } else if (addrType === 0x03) {
    assertLength(buffer, offset + 1);
    const len = buffer[offset++];
    assertLength(buffer, offset + len + 2);
    bndAddr = new TextDecoder().decode(buffer.subarray(offset, offset + len));
    offset += len;
  } else if (addrType === 0x04) {
    assertLength(buffer, offset + 16 + 2);
    const bytes = Array.from(buffer.subarray(offset, offset + 16));
    bndAddr = bytes
      .reduce<string[]>((parts, byte, index) => {
        if (index % 2 === 0) {
          parts.push(byte.toString(16).padStart(2, '0'));
        } else {
          parts[parts.length - 1] += byte.toString(16).padStart(2, '0');
        }
        return parts;
      }, [])
      .join(':');
    offset += 16;
  } else {
    throw new Error(`Unsupported SOCKS5 reply address type 0x${addrType.toString(16)}.`);
  }

  const bndPort = (buffer[offset] << 8) | buffer[offset + 1];
  return { status, bndAddr, bndPort };
}

export function socks5StatusMessage(status: number): string {
  return STATUS_MESSAGES.get(status) ?? `unknown SOCKS5 status 0x${status.toString(16)}`;
}

function assertLength(buffer: Uint8Array, requiredLength: number): void {
  if (buffer.length < requiredLength) {
    throw new Error('Truncated SOCKS5 reply.');
  }
}
