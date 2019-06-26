import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import SearchResult from '../../../src/components/HierarchyPicker/Search/SearchResult';

const item = { name: 'foo', label: 'bar', description: 'baz description' };

describe('<SearchResult />', () => {
  it('renders the item label', () => {
    const wrapper = shallowWithStyles(
      <SearchResult item={item} formattedParents="" query="more coverage" />,
      true,
    );
    expect(wrapper.html()).toMatch(item.label);
  });

  it('renders a description', () => {
    const wrapper = shallowWithStyles(<SearchResult item={item} formattedParents="" />, true);
    expect(wrapper.html()).toMatch(item.description);
  });

  it('renders a keyword match', () => {
    const wrapper = shallowWithStyles(
      <SearchResult
        item={item}
        formattedParents=""
        matches={[{ key: 'keywords', indices: [], value: 'keyword match' }]}
      />,
      true,
    );
    expect(wrapper.html()).toMatch('keyword match');
  });
});
