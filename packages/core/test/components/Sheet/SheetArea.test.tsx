import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { mockContextProvider } from '@airbnb/lunar-test-utils';
import SheetArea, {
  SheetArea as BaseSheetArea,
  Props,
  State,
} from '../../../src/components/Sheet/SheetArea';
import SheetContext from '../../../src/components/Sheet/SheetContext';

describe('<SheetArea />', () => {
  let unmockProvider: () => void;

  beforeEach(() => {
    unmockProvider = mockContextProvider(SheetContext);
  });

  afterEach(() => {
    unmockProvider();
  });

  it('renders the child content', () => {
    const wrapper = shallow(<SheetArea>Content</SheetArea>).dive();

    expect(wrapper.find('div').prop('children')).toBe('Content');
  });

  it('defines a class when setSheetVisible is called', () => {
    const wrapper: Enzyme.ShallowWrapper<Props, State> = shallow(
      <SheetArea>Content</SheetArea>,
    ).dive();

    (wrapper.instance() as BaseSheetArea).setSheetVisible(true);

    expect(wrapper.state().visible).toBe(true);
  });
});
