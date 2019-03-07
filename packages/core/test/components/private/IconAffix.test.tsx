import React from 'react';
import { shallow } from 'enzyme';
import IconAffix from '../../../src/components/private/IconAffix';

describe('<IconAffix />', () => {
  it('renders before', () => {
    const wrapper = shallow(<IconAffix before>Child</IconAffix>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders after', () => {
    const wrapper = shallow(<IconAffix after>Child</IconAffix>).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('errors if both props used', () => {
    expect(() => {
      shallow(
        <IconAffix before after>
          Child
        </IconAffix>,
      ).dive();
    }).toThrowError();
  });
});
