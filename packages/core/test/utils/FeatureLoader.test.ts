import FeatureLoader from '../../src/utils/FeatureLoader';

describe('FeatureLoader', () => {
  let loader: FeatureLoader<string>;

  beforeEach(() => {
    loader = new FeatureLoader(() => Promise.resolve());
  });

  describe('clear()', () => {
    it('clears all cache', () => {
      loader.cache.set('foo', 'a');
      loader.cache.set('bar', 'b');
      loader.cache.set('baz', 'c');

      expect(loader.cache.size).toBe(3);

      loader.clear();

      expect(loader.cache.size).toBe(0);
    });
  });

  describe('getFeature()', () => {
    it('returns null when no cache found', () => {
      expect(loader.getFeature('foo')).toBeNull();
    });

    it('returns value when cache found', () => {
      loader.cache.set('foo', 'abc');

      expect(loader.getFeature('foo')).toBe('abc');
    });

    it('returns falsy value when cache found', () => {
      loader.cache.set('foo', '');

      expect(loader.getFeature('foo')).toBe('');
    });
  });

  describe('loadFeature()', () => {
    it('returns the cached value as a promise', async () => {
      loader.cache.set('foo', 'abc');

      const value = await loader.loadFeature('foo');

      expect(value).toBe('abc');
    });

    it('returns the cached promise', async () => {
      loader.promises.set('foo', Promise.resolve('123'));

      const value = await loader.loadFeature('foo');

      expect(value).toBe('123');
    });

    it('sets a promise when fetching', async () => {
      expect(loader.promises.has('foo')).toBe(false);

      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 50);
      });

      loader.fetch = () => promise;
      loader.loadFeature('foo');

      expect(loader.promises.has('foo')).toBe(true);

      await promise;
    });

    it('deletes a promise when fetched and returns the value', async () => {
      expect(loader.promises.has('foo')).toBe(false);

      loader.fetch = (key, force, cache) => {
        cache.set(key, 'xyz');

        return Promise.resolve('xyz');
      };

      const value = await loader.loadFeature('foo');

      expect(value).toBe('xyz');
      expect(loader.promises.has('foo')).toBe(false);
    });

    it('re-uses promises if one is pending', async () => {
      let callCount = 0;

      loader.fetch = () => {
        callCount += 1;

        return Promise.resolve();
      };

      // Should be the identical promise:
      expect(loader.loadFeature('eq', true)).toEqual(loader.loadFeature('eq'));

      await Promise.all([
        loader.loadFeature('something'),
        loader.loadFeature('something'),
        loader.loadFeature('something'),
        loader.loadFeature('something-else'),
      ]);

      expect(callCount).toEqual(3);
    });
  });

  describe('isCached()', () => {
    it('returns false when not cached', () => {
      expect(loader.isCached('foo')).toBe(false);
    });

    it('returns true when cached', () => {
      loader.cache.set('foo', 'abc');

      expect(loader.isCached('foo')).toBe(true);
    });
  });
});
