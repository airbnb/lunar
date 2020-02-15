import React from 'react';
import { shallow } from 'enzyme';
import Grid, { Col } from '../../src/components/Grid';

describe('<Grid />', () => {
  it('renders by default', () => {
    const wrapper = shallow(
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
      const wrapper = shallow(
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
