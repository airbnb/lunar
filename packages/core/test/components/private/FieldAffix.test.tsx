import React from 'react';
import { shallow } from 'enzyme';
import FieldAffix from '../../../src/components/private/FieldAffix';

describe('<FieldAffix />', () => {
  it('renders before and after with different classes', () => {
    const wrapper = shallow(<FieldAffix before>Child</FieldAffix>).dive();
    const beforeClass = wrapper.prop('className');

    wrapper.setProps({
      before: false,
      after: true,
    });

    expect(wrapper.prop('className')).not.toBe(beforeClass);
  });

  it('renders compact', () => {
    const wrapper = shallow(
      <FieldAffix after compact>
        Child
      </FieldAffix>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('errors if both props used', () => {
    expect(() => {
      shallow(
        <FieldAffix before after>
          Child
        </FieldAffix>,
      ).dive();
    }).toThrowError();
  });
});
