import React from 'react';
import Fuse from 'fuse.js';
import Autocomplete from '../../Autocomplete';
import SearchResult from './SearchResult';
import T from '../../Translate';
import fuseLoader from './fuseLoader';
import {
  Formatter,
  ItemPickedHandler,
  ItemShape,
  SearchItemShape,
  SearchItemResult,
  TreePath,
  TopicOriginKey,
} from '../types';

export type Props = {
  items?: ItemShape[];
  onItemPicked: ItemPickedHandler;
  formatter: Formatter;
  query?: string;
  noResultsLabel: NonNullable<React.ReactNode>;
  onSearch: (searchQuery: string) => void;
  placeholder?: string;
  indexParentPath?: boolean;
  fuseOptions?: Fuse.FuseOptions<any>;
  width: number;
  maxHeight?: number;
};

const defaultFuseOptions: Fuse.FuseOptions<any> = {
  shouldSort: true,
  includeMatches: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  threshold: 0.1,
  distance: 200,
  maxPatternLength: 32,
  minMatchCharLength: 3,
};

const defaultFuseKeys = [
  {
    name: 'label',
    weight: 0.8,
  },
  {
    name: 'keywords',
    weight: 0.7,
  },
  {
    name: 'description',
    weight: 0.5,
  },
];

export default class Search extends React.Component<Props> {
  static defaultProps = {
    fuseOptions: {},
    items: [],
    query: '',
  };

  fusePromise?: Promise<Fuse<SearchItemResult>>;

  componentDidMount() {
    this.buildIndex(this.props.items);
  }

  componentDidUpdate(prevProps: Props) {
    const { items } = this.props;

    if (items !== prevProps.items) {
      this.buildIndex(items);
    }
  }

  buildIndex(inputItems: ItemShape[] = []) {
    const flatItemList: SearchItemShape[] = [];

    const walk = (one: ItemShape, parents: TreePath = []) => {
      const definition = [...parents, one.name];
      const { items, ...item } = one;
      const { readonly } = item;

      if (!readonly) {
        flatItemList.push({
          ...item,
          definition,
          label: item.label || item.name,
          formattedParents: parents.length > 0 ? this.props.formatter([...parents, '']) : '',
        });
      }

      (items || []).forEach(sub => walk(sub, definition));
    };

    if (inputItems) {
      inputItems.forEach(item => walk(item));
    }

    const fuseKeys = [...defaultFuseKeys];

    if (this.props.indexParentPath) {
      fuseKeys.push({
        name: 'formattedParents',
        weight: 0.2,
      });
    }

    const fuseOptions = { ...defaultFuseOptions, keys: fuseKeys };

    this.fusePromise = fuseLoader(flatItemList, {
      ...fuseOptions,
      ...this.props.fuseOptions,
    });
  }

  private getItemValue = (result: SearchItemResult) => result.item.name;

  private handleItemPicked = (itemValue: string, result: SearchItemResult | null) => {
    const { query, onItemPicked } = this.props;
    onItemPicked((result && result.item.definition) || null, {
      origin: TopicOriginKey.Search,
      charCount: query!.length,
    });
  };

  private handleSearch = (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || !this.fusePromise) {
      return Promise.resolve([]);
    }

    return this.fusePromise.then(index => index.search(trimmedQuery));
  };

  private renderItem = ({
    matches,
    item: { definition, formattedParents, ...item },
  }: SearchItemResult) => {
    const { query } = this.props;

    return (
      <SearchResult
        query={(query || '').toLowerCase()}
        item={item}
        formattedParents={formattedParents}
        matches={matches}
        definition={definition}
      />
    );
  };

  render() {
    const { query, noResultsLabel, placeholder, width, onSearch, maxHeight } = this.props;

    return (
      <div style={{ width: query ? width : undefined }}>
        <Autocomplete<SearchItemResult>
          accessibilityLabel={T.phrase(
            'Hierarchy item search',
            {},
            'Search functionality to find items within the hierarchy menu.',
          )}
          hideLabel
          label=""
          getItemValue={this.getItemValue}
          maxHeight={maxHeight}
          name="autocomplete-search"
          noResultsText={noResultsLabel}
          onChange={onSearch}
          onLoadOptions={this.handleSearch}
          onSelectItem={this.handleItemPicked}
          optional
          placeholder={placeholder}
          renderItem={this.renderItem}
          type="search"
          value={query}
        />
      </div>
    );
  }
}
