import React from 'react';
import childrenWithComponentName from '../../src/prop-types/childrenWithComponentName';

function Foo() {
  return null;
}

function Bar() {
  return null;
}

describe('childrenWithComponentName()', () => {
  it('doesnt error for proper name', () => {
    expect(
      childrenWithComponentName(/Foo/)({ children: <Foo /> }, 'children', 'Foo', '', ''),
    ).toBeNull();
  });

  it('errors for invalid name', () => {
    expect(
      childrenWithComponentName(/Foo/)({ children: <Bar /> }, 'children', 'Bar', '', ''),
    ).not.toBeNull();
  });
});
