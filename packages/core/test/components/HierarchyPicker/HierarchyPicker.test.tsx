import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import HierarchyPicker, {
  HierarchyPicker as BaseHierarchyPicker,
  Props as HierarchyPickerProps,
  State as HierarchyPickerState,
} from '../../../src/components/HierarchyPicker';
import { SPACE, ENTER } from '../../../src/keys';
import Overlay from '../../../src/components/Overlay';
import testItems from './mockItems';
import Picker, { Props as PickerProps } from '../../../src/components/HierarchyPicker/Picker';

jest.mock('lodash/debounce', () => jest.fn(fn => fn));

const props = {
  chosen: ['foo', 'bar'],
  hierarchyMaxHeight: 127,
  hierarchyWidth: 1000,
  indexParentPath: true,
  items: testItems,
  noResultsLabel: 'nope',
  onClose: jest.fn(),
  onSubtree: jest.fn(),
  onItemPicked: jest.fn(),
  renderItem: undefined,
  searchMaxHeight: 101,
  searchPlaceholder: 'search',
  searchWidth: 27,
  verticallyAlign: true,
};

describe('<HierarchyPicker />', () => {
  describe('formatter', () => {
    it('default works', () => {
      const wrapper = shallow(<HierarchyPicker {...props} />).dive();
      const instance = wrapper.instance() as BaseHierarchyPicker;

      expect(instance.boundFormatter(['foo'])).toBe('Foo');
      expect(instance.boundFormatter(['foo', 'hello'])).toBe('Foo > hello');
      expect(instance.boundFormatter(props.chosen)).toBe('Foo > Barrrrrr');
      expect(instance.boundFormatter([])).toBe('Select from hierarchy');
    });

    it('custom works', () => {
      const formatter = jest.fn(() => 'test');
      const wrapper = shallow(<HierarchyPicker {...props} formatter={formatter} />).dive();
      const instance = wrapper.instance() as BaseHierarchyPicker;

      expect(instance.boundFormatter([])).toBe('test');
      expect(formatter).toHaveBeenCalledTimes(2); // shallow + above call
    });
  });

  describe('handler functions', () => {
    let wrapper: Enzyme.ShallowWrapper<HierarchyPickerProps, HierarchyPickerState>;
    let instance: BaseHierarchyPicker;
    let button: Enzyme.ShallowWrapper;
    let handleToggle: jest.Mock;

    beforeEach(() => {
      handleToggle = jest.fn();
      wrapper = shallow(<HierarchyPicker {...props} onPickerToggle={handleToggle} />).dive();
      instance = wrapper.instance() as BaseHierarchyPicker;
      button = wrapper.find('div[role="button"]');
    });

    it('toggle and handleClose', () => {
      expect(handleToggle).not.toHaveBeenCalled();
      expect(instance.state.open).toBe(false);
      instance.toggle();
      expect(instance.state.open).toBe(true);
      expect(handleToggle).toHaveBeenCalledWith(true);
      wrapper.find(Overlay).simulate('close');
      expect(instance.state.open).toBe(false);
      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    it('disabled prop prevents toggle', () => {
      wrapper.setProps({ disabled: true });
      expect(handleToggle).not.toHaveBeenCalled();
      expect(instance.state.open).toBe(false);
      instance.toggle();
      expect(instance.state.open).toBe(false);
      expect(handleToggle).not.toHaveBeenCalled();
    });

    it('handleClick', () => {
      expect(handleToggle).not.toHaveBeenCalled();
      expect(instance.state.open).toBe(false);
      button.simulate('click');

      expect(instance.state.open).toBe(true);
      expect(handleToggle).toHaveBeenCalledWith(true);
      wrapper.find(Overlay).simulate('close');
      expect(instance.state.open).toBe(false);
      expect(handleToggle).toHaveBeenCalledWith(false);
    });

    describe('handleKeyDown', () => {
      let event: any;

      beforeEach(() => {
        event = { preventDefault: jest.fn(), target: instance.ref.current };
        expect(instance.state.open).toBe(false);
      });

      it('default', () => {
        button.simulate('keydown', event);
        expect(instance.state.open).toBe(false);
        expect(handleToggle).not.toHaveBeenCalled();
      });

      it('with wrong target', () => {
        button.simulate('keydown', { ...event, target: null });
        expect(instance.state.open).toBe(false);
        expect(handleToggle).not.toHaveBeenCalled();
      });

      it('ENTER', () => {
        button.simulate('keydown', { ...event, key: ENTER });
        expect(instance.state.open).toBe(true);
        expect(handleToggle).toHaveBeenCalledWith(true);
      });

      it('SPACE', () => {
        button.simulate('keydown', { ...event, key: SPACE });
        expect(instance.state.open).toBe(true);
        expect(handleToggle).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('<Picker />', () => {
    it('renders a Picker', () => {
      const wrapper = shallow(<HierarchyPicker {...props} />).dive();
      expect(wrapper.find(Picker)).toHaveLength(1);
    });

    it('passes through relevant props', () => {
      const wrapper = shallow(<HierarchyPicker {...props} />).dive();
      const pickerProps = wrapper.find(Picker).props() as PickerProps;
      expect(pickerProps.chosen).toBe(props.chosen);
      expect(pickerProps.hierarchyMaxHeight).toBe(props.hierarchyMaxHeight);
      expect(pickerProps.hierarchyWidth).toBe(props.hierarchyWidth);
      expect(pickerProps.indexParentPath).toBe(props.indexParentPath);
      expect(pickerProps.items).toBe(props.items);
      expect(pickerProps.noResultsLabel).toBe(props.noResultsLabel);
      expect(pickerProps.searchMaxHeight).toBe(props.searchMaxHeight);
      expect(pickerProps.searchPlaceholder).toBe(props.searchPlaceholder);
      expect(pickerProps.searchWidth).toBe(props.searchWidth);
      expect(pickerProps.renderItem).toBe(props.renderItem);
      expect(pickerProps.searchPlaceholder).toBe(props.searchPlaceholder);
      expect(pickerProps.verticallyAlign).toBe(props.verticallyAlign);
    });
  });

  it('accepts invalid prop', () => {
    const emptyItems = { ...props, items: [] };
    const wrapper = shallow(<HierarchyPicker {...emptyItems} />).dive();
    const markupValid = wrapper.html();
    wrapper.setProps({ invalid: true });
    expect(wrapper.html()).not.toEqual(markupValid);
  });
});
