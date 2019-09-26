import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent } from 'aesthetic-react';
import withBoundary from '../../src/composers/withBoundary';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import TrackingBoundary from '../../src/components/TrackingBoundary';

describe('withBoundary()', () => {
  function Foo() {
    return <div />;
  }

  it('returns an HOC', () => {
    const Hoc = withBoundary('Test')(Foo);

    expect(Hoc.displayName).toBe('withBoundary(Foo)');
    expect((Hoc as StyledComponent<{}, {}>).WrappedComponent).toBe(Foo);
  });

  it('can render without a `name`', () => {
    const Hoc = withBoundary()(Foo);
    const wrapper = shallow(<Hoc />);

    expect(wrapper.find(TrackingBoundary)).toHaveLength(1);
  });

  it('wraps with an `TrackingBoundary`', () => {
    const Hoc = withBoundary('Test')(Foo);
    const wrapper = shallow(<Hoc />);

    expect(wrapper.find(TrackingBoundary)).toHaveLength(1);
  });

  it('wraps with an `ErrorBoundary`', () => {
    const Hoc = withBoundary('Test')(Foo);
    const wrapper = shallow(<Hoc />).dive();

    expect(wrapper.find(ErrorBoundary)).toHaveLength(1);
  });
});
