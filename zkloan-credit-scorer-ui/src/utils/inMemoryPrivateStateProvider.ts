/**
 * Simple in-memory private state provider for development.
 * This bypasses the levelPrivateStateProvider Buffer polyfill issues with Vite.
 * For production, consider using levelPrivateStateProvider with proper bundler configuration.
 */

interface PrivateStateProvider<T> {
  get(id: string): Promise<T | undefined>;
  set(id: string, state: T): Promise<void>;
  clear(id: string): Promise<void>;
}

const storage = new Map<string, unknown>();

export function inMemoryPrivateStateProvider<T>(): PrivateStateProvider<T> {
  return {
    async get(id: string): Promise<T | undefined> {
      return storage.get(id) as T | undefined;
    },
    async set(id: string, state: T): Promise<void> {
      storage.set(id, state);
    },
    async clear(id: string): Promise<void> {
      storage.delete(id);
    },
  };
}
