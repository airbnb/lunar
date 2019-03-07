import MessageBundle from '../../src/utils/MessageBundle';

describe('MessageBundle', () => {
  let data: MessageBundle;

  beforeEach(() => {
    data = new MessageBundle({
      en: 'Hello',
      fr: 'Bonjour',
    });
  });

  it('returns the locale message if it exists', () => {
    expect(data.get('fr')).toBe('Bonjour');
  });

  it('returns the default locale message if it does not exist', () => {
    data.options.default = 'Hallo';

    expect(data.get('de')).toBe('Hallo');
  });

  it('returns the english locale message if it does not exist', () => {
    expect(data.get('es')).toBe('Hello');
  });
});
