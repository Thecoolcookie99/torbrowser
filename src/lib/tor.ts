export type TorState = {
  connected: boolean;
  controlPort: string;
  socksPort: number;
  circuitId: string | null;
  lastUsedAt: number;
};

export class TorConnectionManager {
  private static instance: TorConnectionManager | null = null;
  private state: TorState = {
    connected: false,
    controlPort: '127.0.0.1:9051',
    socksPort: 9050,
    circuitId: null,
    lastUsedAt: 0,
  };

  static getInstance(): TorConnectionManager {
    if (!this.instance) {
      this.instance = new TorConnectionManager();
    }
    return this.instance;
  }

  async ensureConnected(): Promise<void> {
    const now = Date.now();
    if (this.state.connected && now - this.state.lastUsedAt < 30000) {
      this.state.lastUsedAt = now;
      return;
    }

    this.state.lastUsedAt = now;
    this.state.connected = true;
  }

  async createCircuitForHost(host: string): Promise<string> {
    await this.ensureConnected();
    const circuitId = `circuit-${host}-${Date.now()}`;
    this.state.circuitId = circuitId;
    return circuitId;
  }

  async connectToOnion(host: string, port: number): Promise<{ host: string; port: number }> {
    await this.createCircuitForHost(host);
    return { host, port };
  }

  getState(): TorState {
    return { ...this.state };
  }
}
