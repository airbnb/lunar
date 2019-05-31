import Aesthetic from 'aesthetic-adapter-aphrodite';
import { Settings as LuxonSettings } from 'luxon';
import Core, { Settings } from '../src';

describe('Core', () => {
  let oldSettings: Required<Settings>;

  beforeEach(() => {
    oldSettings = { ...Core.settings };
  });

  afterEach(() => {
    Core.settings = oldSettings;
  });

  describe('initialize()', () => {
    it('sets settings', () => {
      Core.initialize({
        name: 'Lunar',
        defaultLocale: 'ja',
      });

      expect(Core.settings).toEqual(
        expect.objectContaining({
          defaultLocale: 'ja',
        }),
      );
    });

    it('calls boostrap functions', () => {
      const bootAesthetic = jest.spyOn(Core, 'bootstrapAesthetic');
      const bootLuxon = jest.spyOn(Core, 'bootstrapLuxon');

      Core.initialize({
        name: 'Lunar',
      });

      expect(bootAesthetic).toHaveBeenCalled();
      expect(bootLuxon).toHaveBeenCalled();

      bootAesthetic.mockRestore();
      bootLuxon.mockRestore();
    });
  });

  describe('bootstrapAesthetic()', () => {
    it('creates an aesthetic instance', () => {
      Core.bootstrapAesthetic();

      expect(Core.getAesthetic()).toBeInstanceOf(Aesthetic);
    });
  });

  describe('bootstrapLuxon()', () => {
    it('calls airbnb Core', () => {
      Core.settings.defaultLocale = 'de';
      Core.settings.defaultTimezone = 'America/Los_Angeles';
      Core.bootstrapLuxon();

      expect(LuxonSettings.defaultLocale).toBe('de');
      expect(LuxonSettings.defaultZoneName).toBe('America/Los_Angeles');

      LuxonSettings.defaultLocale = 'en';
      LuxonSettings.defaultZoneName = 'UTC';
    });
  });

  describe('fontFamily()', () => {
    it('returns Japanese font family', () => {
      Core.settings.defaultLocale = 'ja';

      expect(Core.fontFamily()).toContain('ヒラギノ角ゴ Pro');
    });

    it('returns Korean font family', () => {
      Core.settings.defaultLocale = 'ko';

      expect(Core.fontFamily()).toContain('나눔 고딕');
    });

    it('returns Chinese font family', () => {
      Core.settings.defaultLocale = 'zh';

      expect(Core.fontFamily()).toContain('华文细黑');
    });

    it('returns default font family', () => {
      Core.settings.defaultLocale = 'en';

      expect(Core.fontFamily()).toContain('-apple-system');
    });
  });

  describe('locale()', () => {
    it('returns the `defaultLocale` setting', () => {
      Core.settings.defaultLocale = 'de';

      expect(Core.locale()).toBe('de');
    });

    it('returns the default locale constant when empty', () => {
      // @ts-ignore Allow empty
      Core.settings.defaultLocale = '';

      expect(Core.locale()).toBe('en');
    });
  });

  describe('log()', () => {
    it('doesnt log if no logger', () => {
      const spy = jest.fn();

      Core.log(new Error('Ooops'), {});

      expect(spy).not.toHaveBeenCalled();
    });

    it('logs if logger is defined', () => {
      const spy = jest.fn();

      Core.settings.logger = spy;
      Core.log(new Error('Ooops'), {});

      expect(spy).toHaveBeenCalledWith(new Error('Ooops'), {});
    });
  });

  describe('timezone()', () => {
    it('returns the `defaultTimezone` setting', () => {
      Core.settings.defaultTimezone = 'America/Los_Angeles';

      expect(Core.timezone()).toBe('America/Los_Angeles');
    });

    it('returns the default timezone constant when empty', () => {
      // @ts-ignore Allow empty
      Core.settings.defaultTimezone = '';

      expect(Core.timezone()).toBe('UTC');
    });
  });

  describe('translate()', () => {
    describe('with no translator', () => {
      beforeEach(() => {
        Core.settings.translator = null;
      });

      it('returns string as is if no tokens', () => {
        expect(Core.translate('Hello', {}, '')).toBe('Hello');
      });

      it('replaces tokens with values', () => {
        expect(
          Core.translate(
            'Normal %{foo} underscore %{bar_baz} camel case %{bazQux} with numbers %{qux123} and undefined %{undef}',
            {
              foo: 123,
              bar_baz: 'abc',
              bazQux: 'ab12',
              qux123: 456.7,
            },
            '',
          ),
        ).toBe('Normal 123 underscore abc camel case ab12 with numbers 456.7 and undefined ');
      });

      it('handles singular and places', () => {
        expect(Core.translate('Item||||Items', {}, '')).toBe('Items');
        expect(Core.translate('Item||||Items', { smartCount: 0 }, '')).toBe('Items');
        expect(Core.translate('Item||||Items', { smartCount: 1 }, '')).toBe('Item');
        expect(Core.translate('Item||||Items', { smartCount: 2 }, '')).toBe('Items');
      });
    });
  });
});
