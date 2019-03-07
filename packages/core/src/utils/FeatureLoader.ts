type Fetcher<T> = (key: string, force: boolean, cache: Map<string, T>) => Promise<unknown>;

export default class FeatureLoader<T> {
  cache: Map<string, T> = new Map();

  fetch: Fetcher<T>;

  promises: Map<string, Promise<T | null>> = new Map();

  constructor(fetch: Fetcher<T>) {
    this.fetch = fetch;
  }

  clear() {
    this.cache.clear();
  }

  getFeature(key: string): T | null {
    const value = this.cache.get(key);

    return typeof value === 'undefined' ? null : value;
  }

  loadFeature(key: string, force: boolean = false): Promise<T | null> {
    if (this.cache.has(key) && !force) {
      return Promise.resolve(this.getFeature(key));
    }

    if (this.promises.has(key) && !force) {
      return this.promises.get(key)!;
    }

    const promise = this.fetch(key, force, this.cache).then(() => {
      this.promises.delete(key);

      return this.getFeature(key);
    });

    this.promises.set(key, promise);

    return promise;
  }

  isCached(key: string): boolean {
    return this.cache.has(key);
  }
}
