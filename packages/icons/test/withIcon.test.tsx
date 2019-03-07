import React from 'react';
import { shallow } from 'enzyme';
import withIcon from '../src/withIcon';

describe('withIcon()', () => {
  function Foo() {
    return <div />;
  }

  it('returns an HOC', () => {
    const Hoc = withIcon('IconTest')(Foo);

    expect(Hoc.displayName).toBe('IconTest');
    expect((Hoc as any).WrappedComponent).toBe(Foo);
  });

  it('passes through props', () => {
    const Hoc = withIcon('IconTest')(Foo);
    const wrapper = shallow(<Hoc size={16} color="white" inline />);
    const style: React.CSSProperties = wrapper.find(Foo).prop('style');

    expect(style.width).toBe(16);
    expect(style.height).toBe(16);
    expect(style.fill).toBe('white');
    expect(style.display).toBe('inline');
  });

  it('passes through a11y props', () => {
    const Hoc = withIcon('IconTest')(Foo);
    const wrapperDecorative = shallow(<Hoc decorative />);
    const wrapperWithLabel = shallow(<Hoc accessibilityLabel="foobar" />);

    expect(wrapperDecorative.find(Foo).prop('role')).toBe('presentation');
    expect(wrapperDecorative.find(Foo).prop('aria-hidden')).toBe(true);

    expect(wrapperWithLabel.find(Foo).prop('role')).toBe('img');
    expect(wrapperWithLabel.find(Foo).prop('aria-label')).toBe('foobar');
  });
});
