import React from 'react';
import { mountWithStyles, shallowWithStyles } from '@airbnb/lunar-test-utils';
import Mark from '../../../src/components/TextArea/Proofreader/Mark';

describe('<Mark />', () => {
  it('renders', () => {
    const wrapper = shallowWithStyles(
      <Mark selected={false} onSelect={() => {}}>
        Word
      </Mark>,
    );

    expect(wrapper.prop('className')).toBe('mark');
  });

  it('renders selected', () => {
    const wrapper = shallowWithStyles(
      <Mark selected onSelect={() => {}}>
        Word
      </Mark>,
    );

    expect(wrapper.prop('className')).toMatch('mark_selected');
  });

  it('triggers `onSelect` on mount if selected', () => {
    const spy = jest.fn();

    mountWithStyles(
      <Mark selected onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt trigger `onSelect` on mount if not selected', () => {
    const spy = jest.fn();

    mountWithStyles(
      <Mark selected={false} onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('triggers `onSelect` if updated to selected', () => {
    const spy = jest.fn();
    const wrapper = mountWithStyles(
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
    const wrapper = mountWithStyles(
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
