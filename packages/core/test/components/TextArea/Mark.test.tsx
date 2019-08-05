import React from 'react';
import { mountWithStyles, shallowWithStyles } from '@airbnb/lunar-test-utils';
import Mark, { Props } from '../../../src/components/TextArea/Proofreader/Mark';

describe('<Mark />', () => {
  const props: Props = {
    children: 'Mark children',
    selected: false,
    onSelect: () => {},
    alwaysHighlight: false,
  };

  it('renders', () => {
    const wrapper = shallowWithStyles(
      <Mark {...props} selected={false} onSelect={() => {}}>
        Word
      </Mark>,
    );

    expect(wrapper.prop('className')).toBe('mark');
  });

  it('renders selected', () => {
    const wrapper = shallowWithStyles(
      <Mark {...props} selected onSelect={() => {}}>
        Word
      </Mark>,
    );

    expect(wrapper.prop('className')).toMatch('mark_highlight');
  });

  it('renders highlighted', () => {
    const wrapper = shallowWithStyles(
      <Mark {...props} alwaysHighlight onSelect={() => {}}>
        Word
      </Mark>,
    );

    expect(wrapper.prop('className')).toMatch('mark_highlight');
  });

  it('triggers `onSelect` on mount if selected', () => {
    const spy = jest.fn();

    mountWithStyles(
      <Mark {...props} selected onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('doesnt trigger `onSelect` on mount if not selected', () => {
    const spy = jest.fn();

    mountWithStyles(
      <Mark {...props} selected={false} onSelect={spy}>
        Word
      </Mark>,
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('triggers `onSelect` if updated to selected', () => {
    const spy = jest.fn();
    const wrapper = mountWithStyles(
      <Mark {...props} selected={false} onSelect={spy}>
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
      <Mark {...props} selected onSelect={spy}>
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
