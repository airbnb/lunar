import React from 'react';
import { mount, shallow } from 'enzyme';
import Mark from '../../../src/components/TextArea/Proofreader/Mark';

describe('<Mark />', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Mark selected={false} onSelect={() => {}}>
        Word
      </Mark>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders selected', () => {
    const wrapper = shallow(
      <Mark selected onSelect={() => {}}>
        Word
      </Mark>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('triggers `onSelect` on mount if selected', () => {
    const spy = jest.fn();
    mount(
      <Mark selected onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt trigger `onSelect` on mount if not selected', () => {
    const spy = jest.fn();
    mount(
      <Mark selected={false} onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('triggers `onSelect` if updated to selected', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <Mark selected={false} onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).not.toHaveBeenCalled();

    wrapper.setProps({
      selected: true,
    });

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt trigger `onSelect` if updated from selected', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <Mark selected onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).toHaveBeenCalledTimes(1);

    wrapper.setProps({
      selected: false,
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
