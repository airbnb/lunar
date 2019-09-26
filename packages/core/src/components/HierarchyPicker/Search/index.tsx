import React from 'react';
import Fuse from 'fuse.js';
import Autocomplete from '../../Autocomplete';
import SearchResult from './SearchResult';
import T from '../../Translate';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import {
  Formatter,
  ItemPickedHandler,
  ItemShape,
  SearchItemShape,
  SearchItemResult,
  TreePath,
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
  fuseOptions?: Fuse.FuseOptions<SearchItemShape>;
  width: number;
  maxHeight?: number;
};

const defaultFuseOptions: Fuse.FuseOptions<SearchItemShape> = {
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

type FuseKey = { name: keyof SearchItemShape; weight: number };

const defaultFuseKeys: FuseKey[] = [
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

export class Search extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    fuseOptions: {},
    items: [],
    query: '',
  };

  fuse?: Fuse<SearchItemShape, Fuse.FuseOptions<SearchItemShape>>;

  componentDidMount() {
    this.buildIndex(this.props.items);
  }

  componentDidUpdate(prevProps: Props) {
    const { items, indexParentPath } = this.props;

    if (items !== prevProps.items || indexParentPath !== prevProps.indexParentPath) {
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

    this.fuse = new Fuse(flatItemList, {
      ...fuseOptions,
      ...this.props.fuseOptions,
    });
  }

  getItemValue = (result: SearchItemResult) => result.item.name;

  handleItemPicked = (itemValue: string, result: SearchItemResult | null) => {
    const { query, onItemPicked } = this.props;
    onItemPicked((result && result.item.definition) || null, {
      origin: 'Search',
      charCount: query!.length,
    });
  };

  handleSearch = (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || !this.fuse) {
      return [];
    }

    return (this.fuse.search(trimmedQuery) as unknown) as SearchItemResult[];
  };

  handleAsyncSearch = (query: string) => Promise.resolve(this.handleSearch(query));

  renderItem = ({ matches, item: { formattedParents, ...item } }: SearchItemResult) => {
    const { query } = this.props;

    return (
      <SearchResult
        query={(query || '').toLowerCase()}
        item={item}
        formattedParents={formattedParents}
        matches={matches}
      />
    );
  };

  render() {
    const {
      cx,
      noResultsLabel,
      maxHeight,
      onSearch,
      placeholder,
      query,
      styles,
      width,
    } = this.props;

    return (
      <div className={cx(styles.container, { width: query ? width : undefined })}>
        <Autocomplete<SearchItemResult>
          hideLabel
          optional
          accessibilityLabel={T.phrase(
            'Hierarchy item search',
            {},
            {
              context: 'Search functionality to find items within the hierarchy menu.',
              key: 'lunar.picker.searchLabel',
            },
          )}
          getItemValue={this.getItemValue}
          maxHeight={maxHeight}
          name="autocomplete-search"
          noResultsText={noResultsLabel}
          value={query}
          type="search"
          renderItem={this.renderItem}
          label=""
          placeholder={placeholder}
          onSelectItem={this.handleItemPicked}
          onLoadItems={this.handleAsyncSearch}
          onChange={onSearch}
        />
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  container: {
    padding: unit,
  },
}))(Search);
