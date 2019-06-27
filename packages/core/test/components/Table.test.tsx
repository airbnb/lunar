import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Table from '../../src/components/Table';

function unwrap(element: any): Enzyme.ShallowWrapper {
  // Dont use shallowWithStyles because of TrackingBoundary
  return unwrapHOCs(shallow(element), 'Table', {}, { render: true });
}

describe('<Table />', () => {
  it('renders bordered', () => {
    const wrapper = unwrap(<Table bordered>Bordered</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders compact', () => {
    const wrapper = unwrap(<Table compact>Compact</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders fixed', () => {
    const wrapper = unwrap(<Table fixed>Fixed</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders horizontal', () => {
    const wrapper = unwrap(<Table horizontal>Horizontal</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading', () => {
    const wrapper = unwrap(<Table loading>Loading</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders striped', () => {
    const wrapper = unwrap(<Table striped>Striped</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders transparent', () => {
    const wrapper = unwrap(<Table transparent>Transparent</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders vertical', () => {
    const wrapper = unwrap(<Table vertical>Vertical</Table>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders middleAlign', () => {
    const wrapper = unwrap(<Table middleAlign>Vertical</Table>);

    expect(wrapper).toMatchSnapshot();
  });
});
