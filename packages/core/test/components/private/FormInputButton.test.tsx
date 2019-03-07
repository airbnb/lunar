import React from 'react';
import { shallow } from 'enzyme';
import FormInputButton from '../../../src/components/private/FormInputButton';

describe('<FormInputButton />', () => {
  it('renders', () => {
    const wrapper = shallow(<FormInputButton>Child</FormInputButton>).dive();

    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
