import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Autocomplete from '../../../src/components/Autocomplete';
import Search, { Props as SearchProps } from '../../../src/components/HierarchyPicker/Search';
import { SearchItemResult, ChoiceDetails } from '../../../src/components/HierarchyPicker/types';
import testItems from './mockItems';

const props = {
  onClose: jest.fn(),
  onItemPicked: jest.fn(),
  onSearch: jest.fn(),
  onSubtree: jest.fn(),
  chosen: ['foo', 'bar'],
  searchPlaceholder: 'search',
  noResultsLabel: 'nope',
  items: testItems,
  formatter: (chosen: string[]) => chosen.join(' > '),
  width: 300,
};

describe('<Search />', () => {
  let handlePicked: jest.Mock;
  let wrapper: Enzyme.ShallowWrapper<SearchProps>;
  let instance: React.Component<{}, {}, SearchProps>;

  beforeEach(() => {
    handlePicked = jest.fn();
    wrapper = shallow(<Search {...props} onItemPicked={handlePicked} />).dive();
    instance = wrapper.instance();
  });

  describe('Autocomplete', () => {
    it('renders an <Autocomplete />', () => {
      expect(wrapper.find(Autocomplete)).toHaveLength(1);
    });

    it('renderItem renders SearchResults', () => {
      const auto = wrapper.find(Autocomplete);
      const item = shallow(
        auto.prop('renderItem')({
          item: { definition: ['foo'], label: '', formattedParents: '', name: '' },
          matches: [],
        }),
      );

      expect(item.type()).toBe('div');
    });
  });

  it('calls handlePicked upon picking', () => {
    const query = 'fo';
    wrapper.setProps({ query });

    const autocomplete = wrapper.find(Autocomplete);
    const onSelectItem = autocomplete.prop('onSelectItem') as (
      v: string,
      r: SearchItemResult,
    ) => void;
    onSelectItem('', {
      item: { definition: ['foo'], label: '', formattedParents: '', name: '' },
      matches: [],
    });
    expect(handlePicked).toHaveBeenCalledWith(['foo'], {
      charCount: query.length,
      origin: 'Search',
    } as ChoiceDetails);
  });

  describe('search functionality', () => {
    it('finds child items by name', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('coverage')).toHaveLength(1);
    });

    it('updates items on change and handles empty items', () => {
      wrapper.setProps({ items: [] });
      // @ts-ignore handleSearch
      expect(instance.handleSearch('coverage')).toHaveLength(0);
    });

    it('finds grandchild items by name', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('whatever')).toHaveLength(1);
    });

    it('finds items by description', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('what I want')).toHaveLength(1);
    });

    it('finds items by keywords', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('bonsoir')).toHaveLength(1);
    });

    it('trims the query', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch(' ')).toHaveLength(0);
    });

    it('filters non-matching results', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('nonsense')).toHaveLength(0);
    });

    it('filters readonly results', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('hello')).toHaveLength(0);
    });

    it('handleAsyncSearch resolves to handleSearch', async () => {
      expect.assertions(1);

      // @ts-ignore handleSearch
      const syncResult = instance.handleSearch('coverage');
      // @ts-ignore handleSearch
      const asyncResult = await instance.handleAsyncSearch('coverage');

      expect(syncResult).toEqual(asyncResult);
    });
  });

  describe('indexParentPath', () => {
    it('when false, should filter items matching formattedParents', () => {
      // @ts-ignore handleSearch
      expect(instance.handleSearch('foo bar')).toHaveLength(0);
    });

    it('when true, should match items against formattedParents', () => {
      wrapper = shallow(<Search {...props} indexParentPath />).dive();
      instance = wrapper.instance();
      // @ts-ignore handleSearch
      expect(instance.handleSearch('foo bar')).toHaveLength(2); // 'foo > bar >' has 2 children
    });
  });

  describe('overriding fuse options with no keys', () => {
    it('shows no results', () => {
      wrapper = shallow(<Search {...props} fuseOptions={{ keys: [] }} />).dive();
      instance = wrapper.instance();
      // @ts-ignore handleSearch
      expect(instance.handleSearch('coverage')).toHaveLength(0);
    });
  });
});
