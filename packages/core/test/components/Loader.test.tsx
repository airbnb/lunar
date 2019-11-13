import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../src/components/Loader';

describe('<Loader />', () => {
  it('renders default', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.prop('className')).toMatch('loader loader_absolute');
  });

  it('renders inline', () => {
    const wrapper = shallow(<Loader inline />);

    expect(wrapper.prop('className')).toMatch('loader_inline');
  });

  it('renders inverted', () => {
    const wrapper = shallow(<Loader inverted />);

    expect(
      wrapper
        .find('span')
        .at(0)
        .prop('className'),
    ).toMatch('dot_inverted');
  });

  it('renders large', () => {
    const wrapper = shallow(<Loader large />);

    expect(
      wrapper
        .find('span')
        .at(0)
        .prop('className'),
    ).toMatch('dot_large');
  });

  it('renders static', () => {
    const wrapper = shallow(<Loader static />);

    expect(wrapper.prop('className')).not.toMatch('loader_absolute');
  });
});
