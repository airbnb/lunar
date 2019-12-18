import React from 'react';
import { StyledComponent } from 'aesthetic-react';
import withTheme from '../../src/composers/withTheme';

describe('withTheme()', () => {
  function Foo() {
    return <div />;
  }

  it('returns an HOC', () => {
    const Hoc = withTheme()(Foo);

    expect(Hoc.displayName).toBe('withTheme(Foo)');
    expect((Hoc as StyledComponent<{}>).WrappedComponent).toBe(Foo);
  });
});
