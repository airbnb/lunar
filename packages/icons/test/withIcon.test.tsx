import React from 'react';
import { WrappedComponent } from '@airbnb/lunar-test-utils';
import { shallow } from 'enzyme';
import withIcon from '../src/withIcon';

describe('withIcon()', () => {
  function Foo() {
    return <div />;
  }

  it('returns an HOC', () => {
    const Hoc = withIcon('IconTest')(Foo);

    expect(Hoc.displayName).toBe('IconTest');
    expect((Hoc as WrappedComponent).WrappedComponent).toBe(Foo);
  });

  it('passes through props', () => {
    const Hoc = withIcon('IconTest')(Foo);
    const wrapper = shallow(<Hoc decorative inline size={16} color="white" />);
    const style: React.CSSProperties = wrapper.find(Foo).prop('style');

    expect(style.width).toBe(16);
    expect(style.height).toBe(16);
    expect(style.fill).toBe('white');
    expect(style.display).toBe('inline');
    expect(style.transform).toBe('scale(1)');
  });

  it('flips horizontally', () => {
    const Hoc = withIcon('IconTest')(Foo);
    const wrapper = shallow(<Hoc decorative flip />);
    const style: React.CSSProperties = wrapper.find(Foo).prop('style');

    expect(style.transform).toBe('scale(-1, 1)');
  });

  it('flips vertically', () => {
    const Hoc = withIcon('IconTest')(Foo);
    const wrapper = shallow(<Hoc decorative flipVertical />);
    const style: React.CSSProperties = wrapper.find(Foo).prop('style');

    expect(style.transform).toBe('scale(1, -1)');
  });

  it('flips horizontally & vertically', () => {
    const Hoc = withIcon('IconTest')(Foo);
    const wrapper = shallow(<Hoc decorative flip flipVertical />);
    const style: React.CSSProperties = wrapper.find(Foo).prop('style');

    expect(style.transform).toBe('scale(-1, -1)');
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

  it('errors when an a11y prop is missing', () => {
    expect(() => {
      const Hoc = withIcon('IconTest')(Foo);
      shallow(<Hoc />);
    }).toThrowError('Missing `accessibilityLabel` or `decorative` for accessibility.');
  });

  it('errors when both a11y props are added', () => {
    expect(() => {
      const Hoc = withIcon('IconTest')(Foo);
      shallow(<Hoc decorative accessibilityLabel="foobar" />);
    }).toThrowError('Only one of `accessibilityLabel` or `decorative` may be used.');
  });
});
