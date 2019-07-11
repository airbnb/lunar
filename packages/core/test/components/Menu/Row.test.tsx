import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Row from '../../../src/components/Menu/Row';

describe('<MenuRow />', () => {
  it('renders a list with the correct role', () => {
    const wrapper = shallowWithStyles(<Row>Foo</Row>);

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toBe('none');
    expect(wrapper.contains('Foo')).toBe(true);
  });

  it('renders spacious', () => {
    const wrapper = shallowWithStyles(<Row spacious>Foo</Row>);

    expect(
      wrapper
        .find('div')
        .at(0)
        .prop('className'),
    ).toMatch('item_spacious');
  });
});
