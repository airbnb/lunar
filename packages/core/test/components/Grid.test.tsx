import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Grid, { Col } from '../../src/components/Grid';

describe('<Grid />', () => {
  it('renders by default', () => {
    const wrapper = shallowWithStyles(
      <Grid>
        <Col span={6}>A</Col>
        <Col span={6}>B</Col>
      </Grid>,
    );

    expect(wrapper.find(Col)).toHaveLength(2);
  });

  [
    'bottomAlign',
    'centerAlign',
    'endAlign',
    'middleAlign',
    'reversed',
    'startAlign',
    'topAlign',
  ].forEach(type => {
    it(`renders ${type}`, () => {
      const wrapper = shallowWithStyles(
        <Grid {...{ [type]: true }}>
          <Col span={4}>A</Col>
          <Col span={4}>B</Col>
          <Col span={4}>B</Col>
        </Grid>,
      );

      expect(wrapper.find(Col)).toHaveLength(3);
    });
  });
});
