import React from 'react';
import { shallow, mount } from 'enzyme';
import { mockContextConsumer, unwrapHOCs } from '@airbnb/lunar-test-utils';
import ScrollSection from '../../src/components/ScrollSection';
import ScrollContext, { Context } from '../../src/components/ScrollSection/ScrollContext';

describe('<ScrollSection />', () => {
  let context: Context;
  let unmockConsumer: () => void;

  beforeEach(() => {
    context = {
      addScrollAnchor: jest.fn(),
      removeScrollAnchor: jest.fn(),
    };
    unmockConsumer = mockContextConsumer(ScrollContext, context);
  });

  afterEach(() => {
    unmockConsumer();
  });

  it('renders children', () => {
    const wrapper = unwrapHOCs(
      shallow(
        <ScrollSection id="section1">
          <footer>Footer Text</footer>
        </ScrollSection>,
      ),
      'InternalScrollSection',
      context,
      { render: true },
    );

    expect(wrapper.find('footer')).toHaveLength(1);
  });

  it('calls addScrollAnchor on mount', () => {
    mount(<ScrollSection id="section1">Text</ScrollSection>, { context });

    expect(context.addScrollAnchor).toHaveBeenCalledTimes(1);
    expect(context.addScrollAnchor).toHaveBeenCalledWith('section1', expect.any(Object));
  });

  it('calls removeScrollAnchor on unmount', () => {
    mount(<ScrollSection id="section1">Text</ScrollSection>, { context }).unmount();

    expect(context.removeScrollAnchor).toHaveBeenCalledWith(
      (context.addScrollAnchor as jest.Mock).mock.calls[0][0],
    );
  });
});
