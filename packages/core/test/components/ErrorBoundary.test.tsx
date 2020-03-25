import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import Tripped from '../../src/components/ErrorBoundary/private/Tripped';

describe('<ErrorBoundary />', () => {
  const props = {
    name: 'ErrorBoundaryTest',
    onCatch() {},
  };

  it('will render', () => {
    const wrapper = shallow(<ErrorBoundary {...props}>Foo</ErrorBoundary>);

    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('will render the children if no error', () => {
    const wrapper = shallow(<ErrorBoundary {...props}>Foo</ErrorBoundary>);

    expect(wrapper.contains('Foo')).toBe(true);
    expect(wrapper.find(Tripped)).toHaveLength(0);
  });

  it('will render a simple alert', () => {
    const wrapper = shallow(<ErrorBoundary {...props}>Foo</ErrorBoundary>);

    wrapper.setState({ error: new Error() });

    expect(wrapper.find(Tripped)).toHaveLength(1);
  });

  it('will catch error and set state', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <ErrorBoundary {...props} onCatch={spy}>
        Foo
      </ErrorBoundary>,
    );
    const error = new Error();

    wrapper.instance().componentDidCatch!(error, { componentStack: '' });

    expect(spy).toHaveBeenCalledWith(error, {
      name: 'ErrorBoundaryTest',
      componentStack: '',
      boundary: true,
    });

    expect(wrapper.state()).toEqual({
      error,
    });
  });

  it('will catch error with custom data', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <ErrorBoundary {...props} onCatch={spy}>
        Foo
      </ErrorBoundary>,
    );
    const error = new Error();

    // @ts-ignore Allow custom properties
    wrapper.instance().componentDidCatch(error, { componentStack: '', foo: 'bar' });

    expect(spy).toHaveBeenCalledWith(error, {
      foo: 'bar',
      componentStack: '',
      name: 'ErrorBoundaryTest',
      boundary: true,
    });
  });
});
