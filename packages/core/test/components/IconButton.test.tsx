import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '../../src/components/IconButton';
import Tooltip from '../../src/components/Tooltip';
import IconCheck from '../../../icons/src/interface/IconCheck';

describe('<IconButton />', () => {
  it('errors if a non-icon is passed', () => {
    expect(() => {
      shallow(
        <IconButton>
          <div />
        </IconButton>,
      ).dive();
    }).toThrowError();
  });

  it('renders disabled', () => {
    const wrapper = shallow(
      <IconButton disabled>
        <IconCheck decorative />
      </IconButton>,
    ).dive();

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('wraps in a tooltip', () => {
    const wrapper = shallow(
      <IconButton>
        <IconCheck decorative />
      </IconButton>,
    ).dive();

    expect(wrapper.find(Tooltip)).toHaveLength(0);

    wrapper.setProps({
      tooltip: 'Foo',
    });

    expect(wrapper.find(Tooltip)).toHaveLength(1);
    expect(wrapper.find(Tooltip).prop('content')).toBe('Foo');
  });
});
