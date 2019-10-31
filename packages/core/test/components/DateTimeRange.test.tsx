import React from 'react';
import { shallow, mount } from 'enzyme';
import { wrapEnv } from '@airbnb/lunar-test-utils';
import DateTime from '../../src/components/DateTime';
import DateTimeRange from '../../src/components/DateTimeRange';
import Empty from '../../src/components/Empty';

describe('<DateTimeRange />', () => {
  let dateA: Date;
  let dateB: Date;
  let dateC: Date;
  let dateD: Date;

  beforeEach(() => {
    dateA = new Date(Date.UTC(1988, 1, 26, 0, 0, 0));
    dateB = new Date(Date.UTC(1988, 1, 27, 0, 0, 0));
    dateC = new Date(Date.UTC(1988, 2, 10, 0, 0, 0));
    dateD = new Date(Date.UTC(1989, 6, 23, 0, 0, 0));
  });

  it('renders the correct number of elements when year is different', () => {
    const wrapper = shallow(<DateTimeRange from={dateA} to={dateD} />);

    expect(wrapper.find(DateTime)).toHaveLength(2);
  });

  it('renders the correct number of elements when month is different', () => {
    const wrapper = shallow(<DateTimeRange from={dateA} to={dateC} />);

    expect(wrapper.find(DateTime)).toHaveLength(2);
  });

  it('renders the correct number of elements when day is different', () => {
    const wrapper = shallow(<DateTimeRange from={dateA} to={dateB} />);

    expect(wrapper.find(DateTime)).toHaveLength(2);
  });

  it('renders the correct number of elements when days are the same', () => {
    const wrapper = shallow(<DateTimeRange from={dateD} to={dateD} />);

    expect(wrapper.find(DateTime)).toHaveLength(1);
  });

  it('renders empty component if any time is empty', () => {
    const wrapper1 = shallow(<DateTimeRange to={null} from={dateA} />);

    expect(wrapper1.find(Empty)).toHaveLength(1);

    const wrapper2 = shallow(<DateTimeRange to={dateB} from={null} />);

    expect(wrapper2.find(Empty)).toHaveLength(1);

    const wrapper3 = shallow(<DateTimeRange to={null} from={null} />);

    expect(wrapper3.find(Empty)).toHaveLength(1);
  });

  it('errors for an invalid time', () => {
    expect(() => shallow(<DateTimeRange from="2016-02-33" to={dateA} timezone="UTC" />)).toThrow(
      'Invalid DateTime: unit out of range: you specified 33 (of type number) as a day, which is invalid',
    );

    expect(() => shallow(<DateTimeRange from={dateA} to="2016-02-33" />)).toThrow(
      'Invalid DateTime: unit out of range: you specified 33 (of type number) as a day, which is invalid',
    );
  });

  it('errors for inproperly ordered times', () => {
    expect(() => shallow(<DateTimeRange from={dateB} to={dateA} timezone="UTC" />)).toThrow(
      'Invalid chronological order of timestamps passed to `DateTimeRange`',
    );
  });

  it(
    'doesnt error in production',
    wrapEnv('production', () => {
      expect(() => shallow(<DateTimeRange from={dateB} to={dateA} timezone="UTC" />)).not.toThrow();
    }),
  );

  it('accepts a separator parameter', () => {
    const wrapper = mount(
      <DateTimeRange from={dateA} to={dateB} separator=" to " timezone="UTC" />,
    );

    expect(wrapper.text().replace(/\s+/g, ' ')).toBe('Feb 26 to 27, 1988');
  });

  it('formats correctly for different days', () => {
    const wrapper = mount(<DateTimeRange from={dateA} to={dateB} timezone="UTC" />);

    expect(wrapper.text().replace(/\s+/g, ' ')).toBe('Feb 26 – 27, 1988');
  });

  it('formats correctly for different months', () => {
    const wrapper = mount(<DateTimeRange from={dateA} to={dateC} timezone="UTC" />);

    expect(wrapper.text().replace(/\s+/g, ' ')).toBe('Feb 26 – Mar 10, 1988');
  });

  it('formats correctly for different years', () => {
    const wrapper = mount(<DateTimeRange from={dateA} to={dateD} timezone="UTC" />);

    expect(wrapper.text().replace(/\s+/g, ' ')).toBe('Feb 26, 1988 – Jul 23, 1989');
  });

  it('formats correctly for the same day', () => {
    const wrapper = mount(<DateTimeRange from={dateC} to={dateC} timezone="UTC" />);

    expect(wrapper.text().replace(/\s+/g, ' ')).toBe('Mar 10, 1988');
  });

  it('formats correctly using no timezone', () => {
    const wrapper = mount(<DateTimeRange from={dateA} to={dateD} timezone={false} />);

    expect(wrapper.text().replace(/\s+/g, ' ')).toBe('Feb 26, 1988 – Jul 23, 1989');
  });
});
