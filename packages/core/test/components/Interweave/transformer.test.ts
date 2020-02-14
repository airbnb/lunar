import { mountUseStyles } from '@airbnb/lunar-test-utils';
import transformer from '../../../src/components/Interweave/factories/transformer';
import Link from '../../../src/components/Link';

describe('transformer()', () => {
  it('replaces a tag with a link', () => {
    const a = document.createElement('a');
    a.setAttribute('href', 'http://airbnb.com');

    // @ts-ignore Need to fix types upstream
    const wrapper = mountUseStyles(transformer(a, 'Airbnb'));

    expect(wrapper.find(Link)).toHaveLength(1);
  });

  it('uses text content as children', () => {
    const a = document.createElement('a');
    a.setAttribute('href', 'http://airbnb.com');
    a.textContent = 'Children';

    // @ts-ignore Need to fix types upstream
    const wrapper = mountUseStyles(transformer(a, []));

    expect(wrapper.find(Link).prop('children')).toBe('Children');
  });

  it('does nothing for unknown element', () => {
    expect(transformer(document.createElement('div'), [])).toBeUndefined();
  });
});
