import React from 'react';
import { StyledComponent } from 'aesthetic-react';
import withStyles from '../../src/composers/withStyles';

describe('withStyles()', () => {
  function Foo() {
    return <div />;
  }

  it('returns an HOC', () => {
    const Hoc = withStyles(() => ({}))(Foo);

    expect(Hoc.displayName).toBe('withStyles(Foo)');
    expect((Hoc as StyledComponent<{}, {}>).styleName).toEqual(expect.stringMatching(/^Foo/));
    expect((Hoc as StyledComponent<{}, {}>).WrappedComponent).toBe(Foo);
  });
});
