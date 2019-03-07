import React from 'react';
import withStyles from '../../src/composers/withStyles';

describe('withStyles()', () => {
  function Foo() {
    return <div />;
  }

  it('returns an HOC', () => {
    const Hoc = withStyles(() => ({}))(Foo);

    expect(Hoc.displayName).toBe('withStyles(Foo)');
    expect((Hoc as any).styleName).toEqual(expect.stringMatching(/^Foo/));
    expect((Hoc as any).WrappedComponent).toBe(Foo);
  });
});
