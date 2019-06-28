import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Cell from '../../../src/components/Table/Cell';

describe('<Cell />', () => {
  it('renders `td` by default', () => {
    const wrapper = shallowWithStyles(<Cell>Content</Cell>);

    expect(wrapper.type()).toBe('td');
  });

  it('renders `th` with `header`', () => {
    const wrapper = shallowWithStyles(<Cell header>Content</Cell>);

    expect(wrapper.type()).toBe('th');
  });

  it('renders left', () => {
    const wrapper = shallowWithStyles(<Cell startAlign>Left</Cell>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders center', () => {
    const wrapper = shallowWithStyles(<Cell centerAlign>Center</Cell>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders right', () => {
    const wrapper = shallowWithStyles(<Cell endAlign>Right</Cell>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders truncate', () => {
    const wrapper = shallowWithStyles(<Cell truncate>Truncate</Cell>);

    expect(wrapper).toMatchSnapshot();
  });

  it('supports col span', () => {
    const wrapper = shallowWithStyles(<Cell colSpan={1}>Content</Cell>);

    expect(wrapper.prop('colSpan')).toBe(1);
  });
});
