import React from 'react';
import { shallow } from 'enzyme';
import ButtonOrLink from '../../../src/components/private/ButtonOrLink';
import IconAffix from '../../../src/components/private/IconAffix';

describe('<ButtonOrLink />', () => {
  it('returns button props when no `href`', () => {
    const wrapper = shallow(<ButtonOrLink>Child</ButtonOrLink>);

    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('button');
  });

  it('returns link props when a `href`', () => {
    const wrapper = shallow(<ButtonOrLink href="/">Child</ButtonOrLink>);

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.prop('href')).toBe('/');
  });

  it('disables the button', () => {
    const wrapper = shallow(<ButtonOrLink disabled>Child</ButtonOrLink>);

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('adds data-tracking-name when trackingName is passed', () => {
    const wrapper = shallow(<ButtonOrLink trackingName="tracking-button">Child</ButtonOrLink>);

    expect(wrapper.prop('data-tracking-name')).toBe('tracking-button');
  });

  it('disables the button when loading', () => {
    const wrapper = shallow(<ButtonOrLink loading>Child</ButtonOrLink>);

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('can change button type', () => {
    const wrapper = shallow(<ButtonOrLink type="submit">Child</ButtonOrLink>);

    expect(wrapper.prop('type')).toBe('submit');
  });

  it('adds props when opening in a new window', () => {
    const wrapper = shallow(
      <ButtonOrLink openInNewWindow href="/">
        Child
      </ButtonOrLink>,
    );

    expect(wrapper.prop('href')).toBe('/');
    expect(wrapper.prop('target')).toBe('_blank');
    expect(wrapper.prop('rel')).toBe('noopener noreferrer');
  });

  it('sets rel to provided value when passed and opening in a new widnow', () => {
    const wrapper = shallow(
      <ButtonOrLink openInNewWindow href="/" rel="noopener">
        Child
      </ButtonOrLink>,
    );

    expect(wrapper.prop('rel')).toBe('noopener');
  });

  it('sets rel in same window', () => {
    const wrapper = shallow(
      <ButtonOrLink href="/" rel="noopener">
        Child
      </ButtonOrLink>,
    );

    expect(wrapper.prop('rel')).toBe('noopener');
  });

  it('calls passed through `onClick`', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <ButtonOrLink href="/" onClick={spy}>
        Default
      </ButtonOrLink>,
    );

    wrapper.simulate('click', {});

    expect(spy).toHaveBeenCalled();
  });

  it('calls passed through `onMouseUp`', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <ButtonOrLink href="/" onMouseUp={spy}>
        Default
      </ButtonOrLink>,
    );

    wrapper.simulate('mouseup', {});

    expect(spy).toHaveBeenCalled();
  });

  it('calls prevent default when disabled', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <ButtonOrLink disabled href="/" onClick={spy}>
        Default
      </ButtonOrLink>,
    );

    const event = { preventDefault: jest.fn() };
    wrapper.simulate('click', event);

    expect(spy).not.toHaveBeenCalled();
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('renders a before icon', () => {
    const icon = <div>Icon</div>;
    const wrapper = shallow(<ButtonOrLink beforeIcon={icon}>Default</ButtonOrLink>);

    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders a after icon', () => {
    const icon = <div>Icon</div>;
    const wrapper = shallow(<ButtonOrLink afterIcon={icon}>Default</ButtonOrLink>);

    expect(wrapper.contains(icon)).toBe(true);
  });

  it('renders both icons', () => {
    const beforeIcon = <div>Icon</div>;
    const afterIcon = <div>Icon</div>;
    const wrapper = shallow(
      <ButtonOrLink beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </ButtonOrLink>,
    );

    expect(wrapper.contains(beforeIcon)).toBe(true);
    expect(wrapper.contains(afterIcon)).toBe(true);
  });

  it('doesnt render icons if loading', () => {
    const beforeIcon = <div>Icon</div>;
    const afterIcon = <div>Icon</div>;
    const wrapper = shallow(
      <ButtonOrLink loading beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </ButtonOrLink>,
    );

    expect(wrapper.contains(beforeIcon)).toBe(false);
    expect(wrapper.contains(afterIcon)).toBe(false);
  });

  it('sets flex alignment on icons', () => {
    const beforeIcon = <div>Icon</div>;
    const afterIcon = <div>Icon</div>;
    const wrapper = shallow(
      <ButtonOrLink flexAlign beforeIcon={beforeIcon} afterIcon={afterIcon}>
        Default
      </ButtonOrLink>,
    );

    expect(wrapper.find(IconAffix).at(0).prop('flex')).toBe(true);
    expect(wrapper.find(IconAffix).at(1).prop('flex')).toBe(true);
  });
});
