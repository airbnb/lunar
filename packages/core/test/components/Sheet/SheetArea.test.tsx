import React from 'react';
import { shallow } from 'enzyme';
import SheetArea from '../../../src/components/Sheet/SheetArea';

describe('<SheetArea />', () => {
  it('renders the child content', () => {
    const wrapper = shallow(<SheetArea>Content</SheetArea>);

    expect(wrapper.find('div').prop('children')).toBe('Content');
  });

  // it('defines a class when setSheetVisible is called', () => {
  //   const wrapper = shallow<BaseSheetArea>(<SheetArea>Content</SheetArea>);

  //   wrapper.instance().setSheetVisible(true);

  //   expect(wrapper.state('visible')).toBe(true);
  // });
});
