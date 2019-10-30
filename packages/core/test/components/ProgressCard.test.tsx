import React from 'react';
import { shallow } from 'enzyme';
import ProgressCard from '../../src/components/ProgressCard';
import ProgressBar from '../../src/components/ProgressBar';
import SteppedProgressBar, { Step } from '../../src/components/SteppedProgressBar';
import Text from '../../src/components/Text';

describe('<Card />', () => {
  it('renders a `ProgressBar`', () => {
    const wrapper = shallow(
      <ProgressCard title="Card" progress={<ProgressBar percent={0} />} />,
    ).dive();

    expect(wrapper.find(ProgressBar)).toHaveLength(1);
  });

  it('renders a `SteppedProgressBar`', () => {
    const wrapper = shallow(
      <ProgressCard
        title="Card"
        progress={
          <SteppedProgressBar>
            <Step />
          </SteppedProgressBar>
        }
      />,
    ).dive();

    expect(wrapper.find(SteppedProgressBar)).toHaveLength(1);
  });

  it('renders child content', () => {
    const child = <div />;
    const wrapper = shallow(
      <ProgressCard title="Card" progress={<ProgressBar percent={0} />}>
        {child}
      </ProgressCard>,
    ).dive();

    expect(wrapper.contains(child)).toBe(true);
  });

  it('renders title', () => {
    const wrapper = shallow(
      <ProgressCard title="Card" progress={<ProgressBar percent={0} />} />,
    ).dive();

    expect(wrapper.find(Text).prop('children')).toBe('Card');
  });

  it('errors if an unsupported progress bar is used', () => {
    expect(() => {
      shallow(<ProgressCard title="Card" progress={<div />} />).dive();
    }).toThrow();
  });
});
