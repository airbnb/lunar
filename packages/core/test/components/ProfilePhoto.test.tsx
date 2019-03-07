import React from 'react';
import { shallow } from 'enzyme';
import ProfilePhoto from '../../src/components/ProfilePhoto';

describe('<ProfilePhoto />', () => {
  const imageSrc = 'https://domain.com/some/file.jpg';
  const title = 'Name';
  const props = {
    imageSrc,
    title,
  };

  it('renders with the expected props (but not necessarily with the expected styles)', () => {
    const wrapper = shallow(<ProfilePhoto {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('correctly sets the image title', () => {
    const wrapper = shallow(<ProfilePhoto {...props} />).dive();
    expect(wrapper.find(`img[title="${title}"]`)).toHaveLength(1);
  });

  it('renders inline', () => {
    const wrapper = shallow(<ProfilePhoto {...props} inline />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders small', () => {
    const wrapper = shallow(<ProfilePhoto {...props} small />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders large', () => {
    const wrapper = shallow(<ProfilePhoto {...props} large />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders macro', () => {
    const wrapper = shallow(<ProfilePhoto {...props} macro />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders custom size', () => {
    const wrapper = shallow(<ProfilePhoto {...props} size={8} />).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
