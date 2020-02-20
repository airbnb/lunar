import React from 'react';
import { shallow } from 'enzyme';
import TrackingBoundary from '../../src/components/TrackingBoundary';

describe('<TrackingBoundary />', () => {
  it('renders a spy HTML tag', () => {
    const wrapper = shallow(<TrackingBoundary name="Foo">Foo</TrackingBoundary>);

    expect(wrapper.type()).toBe('tracking-boundary');
  });

  it('adds data tag to HTML tag', () => {
    const wrapper = shallow(<TrackingBoundary name="Foo">Foo</TrackingBoundary>);

    expect(wrapper.find('[data-tracking-name="Foo"]')).toHaveLength(1);
  });

  it('renders children if no `name`', () => {
    const child = 'Foo';
    const wrapper = shallow(<TrackingBoundary>{child}</TrackingBoundary>);

    expect(wrapper.contains(child)).toBe(true);
  });

  it('adds context for click events', () => {
    const wrapper = shallow(<TrackingBoundary name="Foo">Foo</TrackingBoundary>);
    const event = { nativeEvent: {} };

    wrapper.simulate('click', event);

    expect(event).toEqual({
      nativeEvent: {
        trackingContext: ['Foo'],
      },
    });
  });

  it('adds context for keydown events', () => {
    const wrapper = shallow(<TrackingBoundary name="Foo">Foo</TrackingBoundary>);
    const event = { nativeEvent: {} };

    wrapper.simulate('keydown', event);

    expect(event).toEqual({
      nativeEvent: {
        trackingContext: ['Foo'],
      },
    });
  });

  it('adds context to an existing context', () => {
    const wrapper = shallow(<TrackingBoundary name="Foo">Foo</TrackingBoundary>);
    const event = { nativeEvent: {} };

    wrapper.simulate('click', event);

    wrapper.setProps({
      name: 'Bar',
    });

    wrapper.simulate('click', event);

    expect(event).toEqual({
      nativeEvent: {
        trackingContext: ['Foo', 'Bar'],
      },
    });
  });
});
