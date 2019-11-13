import React from 'react';
import { shallow } from 'enzyme';
import SearchResult from '../../../src/components/HierarchyPicker/Search/SearchResult';
import Highlight from '../../../src/components/HierarchyPicker/Search/Highlight';

const item = { name: 'foo', label: 'bar', description: 'baz description' };

describe('<SearchResult />', () => {
  it('renders the item label', () => {
    const wrapper = shallow(<SearchResult item={item} formattedParents="" query="more coverage" />);

    expect(
      wrapper
        .find(Highlight)
        .at(0)
        .prop('fallback'),
    ).toBe(item.label);
  });

  it('renders a description', () => {
    const wrapper = shallow(<SearchResult item={item} formattedParents="" />);

    expect(
      wrapper
        .find(Highlight)
        .at(1)
        .prop('fallback'),
    ).toBe(item.description);
  });

  it('renders a keyword match', () => {
    const match = { key: 'keywords', indices: [], value: 'keyword match' };
    const wrapper = shallow(<SearchResult item={item} formattedParents="" matches={[match]} />);

    expect(
      wrapper
        .find(Highlight)
        .at(2)
        .prop('match'),
    ).toBe(match);
  });
});
