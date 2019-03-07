import React from 'react';
import { shallow } from 'enzyme';
import Row from '../../../src/components/Menu/Row';

describe('<MenuRow />', () => {
  it('renders a list with the correct role', () => {
    const wrapper = shallow(<Row>Foo</Row>).dive();

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.prop('role')).toBe('none');
    expect(wrapper.contains('Foo')).toBe(true);
  });

  it('renders spacious', () => {
    const wrapper = shallow(<Row spacious>Foo</Row>).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
