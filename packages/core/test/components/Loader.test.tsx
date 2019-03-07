import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../src/components/Loader';

describe('<Loader />', () => {
  it('renders default', () => {
    const wrapper = shallow(<Loader />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inline', () => {
    const wrapper = shallow(<Loader inline />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallow(<Loader inverted />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallow(<Loader large />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders static', () => {
    const wrapper = shallow(<Loader static />).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
