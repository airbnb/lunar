import React from 'react';
import { shallow } from 'enzyme';
import SecondaryMark from '../../../src/components/TextArea/Proofreader/Mark';

describe('<SecondaryMark />', () => {
  it('renders a secondary mark', () => {
    const wrapper = shallow(
      <SecondaryMark selected={false} onSelect={() => {}} alwaysHighlight>
        Word
      </SecondaryMark>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
