import { Log, TorClient, storage } from 'tor-js';

export const TOR_GATEWAY = (import.meta.env.VITE_TOR_GATEWAY || '').trim();

let torClientPromise = null;
let torClientInstance = null;

function createStorage() {
  try {
    if (typeof indexedDB !== 'undefined') {
      return new storage.IndexedDBStorage('onion-browser');
    }
  } catch {
    // Fall through to memory storage.
  }

  return new storage.MemoryStorage();
}

export function hasGatewayConfiguration() {
  return TOR_GATEWAY.length > 0;
}

export async function getTorClient({ onLog } = {}) {
  if (torClientInstance) {
    return torClientInstance;
  }

  if (!torClientPromise) {
    torClientPromise = (async () => {
      if (!hasGatewayConfiguration()) {
        throw new Error(
          'Tor gateway is not configured. Set VITE_TOR_GATEWAY to an ip:port:certhash gateway address.',
        );
      }

      const log = new Log({
        rawLog: (level, ...args) => {
          const message = args
            .map((value) => {
              if (typeof value === 'string') {
                return value;
              }
              try {
                return JSON.stringify(value);
              } catch {
                return String(value);
              }
            })
            .join(' ');

          onLog?.(level, message);
        },
      });

      const client = new TorClient({
        gateway: TOR_GATEWAY,
        storage: createStorage(),
        log,
        logLevel: 'info',
      });

      await client.ready();
      torClientInstance = client;
      return client;
    })();
  }

  return torClientPromise;
}

export async function closeTorClient() {
  if (torClientInstance) {
    torClientInstance.close();
    torClientInstance = null;
    torClientPromise = null;
  }
}
