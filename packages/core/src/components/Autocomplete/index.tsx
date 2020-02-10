import React from 'react';
import uuid from 'uuid/v4';
import debouncePromise from 'debounce-promise';
import toMilliseconds from '../../utils/toMilliseconds';
import BaseInput, { Props as BaseInputProps } from '../private/BaseInput';
import ErrorMessage from '../ErrorMessage';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';
import Loader from '../Loader';
import Menu, { Item as MenuItem, Row as MenuRow } from '../Menu';
import Spacing from '../Spacing';
import T from '../Translate';
import Text from '../Text';
import renderElementOrFunction, { RenderableProp } from '../../utils/renderElementOrFunction';
import passThroughRef from '../../utils/passThroughRef';

export type Item = {
  disabled?: boolean;
  href?: string;
  id?: string | number;
  name?: string;
  title?: string;
  value?: string | number;
};

export const CACHE_DURATION = toMilliseconds('5 minutes');

function getItemValue(item: Item): string {
  return String(item.value || item.id);
}

function renderItem(item: Item): NonNullable<React.ReactNode> {
  return <Text>{item.name || item.title || item.value}</Text>;
}

export type ItemResponseType<T> = T[] | { items?: T[]; results?: T[] };

export type Props<T extends Item = Item> = Omit<BaseInputProps, 'id'> &
  FormFieldProps & {
    /** Accessibility label. */
    accessibilityLabel: string;
    /** Auto-focus the input field on mount. */
    autoFocus?: boolean;
    /** Content to display below the input. */
    children?: React.ReactNode;
    /** Clear input field when an item is selected. */
    clearOnSelect?: boolean;
    /** Delay in which to load items. */
    debounce?: number;
    /** Disable caching of loaded item responses. */
    disableCache?: boolean;
    /**
     * Value to insert into the input field when an item is selected.
     * Defaults to the item's `value` or `id` property.
     */
    getItemValue?: (item: T) => string;
    /** Determine if an item is selectable. Non-selectable items will be disabled in the list. */
    isItemSelectable?: (item: T, selected?: boolean) => boolean;
    /** Determine if an item is selected. Will compare values by default if not defined. */
    isItemSelected?: (item: T, value: string) => boolean;
    /** Load and show items with the current value when focused. */
    loadItemsOnFocus?: boolean;
    /** Load and show items on mount. */
    loadItemsOnMount?: boolean;
    /** Max height of the results dropdown menu. */
    maxHeight?: number;
    /** Message to display when no items are found. */
    noResultsText?: React.ReactNode;
    /** Callback fired when the value changes. */
    onChange: (value: string, event: React.SyntheticEvent<HTMLElement>) => void;
    /** Callback fired to load items. Must return a promise with an array of items. */
    onLoadItems: (value: string) => Promise<ItemResponseType<T>>;
    /** Callback fired when the display of the menu is toggled. */
    onMenuVisibilityChange?: (open: boolean) => void;
    /**
     * Callback fired when an item is selected.
     * When a field is reset, item is passed `null` and no event is passed.
     */
    onSelectItem?: (
      value: string,
      item: T | null,
      event?: React.SyntheticEvent<HTMLElement>,
    ) => void;
    /** Placeholder within the search input. */
    placeholder?: string;
    /** Render an error when items fail to load. */
    renderError?: RenderableProp<Error>;
    /** Render the content within a menu item. */
    renderItem?: (item: T, highlighted: boolean, selected: boolean) => NonNullable<React.ReactNode>;
    /** Render a loading state while items are loading. */
    renderLoading?: RenderableProp;
    /** Render a no results state while items are empty. */
    renderNoResults?: RenderableProp;
    /** When a value is entered that isn't in the items list, should it be selected when pressing enter. */
    selectUnknownOnEnter?: boolean;
    /**
     * Function in which to determine if an item should render in the menu.
     * This should be used for item list filtering.
     */
    shouldItemRender?: (item: T, value: string) => boolean;
  };

export type State<T extends Item = Item> = {
  error: Error | null;
  highlightedIndex: number | null;
  id: string;
  items: T[];
  loading: boolean;
  open: boolean;
  value: string;
};

/** An uncontrolled input field that utilizes a search lookup for automatic completion. */
export default class Autocomplete<T extends Item = Item> extends React.Component<
  Props<T>,
  State<T>
