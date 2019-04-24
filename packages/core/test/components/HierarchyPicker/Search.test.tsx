import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import Autocomplete from '../../../src/components/Autocomplete';
import Search, { Props as SearchProps } from '../../../src/components/HierarchyPicker/Search';
import { TopicOriginKey, SearchItemResult } from '../../../src/components/HierarchyPicker/types';
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
  let wrapper: Enzyme.ShallowWrapper<SearchProps>;
  let handlePicked: jest.Mock;
  let instance: Search;

  beforeEach(() => {
    handlePicked = jest.fn();
    wrapper = shallow(<Search {...props} onItemPicked={handlePicked} />);
    instance = wrapper.instance();
  });

  it('renders an Autocomplete', () => {
    expect(wrapper.find(Autocomplete)).toHaveLength(1);
  });

  it('calls handlePicked upon picking', () => {
    const query = 'fo';
    wrapper.setProps({ query });

    const autocomplete = wrapper.find(Autocomplete);
    const onSelectItem = autocomplete.prop('onSelectItem') as (
      v: string,
      r: SearchItemResult,
    ) => void;
    onSelectItem('', { item: { definition: ['foo'] } });
    expect(handlePicked).toHaveBeenCalledWith(['foo'], {
      charCount: query.length,
      origin: TopicOriginKey.Search,
    });
  });

  describe('search functionality', () => {
    it('finds child items by name', () => {
      return instance.handleSearch('coverage').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(1);
      });
    });

    it('updates items on change and handles empty items', () => {
      wrapper.setProps({ items: [] });

      return instance.handleSearch('coverage').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(0);
      });
    });

    it('finds grandchild items by name', () => {
      return instance.handleSearch('whatever').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(1);
      });
    });

    it('finds items by description', () => {
      return instance.handleSearch('what I want').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(1);
      });
    });

    it('finds items by keywords', () => {
      return instance.handleSearch('bonsoir').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(1);
      });
    });

    it('trims the query', () => {
      return instance.handleSearch(' ').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(0);
      });
    });

    it('filters non-matching results', () => {
      return instance.handleSearch('nonsense').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(0);
      });
    });

    it('filters readonly results', () => {
      return instance.handleSearch('hello').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(0);
      });
    });
  });

  describe('indexParentPath', () => {
    it('when false, should filter items matching formattedParents', () => {
      return instance.handleSearch('foo bar').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(0);
      });
    });

    it('when true, should match items against formattedParents', () => {
      wrapper = shallow(<Search {...props} indexParentPath />);
      instance = wrapper.instance();

      return instance.handleSearch('foo bar').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(2); // 'foo > bar >' has 2 children
      });
    });
  });

  describe('overriding fuse options with no keys', () => {
    it('shows no results', () => {
      wrapper = shallow(<Search {...props} fuseOptions={{ keys: [] }} />);
      instance = wrapper.instance();

      return instance.handleSearch('coverage').then((results: SearchItemResult[]) => {
        expect(results).toHaveLength(0);
      });
    });
  });
});
