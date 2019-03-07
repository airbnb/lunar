import React from 'react';
import { shallow } from 'enzyme';
import Link from '../../src/components/Link';

describe('<Link />', () => {
  it('errors when multiple states are used at once', () => {
    expect(() => {
      shallow(
        <Link muted inverted href="#">
          Default
        </Link>,
      );
    }).toThrowError();
  });

  it('errors when multiple sizes are used at once', () => {
    expect(() => {
      shallow(
        <Link small large href="#">
          Default
        </Link>,
      );
    }).toThrowError();
  });

  it('renders small', () => {
    const wrapper = shallow(
      <Link small href="#">
        Small
      </Link>,
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallow(
      <Link large href="#">
        Large
      </Link>,
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled', () => {
    const wrapper = shallow(
      <Link disabled href="#">
        Disabled
      </Link>,
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders inverted', () => {
    const wrapper = shallow(
      <Link inverted href="#">
        Inverted
      </Link>,
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders muted', () => {
    const wrapper = shallow(
      <Link muted href="#">
        Muted
      </Link>,
    )
      .dive()
      .dive()
      .dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders the child component with an inline=false prop when block prop is passed', () => {
    const wrapper = shallow(
      <Link block href="/foo">
        foo
      </Link>,
    );

    expect(wrapper.dive().prop('inline')).toBe(false);
  });

  it('renders bold', () => {
    const wrapper = shallow(
      <Link bold href="#">
        Bold
      </Link>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
