import React from 'react';
import { shallow } from 'enzyme';
import Col, { Props } from '../../src/components/Grid/Col';

describe('<Col />', () => {
  const range = Array.from({ length: 12 }, (v, k) => k + 1);

  range.forEach(span => {
    it(`renders span ${span}`, () => {
      const wrapper = shallow(<Col span={span as Props['span']}>Child</Col>);

      expect(wrapper.prop('data-span')).toBe(span);
    });

    const offset = span - 1;

    it(`renders offset ${offset}`, () => {
      const wrapper = shallow(
        <Col span={span as Props['span']} offset={offset as Props['offset']}>
          Child
        </Col>,
      );

      expect(wrapper.prop('data-offset')).toBe(offset);
    });
  });
});
