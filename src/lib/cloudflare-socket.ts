import { connect } from 'cloudflare:sockets';

export type CloudflareTcpSession = {
  socket: any;
  openedAt: number;
};

export class CloudflareTcpConnectionPool {
  private sessions = new Map<string, CloudflareTcpSession>();

  async getOrCreate(host: string, port: number): Promise<CloudflareTcpSession> {
    const key = `${host}:${port}`;
    const existing = this.sessions.get(key);
    if (existing) {
      return existing;
    }

    const socket = connect({
      hostname: host,
      port,
    });

    const session: CloudflareTcpSession = {
      socket,
      openedAt: Date.now(),
    };

    this.sessions.set(key, session);
    return session;
  }

  close(host: string, port: number): void {
    const key = `${host}:${port}`;
    const session = this.sessions.get(key);
    if (session) {
      session.socket.close();
      this.sessions.delete(key);
    }
  }
}
