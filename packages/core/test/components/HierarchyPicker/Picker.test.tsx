import React from 'react';
import Enzyme from 'enzyme';
import { mountWithStyles, shallowWithStyles } from '@airbnb/lunar-test-utils';
import Picker, {
  Picker as BasePicker,
  Props as PickerProps,
  State as PickerState,
} from '../../../src/components/HierarchyPicker/Picker';
import Search from '../../../src/components/HierarchyPicker/Search';
import Hierarchy from '../../../src/components/HierarchyPicker/Hierarchy';
import { ARROW_DOWN, ARROW_UP } from '../../../src/keys';
import testItems from './mockItems';

const props = {
  onClose: jest.fn(),
  onSubtree: jest.fn(),
  onItemPicked: jest.fn(),
  onSearch: jest.fn(),
  chosen: ['foo', 'bar'],
  searchPlaceholder: 'search',
  noResultsLabel: 'nope',
  items: testItems,
  formatter: (chosen: string[]) => chosen.join(' > '),
};

describe('<Picker />', () => {
  it('renders a Search', () => {
    const wrapper = shallowWithStyles(<Picker {...props} />);
    expect(wrapper.find(Search)).toHaveLength(1);
  });

  it('renders a Hierarchy when Search is empty', () => {
    const wrapper = shallowWithStyles(<Picker {...props} />);
    expect(wrapper.find(Hierarchy)).toHaveLength(1);
    wrapper.setState({ searchQuery: 'search ' });
    expect(wrapper.find(Hierarchy)).toHaveLength(0);
  });

  describe('handles scroll and focus', () => {
    const oldScrollTo = window.scrollTo;
    const oldFocus = HTMLDivElement.prototype.focus;
    const oldGetFocusables = BasePicker.prototype.getFocusables;

    beforeEach(() => {
      jest.spyOn(window, 'scrollTo').mockImplementation();
    });

    afterEach(() => {
      window.scrollTo = oldScrollTo;
      HTMLDivElement.prototype.focus = oldFocus;
      BasePicker.prototype.getFocusables = oldGetFocusables;
    });

    it('calls scrollTo on mount', () => {
      mountWithStyles(<Picker {...props} />);
      expect(window.scrollTo).toHaveBeenCalled();
    });

    describe('focusables', () => {
      it('has getFocusables() fn', () => {
        const instance = shallowWithStyles(<Picker {...props} />).instance();
        expect(() => (instance as BasePicker).getFocusables()).not.toThrow();
      });

      it('focusNext() invokes .focus() on focusables', () => {
        jest.spyOn(HTMLDivElement.prototype, 'focus').mockImplementation();
        const mockElement = document.createElement('div');
        const mockFocusables = [mockElement];

        mockFocusables.findIndex = () => 0;
        const mockGetFocusables = jest.fn(() => mockFocusables);
        BasePicker.prototype.getFocusables = mockGetFocusables;

        const instance = shallowWithStyles(<Picker {...props} />).instance();

        // @ts-ignore private invocation
        instance.focusNext();
        // @ts-ignore private invocation
        instance.focusNext(true);

        // these are also called at mount
        expect(mockGetFocusables).toHaveBeenCalledTimes(3);
        expect(HTMLDivElement.prototype.focus).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('has a focusNext function', () => {
    let wrapper: Enzyme.ShallowWrapper<PickerProps, PickerState>;
    let instance: BasePicker;

    beforeEach(() => {
      wrapper = shallowWithStyles(<Picker {...props} />);
      instance = wrapper.instance() as BasePicker;
    });

    it('will focus forward', () => {
      expect(() => instance.focusNext()).not.toThrow();
    });

    it('will focus backwards', () => {
      expect(() => instance.focusNext(false)).not.toThrow();
    });
  });

  describe('handler functions', () => {
    let myProps: PickerProps;
    let wrapper: Enzyme.ShallowWrapper<PickerProps, PickerState>;

    beforeEach(() => {
      myProps = { ...props, onItemPicked: jest.fn(), onClose: jest.fn() };
      wrapper = shallowWithStyles(<Picker {...myProps} />);
    });

    describe('handleItemPicked', () => {
      it('calls close if passed something', () => {
        const details = { origin: 'Search' };
        wrapper.find(Search).simulate('itemPicked', ['foo'], details);

        expect(myProps.onClose).toHaveBeenCalled();
        expect(myProps.onItemPicked).toHaveBeenCalledWith(['foo'], details);
      });

      it('does not call close if passed falsy', () => {
        wrapper.find(Search).simulate('itemPicked', null);

        expect(myProps.onClose).not.toHaveBeenCalled();
        expect(myProps.onItemPicked).not.toHaveBeenCalled();
      });
    });

    it('updates searchQuery state upon searching', () => {
      const onSearch = wrapper.find(Search).prop('onSearch') as (q: string) => void;
      onSearch('hello');
      expect(wrapper.state('searchQuery')).toBe('hello');
    });

    describe('handleKeyDown', () => {
      it('default', () => {
        wrapper.simulate('keydown', {});
        expect(myProps.onClose).not.toHaveBeenCalled();
      });

      describe('ARROWs', () => {
        it('ARROW_UP', () => {
          const spy = jest.fn();
          wrapper.simulate('keydown', { key: ARROW_UP, preventDefault: spy });
          expect(spy).toHaveBeenCalled();
        });

        it('ARROW_DOWN', () => {
          const spy = jest.fn();
          wrapper.simulate('keydown', { key: ARROW_DOWN, preventDefault: spy });
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });
});
