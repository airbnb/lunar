import React from 'react';
import { shallow } from 'enzyme';
import IconCaretUp from '@airbnb/lunar-icons/lib/interface/IconCaretUp';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import SortCarets from '../../src/components/SortCarets';

describe('<SortCarets />', () => {
  it('renders up caret', () => {
    const wrapper = shallow(<SortCarets up />);

    expect(wrapper.find(IconCaretUp)).toHaveLength(1);
    expect(wrapper.find(IconCaretDown)).toHaveLength(0);
  });

  it('renders down caret', () => {
    const wrapper = shallow(<SortCarets down />);

    expect(wrapper.find(IconCaretUp)).toHaveLength(0);
    expect(wrapper.find(IconCaretDown)).toHaveLength(1);
  });

  it('renders both carets', () => {
    const wrapper = shallow(<SortCarets down up />);

    expect(wrapper.find(IconCaretUp)).toHaveLength(1);
    expect(wrapper.find(IconCaretDown)).toHaveLength(1);
  });

  it('sets active on up caret', () => {
    const wrapper = shallow(<SortCarets down up enableUp />);

    expect(wrapper.find('span').at(1).prop('className')).toMatch('caret_active');
    expect(wrapper.find('span').at(2).prop('className')).toMatch('caret_inactive');
  });

  it('sets active on down caret', () => {
    const wrapper = shallow(<SortCarets down up enableDown />);

    expect(wrapper.find('span').at(1).prop('className')).toMatch('caret_inactive');
    expect(wrapper.find('span').at(2).prop('className')).toMatch('caret_active');
  });
});
