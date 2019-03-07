import React from 'react';
import { shallow } from 'enzyme';
import Card from '../../src/components/Card';

describe('<Card />', () => {
  it('errors if `Content` child is not passed', () => {
    expect(() => {
      shallow(<Card>Invalid</Card>);
    }).toThrowError();
  });
});
