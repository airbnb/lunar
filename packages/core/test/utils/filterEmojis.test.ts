import filterEmojis from '../../src/utils/filterEmojis';

describe('filterEmojis()', () => {
  it('removes emojis', () => {
    expect(filterEmojis('Foo 😶 Bar')).toBe('Foo  Bar');
  });

  it('removes surrogate and complex emojis', () => {
    expect(filterEmojis('Foo 👨‍👨‍👦‍👦 Bar 🧟‍♂️ Baz')).toBe('Foo  Bar  Baz');
  });

  it('doesnt remove whitelisted emojis', () => {
    expect(filterEmojis('Foo 👨‍👨‍👦‍👦 Bar 🧟‍♂️ Baz', ['1F9DF-2642'])).toBe('Foo  Bar 🧟‍♂️ Baz');
  });
});
