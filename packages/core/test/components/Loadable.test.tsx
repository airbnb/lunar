import React from 'react';
import { shallow } from 'enzyme';
import { WrappingComponent } from '@airbnb/lunar-test-utils';
import Loadable from '../../src/components/Loadable';
import Loader from '../../src/components/Loader';
import ErrorMessage from '../../src/components/ErrorMessage';

const oldReactLazy = React.lazy;

describe('<Loadable />', () => {
  type Props = { children?: string; prop?: string };

  function Foo({ children }: Props) {
    return <div>{children || null}</div>;
  }

  const importFunc = () => Promise.resolve({ default: Foo });
  let timeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    timeoutSpy = jest.spyOn(window, 'setTimeout');
    // @ts-ignore
    React.lazy = jest.fn(() => Foo);
  });

  afterEach(() => {
    timeoutSpy.mockRestore();
    jest.useRealTimers();
    React.lazy = oldReactLazy;
  });

  it('sets delay timeout', () => {
    shallow(<Loadable component={importFunc} delay={300} />);

    expect(timeoutSpy).toHaveBeenCalledWith(expect.anything(), 300);
  });

  it('sets `showLoading` after delay timeout', () => {
    const wrapper = shallow(<Loadable component={importFunc} delay={300} />);

    jest.runAllTimers();

    expect(wrapper.state('showLoading')).toBe(true);
  });

  it('doesnt set delay timeout if 0', () => {
    shallow(<Loadable component={importFunc} delay={0} />);

    expect(timeoutSpy).not.toHaveBeenCalled();
  });

  it('doesnt set delay timeout if negative', () => {
    shallow(<Loadable component={importFunc} delay={-100} />);

    expect(timeoutSpy).not.toHaveBeenCalled();
  });

  it('renders an error before loading/component', () => {
    const wrapper = shallow<Loadable>(
      <WrappingComponent>
        <Loadable component={importFunc} />
      </WrappingComponent>,
    )
      .dive()
      .dive()
      .dive();

    // @ts-ignore
    const errorSpy = jest.spyOn(wrapper.instance(), 'renderError');
    // @ts-ignore
    const loadingSpy = jest.spyOn(wrapper.instance(), 'renderLoading');
    // @ts-ignore
    const compSpy = jest.spyOn(wrapper.instance(), 'renderComponent');

    wrapper.setState({
      error: new Error(),
    });

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(loadingSpy).toHaveBeenCalledTimes(0);
    expect(compSpy).toHaveBeenCalledTimes(0);
  });

  describe('factory()', () => {
    it('returns a component', () => {
      const FactoryComp = Loadable.factory<Props>(importFunc);

      // Test TS typings
      shallow(<FactoryComp prop="abc" />);

      // @ts-ignore This is invalid
      shallow(<FactoryComp noError />);

      expect(typeof FactoryComp).toBe('function');
    });
  });

  describe('renderComponent()', () => {
    it('renders the imported component', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} />);

      expect(wrapper.find(Foo)).toHaveLength(1);
    });

    it('passes children to the imported component', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc}>Child</Loadable>);

      expect(wrapper.find(Foo).prop('children')).toBe('Child');
    });

    it('passes custom props to the imported component', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} customProp="abc" />);

      expect(wrapper.find(Foo).props()).toEqual({ customProp: 'abc' });
    });

    it('filters loadable props from the imported component', () => {
      const wrapper = shallow<Loadable>(
        <Loadable noError component={importFunc} delay={100} loading={<div />} />,
      );

      expect(wrapper.find(Foo).props()).toEqual({});
    });

    it('passes the imported component to function children', () => {
      shallow<Loadable>(
        <Loadable noLoading component={importFunc} customProp={123}>
          {(Comp: unknown, props: unknown) => {
            expect(Comp).toBe(Foo);
            expect(props).toEqual({ customProp: 123 });
          }}
        </Loadable>,
      );
    });
  });

  describe('renderError()', () => {
    it('renders null if no caught error', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} />);

      expect(wrapper.instance().renderError()).toBeNull();
    });

    it('renders null if `noError` is true', () => {
      const wrapper = shallow<Loadable>(<Loadable noError component={importFunc} />);

      wrapper.setState({
        error: new Error('Ooops'),
      });

      expect(wrapper.instance().renderError()).toBeNull();
    });

    it('renders an `ErrorMessage` by default', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} />);

      wrapper.setState({
        error: new Error('Ooops'),
      });

      const div = shallow(<div>{wrapper.instance().renderError()}</div>);

      expect(div.find(ErrorMessage)).toHaveLength(1);
      expect(div.find(ErrorMessage).prop('error')).toEqual(new Error('Ooops'));
    });

    it('renders a custom element with `error`', () => {
      const CustomElement = () => <div />;
      const wrapper = shallow<Loadable>(
        <Loadable component={importFunc} error={<CustomElement />} />,
      );

      wrapper.setState({
        error: new Error('Ooops'),
      });

      const div = shallow(<div>{wrapper.instance().renderError()}</div>);

      expect(div.find(CustomElement)).toHaveLength(1);
    });

    it('supports a render function with `error`', () => {
      const renderFunc = (error: Error) => <div>{error.message}</div>;
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} error={renderFunc} />);

      wrapper.setState({
        error: new Error('Ooops'),
      });

      const div = shallow(<div>{wrapper.instance().renderError()}</div>);

      expect(div.text()).toBe('Ooops');
    });
  });

  describe('renderLoading()', () => {
    it('renders null if `noLoading` is true', () => {
      const wrapper = shallow<Loadable>(<Loadable noLoading component={importFunc} />);

      expect(wrapper.instance().renderLoading()).toBeNull();
    });

    it('renders null if `showLoading` is false', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} />);

      wrapper.setState({
        showLoading: false,
      });

      expect(wrapper.instance().renderLoading()).toBeNull();
    });

    it('renders a `Loader` by default', () => {
      const wrapper = shallow<Loadable>(<Loadable component={importFunc} />);

      wrapper.setState({
        showLoading: true,
      });

      const div = shallow(<div>{wrapper.instance().renderLoading()}</div>);

      expect(div.find(Loader)).toHaveLength(1);
    });

    it('renders a custom element with `loading`', () => {
      function CustomElement() {
        return <div />;
      }

      const wrapper = shallow<Loadable>(
        <Loadable component={importFunc} loading={<CustomElement />} />,
      );

      wrapper.setState({
        showLoading: true,
      });

      const div = shallow(<div>{wrapper.instance().renderLoading()}</div>);

      expect(div.find(CustomElement)).toHaveLength(1);
    });
  });
});
