import React from 'react';
import childrenWithComponentName from '../../src/prop-types/childrenWithComponentName';

describe('childrenWithComponentName()', () => {
  it('doesnt error for proper name', () => {
    function Foo() {
      return null;
    }

    expect(
      childrenWithComponentName(/Foo/)({ children: <Foo /> }, 'children', 'Foo', '', ''),
    ).toBeNull();
  });

  it('errors for invalid name', () => {
    function Bar() {
      return null;
    }

    expect(
      childrenWithComponentName(/Foo/)({ children: <Bar /> }, 'children', 'Bar', '', ''),
    ).not.toBeNull();
  });
});
