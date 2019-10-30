import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import T from '../../src/components/Translate';
import Autocomplete, {
  CACHE_DURATION,
  Props,
  State,
  Item as AutocompleteItem,
} from '../../src/components/Autocomplete';
import BaseInput from '../../src/components/private/BaseInput';
import FormField from '../../src/components/FormField';
import Text from '../../src/components/Text';
import Menu, { Item } from '../../src/components/Menu';
import { MenuRow } from '../../src/components/Menu/Row';
import ErrorMessage from '../../src/components/ErrorMessage';
import Loader from '../../src/components/Loader';

describe('<Autocomplete />', () => {
  const props = {
    name: 'foo',
    label: 'Label',
    accessibilityLabel: 'Label',
    maxHeight: 400,
    onChange() {},
    onLoadItems: () => Promise.resolve([]),
  };

  let wrapper: Enzyme.ShallowWrapper<Props, State, Autocomplete>;
  let instance: Autocomplete;

  beforeEach(() => {
    wrapper = shallow(<Autocomplete {...props} />);
    instance = wrapper.instance();
  });

  it('renders a field and input', () => {
    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseInput)).toHaveLength(1);
  });

  describe('componentDidMount()', () => {
    it('calls focus if `autoFocus`', () => {
      const spy = jest.spyOn(instance, 'focusInput');

      wrapper.setProps({
        autoFocus: true,
      });

      instance.componentDidMount();

      expect(spy).toHaveBeenCalled();
    });

    it('loads items if `loadItemsOnMount`', () => {
      const spy = jest.spyOn(instance, 'loadItems');

      wrapper.setProps({
        loadItemsOnMount: true,
      });

      instance.componentDidMount();

      expect(spy).toHaveBeenCalledWith('', true, expect.anything());
    });
  });

  describe('componentDidUpdate', () => {
    it('updates state value when props change', () => {
      wrapper.setProps({
        value: 'bar',
      });

      expect(wrapper.state('value')).toEqual('bar');
    });

    it('resets `highlightedIndex` if the index outside of the number of filtered items', () => {
      wrapper.setState({
        highlightedIndex: 3,
        items: [{ value: 'foo' }, { value: 'bar' }],
      });

      expect(wrapper.state('highlightedIndex')).toBeNull();
    });
  });

  describe('focusInput()', () => {
    it('calls focus on the inputRef if it exists', () => {
      const spy = jest.fn();
      const input = document.createElement('input');
      input.focus = spy;

      instance.inputRef = { current: input };
      instance.focusInput();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getItemValue()', () => {
    it('returns value from object', () => {
      expect(Autocomplete.defaultProps.getItemValue({ value: 123 })).toBe('123');
    });
  });

  describe('getInputProps()', () => {
    it('returns standard input props', () => {
      expect(wrapper.find(BaseInput).props()).toEqual(
        expect.objectContaining({
          disabled: false,
          invalid: false,
          name: 'foo',
          optional: false,
          placeholder: 'Search',
          type: 'search',
        }),
      );
    });
  });

  describe('handleChange()', () => {
    it('sets state and loads items', () => {
      jest.spyOn(instance, 'loadItems').mockImplementation();

      expect(wrapper.state('value')).toBe('');

      wrapper.find(BaseInput).simulate('change', 'foo', {});

      expect(wrapper.state('value')).toBe('foo');
      expect(instance.loadItems).toHaveBeenCalledWith('foo');
    });
  });

  describe('handleInputBlur()', () => {
    it('sets `ingoreFocus` to `true` `ingoreBlur` is `true`', () => {
      const spy = jest.fn();
      const input = document.createElement('input');
      input.focus = spy;
      instance.inputRef = { current: input };
      instance.ignoreBlur = true;
      instance.ignoreFocus = false;

      wrapper.find(BaseInput).simulate('blur', {});

      expect(spy).toHaveBeenCalled();
      expect(instance.ignoreFocus).toBeTruthy();
    });

    it('sets `open` to `false` if `ignoreBlur` is `false`', () => {
      wrapper.setState({
        highlightedIndex: 0,
        open: true,
      });

      instance.ignoreBlur = false;
      wrapper.find(BaseInput).simulate('blur', {});

      expect(wrapper.state('open')).toBe(false);
      expect(wrapper.state('highlightedIndex')).toBeNull();
    });
  });

  describe('handleInputFocus()', () => {
    it('sets `open` to `true`', () => {
      wrapper.setState({
        open: false,
      });

      wrapper.find(BaseInput).simulate('focus', {});

      expect(wrapper.state('open')).toBe(true);
    });

    it('calls `loadItems` if `loadItemsOnFocus` is `true`', () => {
      const spy = jest.spyOn(instance, 'loadItems');

      wrapper.setProps({
        loadItemsOnFocus: true,
      });

      wrapper.find(BaseInput).simulate('focus', {});

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleInputKeyDown()', () => {
    it('defaults to setting state open', () => {
      wrapper.setState({
        open: false,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'Foo' });

      expect(wrapper.state('open')).toBe(true);
    });

    it('supports `ArrowDown` event and sets state', () => {
      wrapper.setState({
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        highlightedIndex: null,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'ArrowDown', preventDefault: jest.fn() });

      setTimeout(() => expect(wrapper.state('highlightedIndex')).toBe(0), 0);
    });

    it('supports `ArrowDown` event and does not set state if no items', () => {
      wrapper.setState({
        items: [],
        highlightedIndex: null,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'ArrowDown', preventDefault: jest.fn() });

      // @ts-ignore
      setTimeout(() => expect(wrapper.state('highlightedIndex')).toBeNull(), 0);
    });

    it('supports `ArrowUp` event and sets state', () => {
      wrapper.setState({
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        highlightedIndex: null,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'ArrowUp', preventDefault: jest.fn() });

      // @ts-ignore
      setTimeout(() => expect(wrapper.state('highlightedIndex')).toBe(2), 0);
    });

    it('supports `ArrowUp` event and does not set state if no items', () => {
      wrapper.setState({
        items: [],
        highlightedIndex: null,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'ArrowUp', preventDefault: jest.fn() });

      // @ts-ignore
      setTimeout(() => expect(wrapper.state('highlightedIndex')).toBeNull(), 0);
    });

    it('supports `Escape` event', () => {
      instance.ignoreBlur = true;

      wrapper.setState({
        open: true,
        highlightedIndex: 0,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'Escape' });

      expect(instance.ignoreBlur).toBe(false);

      setTimeout(() => {
        expect(wrapper.state('highlightedIndex')).toBeNull();
        expect(wrapper.state('open')).toBe(false);
      }, 0);
    });

    it('supports `Tab` event', () => {
      instance.ignoreBlur = true;

      wrapper.find(BaseInput).simulate('keydown', { key: 'Tab' });

      expect(instance.ignoreBlur).toBe(false);
    });

    it('supports `Enter` event - updates `ignoreBlur`', () => {
      instance.ignoreBlur = true;

      wrapper.setState({
        open: false,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'Enter', keyCode: 13 });

      expect(instance.ignoreBlur).toBe(false);
    });

    it('supports `Enter` event - input has focus but no menu item is selected + enter is hit', () => {
      const spy = jest.fn();
      const input = document.createElement('input');
      input.select = spy;
      instance.inputRef = { current: input };
      instance.ignoreBlur = true;

      wrapper.setState({
        open: true,
        highlightedIndex: null,
      });

      wrapper
        .find(BaseInput)
        .simulate('keydown', { key: 'Enter', keyCode: 13, preventDefault: jest.fn() });

      expect(instance.ignoreBlur).toBe(false);
      expect(wrapper.state('open')).toBe(false);
      expect(spy).toHaveBeenCalled();
    });

    it('supports `Enter` event - text entered + menu item has been highlighted + enter is hit', () => {
      const spy = jest.fn();
      const input = document.createElement('input');
      input.focus = spy;
      instance.inputRef = { current: input };
      instance.ignoreBlur = true;

      wrapper.setState({
        highlightedIndex: 1,
        open: true,
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        value: 'foo',
      });

      wrapper
        .find(BaseInput)
        .simulate('keydown', { key: 'Enter', keyCode: 13, preventDefault: jest.fn() });

      setTimeout(() => {
        expect(instance.ignoreBlur).toBe(false);
        expect(wrapper.state('open')).toBe(false);
        expect(wrapper.state('highlightedIndex')).toBeNull();
        expect(spy).toHaveBeenCalled();
      }, 0);
    });
  });

  describe('handleSelect()', () => {
    it('calls `onSelectItem` prop with found item', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onSelectItem: spy,
      });

      wrapper.setState({
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        highlightedIndex: 1,
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'Enter' });

      setTimeout(() => expect(spy).toHaveBeenCalledWith({ value: 'foo', name: 'Foo' }), 0);
    });

    it('clears the value when selected', () => {
      wrapper.setProps({
        clearOnSelect: true,
      });

      wrapper.setState({
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        highlightedIndex: 1,
        value: 'foo',
      });

      wrapper.find(BaseInput).simulate('keydown', { key: 'Enter' });

      setTimeout(() => {
        expect(wrapper.state('value')).toBe('');
      }, 0);
    });
  });

  describe('handleItemMouseDown()', () => {
    it('highlights the item in state', () => {
      wrapper.setState({
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        value: 'foo',
        highlightedIndex: 1,
      });

      const items = instance.renderItems();

      items[0].props.onMouseDown();

      expect(wrapper.state('highlightedIndex')).toBe(0);
    });
  });

  describe('handleItemMouseEnter()', () => {
    it('highlights the item in state', () => {
      wrapper.setState({
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
        value: 'foo',
        highlightedIndex: 1,
      });

      const items = instance.renderItems();

      items[0].props.onMouseEnter();

      expect(wrapper.state('highlightedIndex')).toBe(0);
    });
  });

  describe('loadItems()', () => {
    beforeEach(() => {
      jest
        .spyOn(instance, 'loadItemsDebounced')
        .mockImplementation(() =>
          Promise.resolve({ input: 'foo', response: [{ id: 4 }, { id: 5 }, { id: 6 }] }),
        );
    });

    it('resets state at start of load', () => {
      wrapper.setState({
        value: 'foo',
        error: null,
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        loading: true,
      });

      instance.loadItems('bar');

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          value: 'bar',
          error: null,
          items: [],
          loading: true,
        }),
      );
    });

    it('calls `onSelectItem` if value is empty', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onSelectItem: spy,
      });

      instance.loadItems('');

      expect(spy).toHaveBeenCalledWith('', null);
      expect(instance.loadItemsDebounced).not.toHaveBeenCalled();
    });

    it('doesnt call `onSelectItem` if value is empty but force is passed', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onSelectItem: spy,
      });

      instance.loadItems('', true);

      expect(spy).not.toHaveBeenCalled();
    });

    it('uses cache if it exists', () => {
      instance.cache.foo = {
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        time: Date.now(),
      };

      instance.loadItems('foo');

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          value: 'foo',
          items: [{ id: 1 }, { id: 2 }, { id: 3 }],
          loading: false,
        }),
      );
      expect(instance.loadItemsDebounced).not.toHaveBeenCalled();
    });

    it('bypasses cache if forced', () => {
      instance.cache.foo = {
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        time: Date.now(),
      };

      instance.loadItems('foo', true);

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          value: 'foo',
          items: [],
        }),
      );
      expect(instance.loadItemsDebounced).toHaveBeenCalledWith('foo');
    });

    it('bypasses cache if stale', () => {
      instance.cache.foo = {
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        time: Date.now() - CACHE_DURATION - CACHE_DURATION,
      };

      instance.loadItems('foo');

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          value: 'foo',
          items: [],
        }),
      );
      expect(instance.loadItemsDebounced).toHaveBeenCalledWith('foo');
    });

    it('caches on success', () =>
      instance.loadItems('foo').then(() => {
        expect(instance.cache.foo).toEqual(
          expect.objectContaining({
            items: [{ id: 4 }, { id: 5 }, { id: 6 }],
          }),
        );
      }));

    it('doesnt cache if `disableCache` is set', async () => {
      wrapper.setProps({
        disableCache: true,
      });

      await instance.loadItems('foo');

      expect(instance.cache.foo).toBeUndefined();
    });

    it('handles success', () =>
      instance.loadItems('foo').then(() => {
        expect(wrapper.state()).toEqual(
          expect.objectContaining({
            items: [{ id: 4 }, { id: 5 }, { id: 6 }],
            loading: false,
          }),
        );
      }));

    it('handles success using `results` property', async () => {
      jest.spyOn(instance, 'loadItemsDebounced').mockImplementation(() =>
        Promise.resolve({
          input: 'foo',
          response: { results: [{ id: 7 }, { id: 8 }, { id: 9 }] },
        }),
      );

      await instance.loadItems('foo');

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          items: [{ id: 7 }, { id: 8 }, { id: 9 }],
          loading: false,
        }),
      );
    });

    it('handles success using `items` property', async () => {
      jest
        .spyOn(instance, 'loadItemsDebounced')
        .mockImplementation(() =>
          Promise.resolve({ input: 'foo', response: { items: [{ id: 7 }, { id: 8 }, { id: 9 }] } }),
        );

      await instance.loadItems('foo');

      expect(wrapper.state()).toEqual(
        expect.objectContaining({
          items: [{ id: 7 }, { id: 8 }, { id: 9 }],
          loading: false,
        }),
      );
    });

    it('handles error', async () => {
      jest
        .spyOn(instance, 'loadItemsDebounced')
        .mockImplementation(() => Promise.reject(new Error('Oops')));

      try {
        await instance.loadItems('foo');
      } catch (error) {
        expect(wrapper.state()).toEqual(
          expect.objectContaining({
            error,
            loading: false,
          }),
        );
      }
    });
  });

  describe('renderError()', () => {
    it('wraps in a menu `Row`', () => {
      const row = shallowWithStyles(instance.renderError(new Error('Oops')), true);

      expect(row.type()).toEqual(MenuRow);
    });

    it('renders an error message by default', () => {
      const row = shallowWithStyles(instance.renderError(new Error('Oops')));

      expect(row.find(ErrorMessage)).toHaveLength(1);
      expect(row.find(ErrorMessage).prop('error')).toEqual(new Error('Oops'));
    });

    it('can customize the error with `renderError`', () => {
      wrapper.setProps({
        renderError: () => <div>Broken!</div>,
      });

      const row = shallowWithStyles(instance.renderError(new Error('Oops')));

      expect(row.find(ErrorMessage)).toHaveLength(0);
      expect(shallow(row.prop('children')).contains('Broken!')).toBe(true);
    });
  });

  describe('renderItem()', () => {
    it('renders a menu item with correct props', () => {
      const item = shallow(
        instance.renderItem({
          value: 'foo',
          disabled: true,
          href: '/',
        }),
      );

      expect(item.find(Item).prop('disabled')).toBe(true);
      expect(item.find(Item).prop('highlighted')).toBe(false);
      expect(item.find(Item).prop('href')).toBe('/');
    });

    it('handles highlighted state', () => {
      const item = shallow(instance.renderItem({ value: 'foo' }, true));

      expect(item.find(Item).prop('highlighted')).toBe(true);
    });

    it('can customize children with `renderItem` prop', () => {
      wrapper.setProps({
        renderItem: (item: AutocompleteItem) => String(item.value!).toUpperCase(),
      });

      const item = shallow(instance.renderItem({ value: 'foo' }, true));

      expect(item.find(Item).prop('children')).toBe('FOO');
    });
  });

  describe('renderLoading()', () => {
    it('wraps in a menu `Row`', () => {
      const row = shallowWithStyles(instance.renderLoading(), true);

      expect(row.type()).toEqual(MenuRow);
    });

    it('renders a loader by default', () => {
      const row = shallowWithStyles(instance.renderLoading());

      expect(row.find(Loader)).toHaveLength(1);
    });

    it('can customize with `renderLoading`', () => {
      wrapper.setProps({
        renderLoading: () => <div>Loading!</div>,
      });

      const row = shallowWithStyles(instance.renderLoading());

      expect(row.find(Loader)).toHaveLength(0);
      expect(shallow(row.prop('children')).contains('Loading!')).toBe(true);
    });
  });

  describe('renderMenu()', () => {
    it('renders nothing (a div) when no value and items', () => {
      wrapper.setState({
        items: [],
        value: '',
      });

      const menu = shallow(instance.renderMenu());

      expect(menu.is('div')).toBe(true);
      expect(menu.prop('children')).toBeUndefined();
    });

    it('passes props to Menu component', () => {
      wrapper.setState({
        items: [],
        value: 'foo',
      });

      const menu = shallow(instance.renderMenu());

      expect(menu.find(Menu).prop('accessibilityLabel')).toBe('Label');
      expect(menu.find(Menu).prop('maxHeight')).toBe(400);
    });

    it('renders items in menu', () => {
      const items = [<li key="0">A</li>, <li key="1">B</li>, <li key="2">C</li>];

      wrapper.setState({
        // @ts-ignore
        items,
        value: 'foo',
      });

      const menu = shallow(instance.renderMenu());
      expect(menu.find(Menu).prop('children')).toHaveLength(items.length);
    });

    it('renders error in menu', () => {
      wrapper.setState({
        error: new Error('Oops'),
        value: 'foo',
      });

      const menu = shallow(instance.renderMenu());
      expect(menu.find(ErrorMessage)).toHaveLength(1);
      expect(menu.find(ErrorMessage).prop('error')).toEqual(new Error('Oops'));
    });

    it('renders loading in menu', () => {
      wrapper.setState({
        loading: true,
        value: 'foo',
      });

      const menu = shallow(instance.renderMenu());
      expect(menu.find(Loader)).toHaveLength(1);
    });
  });

  describe('renderNoResults()', () => {
    it('wraps in a menu `Row`', () => {
      const row = shallowWithStyles(instance.renderNoResults(), true);

      expect(row.type()).toEqual(MenuRow);
    });

    it('renders a message by default', () => {
      const row = shallowWithStyles(instance.renderNoResults());

      expect(row.find(Text).prop('children')).toEqual(
        <T
          k="lunar.common.noResults"
          phrase="No results found."
          context="No results found for autocomplete search"
        />,
      );
    });

    it('can customize with `renderNoResults`', () => {
      wrapper.setProps({
        renderNoResults: () => <div>Empty!</div>,
      });

      const row = shallowWithStyles(instance.renderNoResults());

      expect(row.find(Text)).toHaveLength(0);
      expect(shallow(row.prop('children')).contains('Empty!')).toBe(true);
    });

    it('can customize no results message', () => {
      wrapper.setProps({
        noResultsText: 'Nothing here...',
      });

      const menu = shallowWithStyles(instance.renderNoResults());

      expect(menu.find(Text).prop('children')).toBe('Nothing here...');
    });
  });

  describe('setIgnoreBlur()', () => {
    it('sets `ignoreBlur` to false', () => {
      instance.ignoreBlur = true;
      instance.setIgnoreBlur(false);
      expect(instance.ignoreBlur).toBe(false);
    });
  });

  describe('onMenuVisibilityChange()', () => {
    it('calls `onMenuVisibilityChange` when `open` state changes', () => {
      const spy = jest.fn();

      wrapper.setProps({
        onMenuVisibilityChange: spy,
      });

      wrapper.setState({
        open: !instance.state.open,
      });

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getFilteredItems()', () => {
    it('gets filtered items', () => {
      wrapper.setProps({
        shouldItemRender: (item, value) => item.value === 'foo',
      });

      const state = {
        ...wrapper.state(),
        items: [{ value: 'bar', name: 'Bar' }, { value: 'foo', name: 'Foo' }],
      };

      const filteredItems = instance.getFilteredItems(state);

      expect(filteredItems).toHaveLength(1);
    });
  });
});
