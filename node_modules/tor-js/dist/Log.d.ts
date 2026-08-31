export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error';
interface LogConstructorParams {
    rawLog?: (level: LogLevel, ...args: unknown[]) => void;
    parentStartTime?: number;
    namePrefix?: string;
}
export declare class Log {
    private rawLog;
    private parentStartTime;
    private namePrefix;
    constructor(params?: LogConstructorParams);
    child(name: string): Log;
    trace(...args: unknown[]): void;
    debug(...args: unknown[]): void;
    info(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    error(...args: unknown[]): void;
    /** @internal Create a callback for WASM setLogCallback */
    _makeWasmCallback(): (level: string, target: string, message: string) => void;
    private log;
    private defaultRawLog;
}
export {};
//# sourceMappingURL=Log.d.ts.map