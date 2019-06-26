import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Col from '../../src/components/Grid/Col';

describe('<Col />', () => {
  const range = Array.from({ length: 12 }, (v, k) => k + 1);

  range.forEach(span => {
    it(`renders span ${span}`, () => {
      const wrapper = shallowWithStyles(<Col span={span as any}>Child</Col>);

      expect(wrapper.prop('data-span')).toBe(span);
    });

    const offset = span - 1;

    it(`renders offset ${offset}`, () => {
      const wrapper = shallowWithStyles(
        <Col span={span as any} offset={offset as any}>
          Child
        </Col>,
      );

      expect(wrapper.prop('data-offset')).toBe(offset);
    });
  });
});
