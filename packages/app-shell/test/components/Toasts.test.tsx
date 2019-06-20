import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Toast from '@airbnb/lunar/lib/components/Toast';
import Toasts from '../../src/components/Toasts';

describe('Toasts', () => {
  const data = [
    {
      id: '1',
      message: 'Foo',
      props: {
        danger: true,
      },
    },
    {
      id: '2',
      message: 'Bar',
      props: {
        success: true,
      },
    },
    {
      id: '3',
      message: 'Baz',
      props: {
        duration: 0,
        refresh: true,
      },
    },
  ];

  it('renders all toasts', () => {
    const wrapper = shallowWithStyles(<Toasts toasts={data} onRemove={() => {}} />);

    expect(wrapper.find(Toast)).toHaveLength(3);
  });

  it('renders toasts in reverse', () => {
    const wrapper = shallowWithStyles(<Toasts toasts={data} onRemove={() => {}} />);

    expect(
      wrapper
        .find(Toast)
        .at(0)
        .prop('id'),
    ).toBe('3');
    expect(
      wrapper
        .find(Toast)
        .at(2)
        .prop('id'),
    ).toBe('1');
  });

  it('passes props to toast', () => {
    const wrapper = shallowWithStyles(<Toasts toasts={data} onRemove={() => {}} />);

    expect(
      wrapper
        .find(Toast)
        .at(0)
        .prop('duration'),
    ).toBe(0);
    expect(
      wrapper
        .find(Toast)
        .at(0)
        .prop('refresh'),
    ).toBe(true);
  });

  it('passes onRemove prop', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<Toasts toasts={data} onRemove={spy} />);

    expect(
      wrapper
        .find(Toast)
        .at(0)
        .prop('onRemove'),
    ).toBe(spy);
  });
});
