export default class MockFeatureLoader<T> {
  cache: Map<string, T> = new Map();

  fetch: unknown = (key: string) => Promise.resolve(key);

  clear() {
    this.cache.clear();
  }

  getFeature(key: string): T | null {
    const value = this.cache.get(key);

    return typeof value === 'undefined' ? null : value;
  }

  loadFeature(key: string): Promise<T | null> {
    return Promise.resolve(this.getFeature(key));
  }

  isCached(key: string): boolean {
    return this.cache.has(key);
  }

  extendOnlyForUseInTests(extension: { [key: string]: T }) {
    Object.keys(extension).forEach(key => {
      this.cache.set(key, extension[key]);
    });
  }
}
