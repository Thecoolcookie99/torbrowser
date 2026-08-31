export type TorCircuit = {
  id: string;
  host: string;
  port: number;
  createdAt: number;
  lastUsedAt: number;
  alive: boolean;
};

export type TorState = {
  connected: boolean;
  controlPort: string;
  socksPort: number;
  circuitId: string | null;
  lastUsedAt: number;
  activeCircuitCount: number;
  activeCircuitHost: string | null;
  lastError: string | null;
};

export class TorConnectionManager {
  private static instance: TorConnectionManager | null = null;
  private state: TorState = {
    connected: false,
    controlPort: '127.0.0.1:9051',
    socksPort: 9050,
    circuitId: null,
    lastUsedAt: 0,
    activeCircuitCount: 0,
    activeCircuitHost: null,
    lastError: null,
  };

  private circuits = new Map<string, TorCircuit>();
  private socket: { connected: boolean; openedAt: number } | null = null;

  static getInstance(): TorConnectionManager {
    if (!this.instance) {
      this.instance = new TorConnectionManager();
    }
    return this.instance;
  }

  async ensureConnected(): Promise<void> {
    const now = Date.now();
    if (this.state.connected && this.socket && now - this.state.lastUsedAt < 60000) {
      this.state.lastUsedAt = now;
      return;
    }

    this.socket = { connected: true, openedAt: now };
    this.state.connected = true;
    this.state.lastUsedAt = now;
    this.state.lastError = null;
  }

  async createCircuitForHost(host: string): Promise<string> {
    await this.ensureConnected();
    const circuitHost = host.toLowerCase();
    const existing = this.circuits.get(circuitHost);
    if (existing && existing.alive) {
      existing.lastUsedAt = Date.now();
      this.state.circuitId = existing.id;
      this.state.activeCircuitHost = circuitHost;
      this.state.activeCircuitCount = this.circuits.size;
      return existing.id;
    }

    const circuitId = `circuit-${circuitHost}-${Date.now()}`;
    const circuit: TorCircuit = {
      id: circuitId,
      host: circuitHost,
      port: 80,
      createdAt: Date.now(),
      lastUsedAt: Date.now(),
      alive: true,
    };

    this.circuits.set(circuitHost, circuit);
    this.state.circuitId = circuitId;
    this.state.activeCircuitHost = circuitHost;
    this.state.activeCircuitCount = this.circuits.size;
    return circuitId;
  }

  async connectToOnion(host: string, port: number): Promise<{ host: string; port: number; circuitId: string }> {
    const circuitId = await this.createCircuitForHost(host);
    return { host, port, circuitId };
  }

  getState(): TorState {
    return { ...this.state };
  }

  markDead(host: string): void {
    const circuit = this.circuits.get(host.toLowerCase());
    if (circuit) {
      circuit.alive = false;
    }
    this.state.lastError = `Dead circuit for ${host}`;
  }
}
