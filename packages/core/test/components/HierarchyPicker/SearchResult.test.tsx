import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from '../../../src/components/HierarchyPicker/Search/SearchResult';

const item = { name: 'foo', label: 'bar', description: 'baz description' };

describe('<SearchResult />', () => {
  it('renders the item label', () => {
    const wrapper = shallow(<SearchResult item={item} formattedParents="" query="more coverage" />);
    expect(wrapper.html()).toMatch(item.label);
  });

  it('renders a description', () => {
    const wrapper = shallow(<SearchResult item={item} formattedParents="" />);
    expect(wrapper.html()).toMatch(item.description);
  });

  it('renders a keyword match', () => {
    const wrapper = shallow(
      <SearchResult
        item={item}
        formattedParents=""
        matches={[{ key: 'keywords', indices: [], value: 'keyword match' }]}
      />,
    );
    expect(wrapper.html()).toMatch('keyword match');
  });
});
