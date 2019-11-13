import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumb from '../../../src/components/Breadcrumbs/Breadcrumb';
import ButtonOrLink from '../../../src/components/private/ButtonOrLink';

describe('<Breadcrumb/>', () => {
  it('renders a button', () => {
    const wrapper = shallow(<Breadcrumb label="Breadcrumb" onClick={() => {}} />)
      .find(ButtonOrLink)
      .dive();

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('renders a link', () => {
    const wrapper = shallow(<Breadcrumb href="#foo" label="Breadcrumb" />)
      .find(ButtonOrLink)
      .dive();

    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('renders selected with `aria-current` attribute', () => {
    const wrapper = shallow(<Breadcrumb selected label="Breadcrumb" onClick={() => {}} />);

    expect(wrapper.find(ButtonOrLink).prop('aria-current')).toBe('page');
  });

  it('renders disabled', () => {
    const wrapper = shallow(<Breadcrumb disabled label="Breadcrumb" onClick={() => {}} />);

    expect(wrapper.find(ButtonOrLink).prop('disabled')).toBeTruthy();
  });

  it('renders a passed id for tracking', () => {
    const wrapper = shallow(
      <Breadcrumb
        id="tracking-breadcrump"
        trackingName="tracking-name"
        label="Breadcrumb"
        onClick={() => {}}
      />,
    );

    expect(wrapper.find(ButtonOrLink).prop('id')).toBe('tracking-breadcrump');
    expect(wrapper.find(ButtonOrLink).prop('trackingName')).toBe('tracking-name');
  });

  it('renders an icon', () => {
    const wrapper = shallow(<Breadcrumb label="Breadcrumb" onClick={() => {}} />);

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBeTruthy();
  });

  it('doesnt render an icon with `hideIcon`', () => {
    const wrapper = shallow(<Breadcrumb hideIcon label="Breadcrumb" onClick={() => {}} />);

    expect(wrapper.find(ButtonOrLink).prop('afterIcon')).toBeFalsy();
  });

  it('doesnt render children', () => {
    const child = <div>Foo</div>;
    const wrapper = shallow(
      // @ts-ignore Allow invalid children
      <Breadcrumb label="Breadcrumb" onClick={() => {}}>
        {child}
      </Breadcrumb>,
    );

    expect(wrapper.contains(child)).toBe(false);
  });

  it('triggers `onClick` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<Breadcrumb label="Breadcrumb" onClick={spy} />);

    wrapper.findWhere(child => child.prop('onClick')).simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
