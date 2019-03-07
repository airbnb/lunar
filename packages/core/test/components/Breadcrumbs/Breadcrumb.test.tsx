import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { unwrapHOCs } from '@airbnb/lunar-test-utils';
import Breadcrumb from '../../../src/components/Breadcrumbs/Breadcrumb';
import ButtonOrLink from '../../../src/components/private/ButtonOrLink';

function unwrap(element: any): Enzyme.ShallowWrapper {
  return unwrapHOCs(shallow(element), 'Breadcrumb', {}, { render: true });
}

describe('<Breadcrumb/>', () => {
  it('renders a button', () => {
    const wrapper = shallow(<Breadcrumb onClick={() => {}} label="Breadcrumb" />)
      .dive()
      .dive();

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders a link', () => {
    const wrapper = shallow(<Breadcrumb href="#foo" label="Breadcrumb" />)
      .dive()
      .dive();

    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('renders selected with `aria-current` attribute', () => {
    const wrapper = shallow(<Breadcrumb selected onClick={() => {}} label="Breadcrumb" />)
      .dive()
      .dive();

    expect(wrapper.find('button').prop('aria-current')).toBe('page');
  });

  it('renders disabled', () => {
    const wrapper = shallow(<Breadcrumb disabled onClick={() => {}} label="Breadcrumb" />)
      .dive()
      .dive();

    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });

  it('renders an icon', () => {
    const wrapper = unwrap(<Breadcrumb onClick={() => {}} label="Breadcrumb" />);

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBeTruthy();
  });

  it('doesnt render an icon with `hideIcon`', () => {
    const wrapper = unwrap(<Breadcrumb hideIcon onClick={() => {}} label="Breadcrumb" />);

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBeFalsy();
  });

  it('doesnt render children', () => {
    const child = <div>Foo</div>;
    const wrapper = shallow(
      <Breadcrumb label="Breadcrumb" onClick={() => {}}>
        {child}
      </Breadcrumb>,
    ).dive();

    expect(wrapper.contains(child)).toBe(false);
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Breadcrumb label="Breadcrumb" onClick={spy} />).dive();
    wrapper.findWhere(child => child.prop('onClick')).simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
