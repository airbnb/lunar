import React from 'react';
import { shallow } from 'enzyme';
import Col, { ColProps } from '../../src/components/Grid/Col';

describe('<Col />', () => {
  const range = Array.from({ length: 12 }, (v, k) => k + 1);

  range.forEach(span => {
    it(`renders span ${span}`, () => {
      const wrapper = shallow(<Col span={span as ColProps['span']}>Child</Col>);

      expect(wrapper.prop('data-span')).toBe(span);
    });

    const offset = span - 1;

    it(`renders offset ${offset}`, () => {
      const wrapper = shallow(
        <Col span={span as ColProps['span']} offset={offset as ColProps['offset']}>
          Child
        </Col>,
      );

      expect(wrapper.prop('data-offset')).toBe(offset);
    });
  });
});