> {
  static defaultProps = {
    autoFocus: false,
    clearOnSelect: false,
    debounce: 250,
    disableCache: false,
    getItemValue,
    isItemSelectable: () => true,
    isItemSelected: () => false,
    loadItemsOnFocus: false,
    loadItemsOnMount: false,
    onMenuVisibilityChange() {},
    onSelectItem() {},
    renderItem,
  };

  cache: { [query: string]: { items: T[]; time: number } } = {};

  ignoreBlur: boolean = false;

  ignoreFocus: boolean = false;

  inputRef = React.createRef<HTMLInputElement>();

  state: State<T> = {
    error: null,
    highlightedIndex: null,
    id: uuid(),
    items: [],
    loading: false,
    open: false,
    value: this.props.value || '',
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focusInput();
    }

    if (this.props.loadItemsOnMount) {
      this.loadItems(this.state.value, true, this.focusInput);
    }
  }

  componentDidUpdate(prevProps: Props<T>, prevState: State<T>) {
    const { highlightedIndex, open, value } = this.state;

    if (highlightedIndex !== null && highlightedIndex >= this.getFilteredItems(this.state).length) {
      this.setState({
        highlightedIndex: null,
      });
    }

    if (this.props.value !== prevProps.value) {
      this.loadItems(this.props.value || '');
    }

    if (value !== prevState.value || (value !== '' && highlightedIndex === null)) {
      this.maybeAutoCompleteText(this.state);
    }

    if (open !== prevState.open) {
      this.props.onMenuVisibilityChange!(open);
    }
  }

  focusInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  private handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    if (this.inputRef.current && this.ignoreBlur) {
      this.ignoreFocus = true;
      this.inputRef.current.focus();

      return;
    }

    this.setState({
      open: false,
      highlightedIndex: null,
    });

    this.props.onChange(this.state.value, event);
  };

  private handleInputChange = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value }, () => {
      this.loadItems(value);
      this.props.onChange(value, event);
    });
  };

  private handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const { open } = this.state;
    const { current } = this.inputRef;

    if (current === current?.ownerDocument?.activeElement && !open) {
      this.setState({
        open: true,
      });
    }

    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  private handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = this.state;

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    if (this.props.loadItemsOnFocus) {
      this.loadItems(value);
    }

    this.setState({
      open: true,
    });
  };

  private handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }

    if (key === 'ArrowDown') this.handleInputKeyDownArrowDown(event);
    else if (key === 'ArrowUp') this.handleInputKeyDownArrowUp(event);
    else if (key === 'Enter') this.handleInputKeyDownEnter(event);
    else if (key === 'Escape') this.handleInputKeyDownEscape();
    else if (key === 'Tab') this.handleInputKeyDownTab();
    else if (!this.state.open) {
      this.setState({
        open: true,
      });
    }
  };

  private handleInputKeyDownArrowDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const items = this.getFilteredItems(this.state);

    if (items.length === 0) {
      return;
    }

    const { highlightedIndex } = this.state;
    const { isItemSelectable } = this.props;
    let index = highlightedIndex === null ? -1 : highlightedIndex;

    for (let i = 0, j = items.length; i < j; i += 1) {
      const p = (index + i + 1) % items.length;

      if (isItemSelectable!(items[p])) {
        index = p;
        break;
      }
    }

    if (index > -1 && index !== highlightedIndex) {
      this.setState({
        highlightedIndex: index,
        open: true,
      });
    }
  };

  private handleInputKeyDownArrowUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const items = this.getFilteredItems(this.state);

    if (items.length === 0) {
      return;
    }

    const { highlightedIndex } = this.state;
    const { isItemSelectable } = this.props;
    let index = highlightedIndex === null ? items.length : highlightedIndex;

    for (let i = 0, j = items.length; i < j; i += 1) {
      const p = (index - (1 + i) + items.length) % items.length;

      if (isItemSelectable!(items[p])) {
        index = p;
        break;
      }
    }

    if (index !== items.length) {
      this.setState({
        highlightedIndex: index,
        open: true,
      });
    }
  };

  private handleInputKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Key code 229 is used for selecting items from character selectors (Pinyin, Kana, etc)
    if (event.keyCode !== 13) {
      return;
    }

    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);

    if (!this.state.open) {
      // Menu is closed so there is no selection to accept -> do nothing
      return;
    }

    const { highlightedIndex } = this.state;
    let item: T | null = null;
    let value = '';

    if (highlightedIndex === null) {
      if (this.props.selectUnknownOnEnter) {
        value = this.state.value;

        // Avoid submitting the form on accident
        event.preventDefault();
        event.stopPropagation();
      } else {
        // Input has focus but no menu item is selected + enter is hit -> close the menu,
        // highlight whatever's in input
        this.setState(
          {
            open: false,
          },
          () => {
            if (this.inputRef.current) {
              this.inputRef.current.select();
            }
          },
        );
      }
    } else {
      // Text entered + menu item has been highlighted + enter is hit -> update value
      // to that of selected menu item, close the menu
      event.preventDefault();

      item = this.getFilteredItems(this.state)[highlightedIndex];
      value = this.props.getItemValue!(item);
    }

    this.setState(
      {
        highlightedIndex: null,
        open: false,
        value,
      },
      () => this.handleSelect(value, item, event),
    );
  };

  private handleInputKeyDownEscape = () => {
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);

    this.setState({
      highlightedIndex: null,
      open: false,
    });
  };

  private handleInputKeyDownTab = () => {
    // In case the user is currently hovering over the menu
    this.setIgnoreBlur(false);
  };

  private handleItemMouseEnter = (index: number) => {
    this.setState({
      highlightedIndex: index,
    });
  };

  private handleItemMouseDown = (item: T, event: React.MouseEvent<HTMLElement>) => {
    const value = this.props.getItemValue!(item);

    // The menu will de-render before a mouseLeave event
    // happens. Clear the flag to release control over focus
    this.setIgnoreBlur(false);

    this.setState(
      {
        highlightedIndex: null,
        open: false,
        value,
      },
      () => this.handleSelect(value, item, event),
    );
  };

  private handleSelect = (
    value: string,
    item: T | null,
    event: React.SyntheticEvent<HTMLElement>,
  ) => {
    this.props.onSelectItem!(value, item, event);
    this.props.onChange(value, event);

    if (this.props.clearOnSelect) {
      this.setState({
        value: '',
      });
    }
  };

  getFilteredItems(state: State<T>) {
    const { shouldItemRender } = this.props;
    const { value } = state;
    let { items } = state;

    if (shouldItemRender) {
      items = items.filter(item => shouldItemRender(item, value || ''));
    }

    return items;
  }

  getInputProps(props: Props<T>) {
    const {
      compact,
      disabled,
      invalid,
      name,
      optional,
      placeholder,
      onBlur,
      onFocus,
      small,
    } = props;
    const { id } = this.state;

    // Should match the props passed within `Input`
    return {
      compact,
      disabled,
      id,
      invalid,
      name,
      onBlur,
      onFocus,
      optional,
      placeholder: placeholder || T.phrase('lunar.common.search', 'Search'),
      small,
      type: 'text',
    };
  }

  loadItems = (value: string, force?: boolean, callback?: () => void) => {
    this.setState({
      value,
      error: null,
      items: [],
      loading: true,
    });

    const { disableCache, loadItemsOnFocus } = this.props;

    // Exit early if no value
    if (!value && !force && !loadItemsOnFocus) {
      this.props.onSelectItem!('', null);

      this.setState({
        loading: false,
        open: false,
      });

      return Promise.resolve([]);
    }

    // Use cache if it exists
    if (!force && this.cache[value] && this.cache[value].time + CACHE_DURATION > Date.now()) {
      const { items } = this.cache[value];

      this.setState({
        items,
        loading: false,
      });

      return Promise.resolve(items);
    }

    // Attempt to fetch items
    return this.loadItemsDebounced(value)
      .then(({ input, response }) => {
        let items: T[] = [];

        if (Array.isArray(response)) {
          items = response;
        } else {
          items = response.results || response.items || [];
        }

        if (!disableCache) {
          this.cache[input] = {
            items,
            time: Date.now(),
          };
        }

        const nextState = {
          items,
          loading: false,
        };

        if (callback) {
          this.setState(nextState, callback);
        } else {
          this.setState(nextState);
        }

        return items;
      })
      .catch((error: Error) => {
        this.setState({
          error,
          loading: false,
        });
      });
  };

  loadItemsDebounced = debouncePromise<{
    input: string;
    response: ItemResponseType<T>;
  }>(
    /* istanbul ignore next */
    (input: string) =>
      Promise.resolve(this.props.onLoadItems(input)).then(response => ({
        input,
        response,
      })),
    this.props.debounce!,
  );

  loadRef = (ref: HTMLInputElement | null) => {
    passThroughRef(this.inputRef, ref);
    passThroughRef(this.props.propagateRef, ref);
  };

  maybeAutoCompleteText = (state: State<T>) => {
    const { highlightedIndex, value } = state;
    const { isItemSelectable } = this.props;
    let index = highlightedIndex === null ? 0 : highlightedIndex;
    const items = this.getFilteredItems(state);

    for (let i = 0, j = items.length; i < j; i += 1) {
      if (isItemSelectable!(items[index])) {
        break;
      }

      index = (index + 1) % items.length;
    }

    const matchedItem = items[index] && isItemSelectable!(items[index]) ? items[index] : name;

    if (value && value !== '' && matchedItem) {
      const itemValue = this.props.getItemValue!(matchedItem);
      const itemValueDoesMatch = itemValue.toLowerCase().indexOf(String(value).toLowerCase()) === 0;

      if (itemValueDoesMatch) {
        this.setState({
          highlightedIndex: index,
        });
      }
    } else if (highlightedIndex !== null) {
      this.setState({
        highlightedIndex: null,
      });
    }
  };

  setIgnoreBlur = (ignore: boolean) => {
    this.ignoreBlur = ignore;
  };

  renderError = (error: Error) => (
    <MenuRow>
      <Spacing horizontal={0.5}>
        {renderElementOrFunction(this.props.renderError, error) || (
          <ErrorMessage inline error={error} />
        )}
      </Spacing>
    </MenuRow>
  );

  renderItem = (
    item: T,
    highlighted?: boolean,
    selected?: boolean,
    props?: React.HTMLAttributes<HTMLDivElement>,
  ) => {
    const { disabled, href } = item;
    const { isItemSelectable } = this.props;
    const value = this.props.getItemValue!(item);

    return (
      <div key={`item-${value}`} {...props}>
        <MenuItem
          disabled={disabled || !isItemSelectable!(item, selected)}
          highlighted={!!highlighted}
          href={href}
        >
          {this.props.renderItem!(item, !!highlighted, !!selected)}
        </MenuItem>
      </div>
    );
  };

  renderItems = () => {
    return this.getFilteredItems(this.state).map((item: T, index) => {
      const value = this.props.getItemValue!(item);
      const selected = this.props.isItemSelected
        ? this.props.isItemSelected(item, value)
        : value === this.state.value;
      const props: React.HTMLAttributes<HTMLDivElement> = {};

      if (this.props.isItemSelectable!(item, selected)) {
        props.onMouseDown = (event: React.MouseEvent<HTMLElement>) =>
          this.handleItemMouseDown(item, event);
        props.onMouseEnter = () => this.handleItemMouseEnter(index);
      }

      return this.renderItem(item, this.state.highlightedIndex === index, selected, props);
    });
  };

  renderLoading = () => (
    <MenuRow>
      <Spacing horizontal={1}>
        {renderElementOrFunction(this.props.renderLoading) || <Loader inline />}
      </Spacing>
    </MenuRow>
  );

  renderMenu = () => {
    const { accessibilityLabel, maxHeight } = this.props;
    const { error, loading, value } = this.state;
    const items = this.renderItems();

    if (!loading && !value && items.length === 0) {
      return <div />;
    }

    let content: React.ReactNode = null;

    if (error) {
      content = this.renderError(error);
    } else if (loading) {
      content = this.renderLoading();
    } else if (items.length === 0) {
      content = this.renderNoResults();
    }

    return (
      <div
        style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}
        onTouchStart={() => this.setIgnoreBlur(true)}
        onMouseEnter={() => this.setIgnoreBlur(true)}
        onMouseLeave={() => this.setIgnoreBlur(false)}
      >
        <Menu accessibilityLabel={accessibilityLabel} maxHeight={maxHeight}>
          {content || items}
        </Menu>
      </div>
    );
  };

  renderNoResults = () => (
    <MenuRow>
      <Spacing horizontal={1}>
        {renderElementOrFunction(this.props.renderNoResults) || (
          <Text>
            {this.props.noResultsText || (
              <T k="lunar.common.noResults" phrase="No results found." />
            )}
          </Text>
        )}
      </Spacing>
    </MenuRow>
  );

  render() {
    const { id, open, value } = this.state;
    const { children, fieldProps, inputProps } = partitionFieldProps(this.props);

    if (__DEV__) {
      if (inputProps.compact) {
        // eslint-disable-next-line no-console
        console.log('Autocomplete: `compact` prop is deprecated, please use `small` instead.');
      }
    }

    return (
      <FormField {...fieldProps} id={id}>
        <div style={{ display: 'block', position: 'relative' }}>
          <BaseInput
            {...this.getInputProps(inputProps)}
            role="combobox"
            value={value}
            aria-autocomplete="list"
            aria-expanded={open}
            autoComplete="off"
            propagateRef={this.loadRef}
            type="search"
            onClick={this.handleInputClick}
            onFocus={this.handleInputFocus}
            onKeyDown={this.handleInputKeyDown}
            onBlur={this.handleInputBlur}
            onChange={this.handleInputChange}
          />

          {open && this.renderMenu()}
        </div>

        {children}
      </FormField>
    );
  }
}
