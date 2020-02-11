import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import MulticompleteChip, {
  MulticompleteChipProps,
} from '../../../src/components/Multicomplete/private/Chip';
import Chip from '../../../src/components/Chip';

describe('<MulticompleteChip />', () => {
  const props = {
    value: 'foo',
    onClick() {},
  };

  let wrapper: Enzyme.ShallowWrapper<MulticompleteChipProps, MulticompleteChip>;
  let instance: MulticompleteChip;

  beforeEach(() => {
    wrapper = shallow(<MulticompleteChip {...props} />);
    instance = wrapper.instance() as MulticompleteChip;
  });

  it('renders as a <Chip />', () => {
    expect(wrapper.type()).toBe(Chip);
  });

  it('calls `onClick`', () => {
    const spy = jest.fn();
    wrapper.setProps({
      onClick: spy,
    });

    // @ts-ignore Allow private
    instance.handleClick();
    expect(spy).toHaveBeenCalled();
  });
});
