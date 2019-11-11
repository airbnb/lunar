import React from 'react';
import { shallow } from 'enzyme';
import Row from '../../src/components/Row';

describe('<Row />', () => {
  it('renders with a baseline', () => {
    const wrapper = shallow(<Row baseline>PRIMARY</Row>);

    expect(wrapper.prop('className')).toMatch('row_baseline');
  });

  it('renders with a topline', () => {
    const wrapper = shallow(<Row topline>PRIMARY</Row>);

    expect(wrapper.prop('className')).toMatch('row_topline');
  });

  it('renders as inline', () => {
    const wrapper = shallow(<Row inline>PRIMARY</Row>);

    expect(wrapper.find('div > div').prop('className')).toMatch('inline');
  });

  it('renders as compact', () => {
    const wrapper = shallow(<Row compact>PRIMARY</Row>);

    expect(wrapper.prop('className')).toMatch('row_compact');
  });

  it('renders as spacious', () => {
    const wrapper = shallow(<Row spacious>PRIMARY</Row>);

    expect(wrapper.prop('className')).toMatch('row_spacious');
  });

  it('renders in middle', () => {
    const wrapper = shallow(<Row middleAlign>PRIMARY</Row>);

    expect(wrapper.prop('className')).toMatch('row_middleAlign');
  });

  describe('when only primary content is provided', () => {
    const wrapper = shallow(<Row>PRIMARY</Row>);

    it('renders a single div child', () => {
      expect(wrapper.find('div > div')).toHaveLength(1);
    });

    it('outputs only the primary text', () => {
      expect(wrapper.text()).toBe('PRIMARY');
    });
  });

  describe('when primary and before or after content is provided', () => {
    const wrapperWithAfter = shallow(<Row after="after">PRIMARY</Row>);
    const wrapperWithBefore = shallow(<Row before="before">PRIMARY</Row>);

    it('renders two div children', () => {
      expect(wrapperWithAfter.find('div > div')).toHaveLength(2);
      expect(wrapperWithBefore.find('div > div')).toHaveLength(2);
    });

    it('outputs the primary text with before and after text in the correct order', () => {
      expect(wrapperWithAfter.text()).toBe('PRIMARYafter');
      expect(wrapperWithBefore.text()).toBe('beforePRIMARY');
    });
  });

  describe('when primary, before, and after content are all provided', () => {
    const wrapper = shallow(
      <Row before="before" after="after">
        PRIMARY
      </Row>,
    );

    it('renders a single div child', () => {
      expect(wrapper.find('div > div')).toHaveLength(3);
    });

    it('outputs the before, primary, and after text in correct order', () => {
      expect(wrapper.text()).toBe('beforePRIMARYafter');
    });
  });
});
