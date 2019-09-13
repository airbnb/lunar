import React from 'react';
import { shallow } from 'enzyme';
import Autocomplete from '../../src/components/Autocomplete';
import Multicomplete from '../../src/components/Multicomplete';
import MulticompleteChip from '../../src/components/Multicomplete/private/Chip';

describe('<Multicomplete />', () => {
  const props = {
    name: 'mc',
    value: ['foo'],
    label: 'Label',
    accessibilityLabel: 'Label',
    maxHeight: 400,
    onChange() {},
    onLoadItems: () => Promise.resolve([]),
  };

  const event = {
    target: {},
  } as React.ChangeEvent<unknown>;

  it('sets default value', () => {
    const wrapper = shallow(<Multicomplete {...props} />);

    expect(Array.from(wrapper.state('values'))).toEqual(['foo']);
  });

  it('updates state value when props change', () => {
    const wrapper = shallow(<Multicomplete {...props} />);

    wrapper.setProps({
      value: ['bar'],
    });

    expect(Array.from(wrapper.state('values'))).toEqual(['bar']);
  });

  it('does nothing when value is the same', () => {
    const wrapper = shallow(<Multicomplete {...props} />);

    wrapper.setProps({
      value: ['foo'],
    });

    expect(Array.from(wrapper.state('values'))).toEqual(['foo']);
  });

  it('renders a chip for each selected value', () => {
    const wrapper = shallow(<Multicomplete {...props} />);

    wrapper.setProps({
      value: ['foo', 'baz'],
    });

    expect(wrapper.find(MulticompleteChip)).toHaveLength(2);
    expect(
      wrapper
        .find(MulticompleteChip)
        .at(1)
        .prop('value'),
    ).toBe('baz');
  });

  it('clicking a chip removes it as a selected value', () => {
    const changeSpy = jest.fn();
    const wrapper = shallow(<Multicomplete {...props} onChange={changeSpy} />);

    wrapper.setProps({
      value: ['foo', 'baz'],
    });

    wrapper
      .find(MulticompleteChip)
      .at(0)
      .simulate('click', 'foo', event);

    expect(changeSpy).toHaveBeenCalledWith(['baz'], event);

    expect(wrapper.state('values')).toEqual(new Set(['baz']));
  });

  it('selecting an item adds it to the list', () => {
    const changeSpy = jest.fn();
    const selectSpy = jest.fn();
    const wrapper = shallow(
      <Multicomplete {...props} onChange={changeSpy} onSelectItem={selectSpy} />,
    );

    wrapper.find(Autocomplete).simulate('selectItem', 'bar', { value: 'bar' }, event);

    expect(selectSpy).toHaveBeenCalledWith('bar', { value: 'bar' }, event);
    expect(changeSpy).toHaveBeenCalledWith(['foo', 'bar'], event);

    expect(wrapper.state('values')).toEqual(new Set(['foo', 'bar']));
  });

  it('an empty item should not update selected list', () => {
    const changeSpy = jest.fn();
    const selectSpy = jest.fn();
    const wrapper = shallow(
      <Multicomplete {...props} onChange={changeSpy} onSelectItem={selectSpy} />,
    );

    wrapper.find(Autocomplete).simulate('selectItem', '', null, event);

    expect(selectSpy).toHaveBeenCalledWith('', null, event);
    expect(changeSpy).not.toHaveBeenCalled();

    expect(wrapper.state('values')).toEqual(new Set(['foo']));
  });

  it('changes returns selected values instead of input value', () => {
    const changeSpy = jest.fn();
    const wrapper = shallow(<Multicomplete {...props} onChange={changeSpy} />);

    wrapper.setProps({
      value: ['foo', 'baz'],
    });

    wrapper.find(Autocomplete).simulate('change', 'bar', event);

    expect(changeSpy).toHaveBeenCalledWith(['foo', 'baz'], event);
  });

  it('marks an item as selected', () => {
    const changeSpy = jest.fn();
    const wrapper = shallow(<Multicomplete {...props} onChange={changeSpy} />);

    wrapper.setProps({
      value: ['foo', 'baz'],
    });

    const instance = wrapper.instance();

    // @ts-ignore Allow private access
    expect(instance.isItemSelected({ value: 'foo' }, 'foo')).toBe(true);
    // @ts-ignore Allow private access
    expect(instance.isItemSelected({ value: 'bar' }, 'bar')).toBe(false);
  });
});
