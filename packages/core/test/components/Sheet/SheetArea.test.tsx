import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import SheetArea, { SheetArea as BaseSheetArea } from '../../../src/components/Sheet/SheetArea';

describe('<SheetArea />', () => {
  it('renders the child content', () => {
    const wrapper = shallowWithStyles(<SheetArea>Content</SheetArea>);

    expect(wrapper.find('div').prop('children')).toBe('Content');
  });

  it('defines a class when setSheetVisible is called', () => {
    const wrapper = shallowWithStyles<BaseSheetArea>(<SheetArea>Content</SheetArea>);

    wrapper.instance().setSheetVisible(true);

    expect(wrapper.state('visible')).toBe(true);
  });
});
