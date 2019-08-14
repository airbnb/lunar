import React from 'react';
import { shallow } from 'enzyme';
import Image from '../../src/components/Image';

const url =
  'https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg';

describe('<Image />', () => {
  it('renders default', () => {
    const wrapper = shallow(<Image src={url} alt="Test" />);

    expect(wrapper.type()).toBe('div');
    expect(wrapper.childAt(0).type()).toBe('img');
    expect(wrapper.childAt(0).prop('width')).toBe('100%');
    expect(wrapper.childAt(0).prop('height')).toBe('auto');
  });

  it('has custom height/width', () => {
    const wrapper = shallow(<Image src={url} alt="Test" height={200} width={400} />);

    expect(wrapper.childAt(0).prop('height')).toBe(200);
    expect(wrapper.childAt(0).prop('width')).toBe(400);
  });

  it('is background image', () => {
    const wrapper = shallow(<Image background src={url} alt="Test" />);

    expect(wrapper.childAt(0).type()).toBe('div');
    expect(wrapper.childAt(0).prop('className')).toMatch('background');
  });

  it('pass cover/contain to background image', () => {
    const wrapper = shallow(<Image background contain src={url} alt="Test" />);
    expect(wrapper.childAt(0).prop('className')).toMatch('contain');

    wrapper.setProps({ contain: false, cover: true });
    expect(wrapper.childAt(0).prop('className')).toMatch('cover');
  });

  it('throws error if cover and contain are both true', () => {
    expect(() => shallow(<Image background contain cover src={url} alt="Test" />)).toThrowError();
  });
});
