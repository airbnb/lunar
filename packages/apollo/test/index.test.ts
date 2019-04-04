import ApolloClient from 'apollo-client';
import Apollo, { Settings, HttpLink } from '../src';

describe('Apollo', () => {
  let oldSettings: Required<Settings>;

  beforeEach(() => {
    oldSettings = Apollo.settings;

    // @ts-ignore
    global.fetch = () => Promise.resolve();
  });

  afterEach(() => {
    Apollo.settings = oldSettings;
  });

  describe('initialize()', () => {
    it('sets settings', () => {
      const link = new HttpLink();

      Apollo.initialize({
        links: [link],
      });

      expect(Apollo.settings).toEqual(
        expect.objectContaining({
          links: [link],
        }),
      );
    });

    it('calls boostrap functions', () => {
      const bootApollo = jest.spyOn(Apollo, 'bootstrapClient');

      Apollo.initialize();

      expect(bootApollo).toHaveBeenCalled();

      bootApollo.mockRestore();
    });
  });

  describe('bootstrapClient()', () => {
    it('creates an apollo instance', () => {
      Apollo.bootstrapClient();

      expect(Apollo.getClient()).toBeInstanceOf(ApolloClient);
    });

    it('returns the same instance', () => {
      Apollo.bootstrapClient();

      expect(Apollo.getClient()).toBe(Apollo.getClient());
    });
  });

  describe('getClient()', () => {
    it('errors if client not initialized', () => {
      expect(() => {
        // @ts-ignore
        delete Apollo.client;

        Apollo.getClient();
      }).toThrowErrorMatchingSnapshot();
    });
  });
});
