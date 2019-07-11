import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import Hierarchy from '../../../src/components/HierarchyPicker/Hierarchy';
import HierarchyList, {
  HierarchyList as BaseHierarchyList,
  Props as HierarchyListProps,
} from '../../../src/components/HierarchyPicker/Hierarchy/HierarchyList';
import HierarchyItem, {
  Props as HierarchyItemProps,
} from '../../../src/components/HierarchyPicker/Hierarchy/HierarchyItem';
import ItemDescription from '../../../src/components/HierarchyPicker/Hierarchy/ItemDescription';
import { ChoiceDetails } from '../../../src/components/HierarchyPicker/types';
import { SPACE, ENTER, ARROW_LEFT, ARROW_RIGHT } from '../../../src/keys';
import testItems from './mockItems';

const props = {
  onClose: jest.fn(),
  onSubtree: jest.fn(),
  onItemPicked: jest.fn(),
  chosen: ['foo', 'bar'],
  searchPlaceholder: 'search',
  noResultsLabel: 'nope',
  items: testItems,
  formatter: jest.fn(),
};

describe('<Hierarchy />', () => {
  describe('Hierarchy', () => {
    it('filters readonly items and updates on prop change', () => {
      const readOnlyItems = [
        { name: 'test', readonly: true, items: [{ name: 'test 2', readonly: true }] },
      ];
      const wrapper = shallow(<Hierarchy {...props} />);
      expect(wrapper.state('filteredItems')).toHaveLength(props.items.length);

      wrapper.setProps({ items: readOnlyItems });
      expect(wrapper.state('filteredItems')).toHaveLength(0);

      wrapper.setProps({ items: undefined });
      expect(wrapper.state('filteredItems')).toHaveLength(0);
    });

    it('decorates onItemPicked with correct origin', () => {
      const handlePicked = jest.fn();
      const wrapper = shallow(<Hierarchy {...props} onItemPicked={handlePicked} />);
      expect(handlePicked).not.toHaveBeenCalled();
      wrapper.find(HierarchyList).simulate('itemPicked', ['foo']);
      expect(handlePicked).toHaveBeenCalledWith(['foo'], {
        origin: 'Hierarchy',
      } as ChoiceDetails);
    });

    it('handles focus definition updates', () => {
      const wrapper = shallow(<Hierarchy {...props} />);
      expect(wrapper.state('focusDef')).toEqual([]);

      const list = wrapper.find(HierarchyList);

      list.prop('onSubtree')(['foo']); // debounced = no affect
      expect(wrapper.state('focusDef')).toEqual([]);

      list.prop('onSubtree')(['foo', 'bar'], undefined, /** immediate= */ true);
      expect(wrapper.state('focusDef')).toEqual(['foo', 'bar']);
    });
  });

  describe('HierarchyList', () => {
    let wrapper: Enzyme.ShallowWrapper<HierarchyListProps>;
    let instance: BaseHierarchyList;

    beforeEach(() => {
      wrapper = shallowWithStyles(<HierarchyList {...props} focus={['foo']} />);
      instance = wrapper.instance() as BaseHierarchyList;
    });

    describe('instance', () => {
      it('isChosen(definition) correctly matches props.chosen', () => {
        expect(instance.isChosen(['blah'])).toBe(false);
        expect(instance.isChosen(['foo'])).toBe(true);
        expect(instance.isChosen(['foo', 'bar'])).toBe(true);
        expect(instance.isChosen(['foo', 'bar', 'whatever'])).toBe(false);
      });

      it('has domFocus functions that do not throw', () => {
        // @ts-ignore Allow private access
        expect(instance.handleDomFocusDeeper).not.toThrow();
        // @ts-ignore Allow private access
        expect(instance.handleDomFocusShallower).not.toThrow();

        wrapper.setProps({ verticallyAlign: true });
        instance = wrapper.instance() as BaseHierarchyList;

        // @ts-ignore Allow private access
        expect(instance.handleDomFocusDeeper).not.toThrow();
        // @ts-ignore Allow private access
        expect(instance.handleDomFocusShallower).not.toThrow();
      });
    });

    describe('recursive', () => {
      it('renders nested HierarchyList', () => {
        expect(wrapper.find(BaseHierarchyList)).toHaveLength(1);
      });

      it('renders HierarchyList as <ul> child verticallyAlign=false', () => {
        const ul = wrapper.find('ul');
        expect(ul.find(BaseHierarchyList)).toHaveLength(1);
      });

      it('renders HierarchyList as <ul> sibling li if verticallyAlign=true', () => {
        wrapper.setProps({ verticallyAlign: true });
        const ul = wrapper.find('ul');
        expect(ul.find(BaseHierarchyList)).toHaveLength(0);
      });
    });

    describe('ItemDescription', () => {
      it('renders an ItemDescription if a description is focused', () => {
        wrapper.setProps({ focus: ['foo', 'coverage is hard'] });
        let nestedList = wrapper.find(BaseHierarchyList).dive();
        expect(nestedList.find(ItemDescription)).toHaveLength(1);

        wrapper.setProps({ verticallyAlign: true });
        nestedList = wrapper.find(BaseHierarchyList).dive();
        expect(nestedList.find(ItemDescription)).toHaveLength(1);
      });

      it('renders null if a description is focused', () => {
        wrapper.setProps({ focus: ['foo', 'hello'] });
        const nestedList = wrapper.find(BaseHierarchyList).dive();
        expect(nestedList.find(ItemDescription)).toHaveLength(0);
      });

      it('renders description text', () => {
        wrapper.setProps({ focus: ['foo', 'coverage is hard'] });
        const nestedList = wrapper.find(BaseHierarchyList).dive();
        const description = nestedList.find(ItemDescription);
        expect(description.prop('item').description).toMatch('very hard');
      });

      it('Clicking description invokes onItemPicked', () => {
        wrapper.setProps({ focus: ['foo', 'coverage is hard'] });
        const nestedList = wrapper.find(BaseHierarchyList).dive();
        const button = nestedList.find('aside button');
        button.simulate('click');

        expect(props.onItemPicked).toHaveBeenCalled();
      });
    });
  });

  describe('HierarchyItem', () => {
    let itemProps: any;
    let wrapper: Enzyme.ShallowWrapper<HierarchyItemProps>;

    beforeEach(() => {
      itemProps = {
        item: testItems[0].items[0],
        definition: ['foo', 'bar'],
        selected: false,
        focused: false,
        onSubtree: jest.fn((d, cb) => cb && cb()),
        onItemPicked: jest.fn(),
        onDomFocusDeeper: jest.fn(),
        onDomFocusShallower: jest.fn(),
        renderItem: jest.fn(),
      };
      wrapper = shallowWithStyles(<HierarchyItem {...itemProps} />);
    });

    it('calls onDomFocusDeeper on key right', () => {
      wrapper.simulate('keyDown', { key: ARROW_RIGHT });
      expect(itemProps.onSubtree).toHaveBeenCalled();
      expect(itemProps.onDomFocusDeeper).toHaveBeenCalled();
    });

    it('calls onDomFocusShallower on key left', () => {
      wrapper.simulate('keyDown', { key: ARROW_LEFT });
      expect(itemProps.onSubtree).toHaveBeenCalled();
      expect(itemProps.onDomFocusShallower).toHaveBeenCalled();
    });

    it('calls onItemPicked on space key', () => {
      wrapper.simulate('keyDown', { key: SPACE });
      expect(itemProps.onItemPicked).toHaveBeenCalled();
    });

    it('calls onItemPicked on enter key', () => {
      wrapper.simulate('keyDown', { key: ENTER });
      expect(itemProps.onItemPicked).toHaveBeenCalled();
    });

    it('does nothing in default case', () => {
      wrapper.simulate('keyDown', {});
      expect(itemProps.onItemPicked).not.toHaveBeenCalled();
    });

    it('calls onItemPicked on click', () => {
      wrapper.simulate('click');
      expect(itemProps.onItemPicked).toHaveBeenCalled();
    });

    it('calls onSubtree on mousemove', () => {
      wrapper.simulate('mousemove');
      expect(itemProps.onSubtree).toHaveBeenCalledWith(itemProps.definition);
    });

    it('sets tabIndex=1 when focused', () => {
      expect(wrapper.prop('tabIndex')).toBe(0);
      wrapper.setProps({ focused: true });
      expect(wrapper.prop('tabIndex')).toBe(1);
    });

    it('allows override with renderItem', () => {
      expect(itemProps.renderItem).toHaveBeenCalled();
    });
  });
});
