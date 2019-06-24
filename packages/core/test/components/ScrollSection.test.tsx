import React from 'react';
import { mount } from 'enzyme';
import ScrollSection from '../../src/components/ScrollSection';
import ScrollContext, { Context } from '../../src/components/ScrollSection/ScrollContext';
import DirectionProvider from '../../src/providers/DirectionProvider';
import ThemeProvider from '../../src/providers/ThemeProvider';

describe('<ScrollSection />', () => {
  let context: Context;

  function WrappingComponent({ children }: { children: NonNullable<React.ReactNode> }) {
    return (
      <ScrollContext.Provider value={context}>
        <DirectionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DirectionProvider>
      </ScrollContext.Provider>
    );
  }

  beforeEach(() => {
    context = {
      addScrollAnchor: jest.fn(),
      removeScrollAnchor: jest.fn(),
    };
  });

  it('renders children', () => {
    const wrapper = mount(
      <ScrollSection id="section1">
        <footer>Footer Text</footer>
      </ScrollSection>,
      {
        // @ts-ignore Not typed yet
        wrappingComponent: WrappingComponent,
      },
    );

    expect(wrapper.find('footer')).toHaveLength(1);
  });

  it('calls addScrollAnchor on mount', () => {
    mount(<ScrollSection id="section1">Text</ScrollSection>, {
      // @ts-ignore Not typed yet
      wrappingComponent: WrappingComponent,
    });

    expect(context.addScrollAnchor).toHaveBeenCalledTimes(1);
    expect(context.addScrollAnchor).toHaveBeenCalledWith('section1', expect.any(Object));
  });

  it('calls removeScrollAnchor on unmount', () => {
    mount(<ScrollSection id="section1">Text</ScrollSection>, {
      // @ts-ignore Not typed yet
      wrappingComponent: WrappingComponent,
    }).unmount();

    expect(context.removeScrollAnchor).toHaveBeenCalledWith(
      (context.addScrollAnchor as jest.Mock).mock.calls[0][0],
    );
  });
});
