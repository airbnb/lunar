import React from 'react';
import { shallow } from 'enzyme';
import ResponsiveImage from '../../../src/components/ResponsiveImage';
import Image from '../../../src/components/Lightbox/Image';

describe('<LightboxImage />', () => {
  const props = {
    alt: 'foo',
    src: 'bar',
  };

  it('renders a ResponsiveImage', () => {
    const wrapper = shallow(<Image {...props} />).dive();

    expect(wrapper.find(ResponsiveImage)).toHaveLength(1);
  });

  it('renders aside content', () => {
    const aside = <div>Before</div>;
    const wrapper = shallow(<Image {...props} aside={aside} />).dive();

    expect(wrapper.find('aside')).toHaveLength(1);
    expect(wrapper.find('aside').contains(aside)).toBe(true);
  });

  it('hides aside content when hideAside is true', () => {
    const aside = <div>Before</div>;
    const wrapper = shallow(<Image {...props} hideAside aside={aside} />).dive();

    expect(wrapper.find('aside')).toHaveLength(0);
    expect(wrapper.find('aside').contains(aside)).toBe(false);
  });
});
