import React from 'react';
import { FuseOptions } from 'fuse.js';
import IconCaretDown from '@airbnb/lunar-icons/lib/interface/IconCaretDown';
import Overlay from '../Overlay';
import { SPACE, ENTER } from '../../keys';
import T from '../Translate';
import Text from '../Text';
import Picker from './Picker';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheet } from './styles';

import {
  ItemPickedHandler,
  ItemRenderer,
  ItemShape,
  Labeler,
  ToggleHandler,
  TreePath,
} from './types';

import defaultFormatter from './defaultFormatter';

export type HierarchyPickerProps = {
  /** Content to display in the select button. */
  children?: React.ReactNode;
  /** An array of names define the path to the currently selected item. */
  chosen?: TreePath;
  /** Disables the picker. */
  disabled?: boolean;
  /** A function to format the display of choice. */
  formatter?: (chosen: TreePath, labeler: Labeler) => string;
  /** Fuse.js search options to override. */
  fuseOptions?: FuseOptions<{}>;
  /** Maximum height of a (vertically aligned) hierarchy menu. */
  hierarchyMaxHeight?: number;
  /** Width of a single level of the hierarchy menu. */
  hierarchyWidth?: number;
  /** Include path of parent nodes in search index. */
  indexParentPath?: boolean;
  /** Styles the picker as containing an invalid value. */
  invalid?: boolean;
  /** The hierarchy of things to choose from. */
  items: ItemShape[];
  /** Text to show when there are no search results. */
  noResultsLabel?: string;
  /** Callback for when user selects an item. */
  onItemPicked: ItemPickedHandler;
  /** Callback for when user opens/closes the dropdown. */
  onPickerToggle?: ToggleHandler;
  /** Override rendering of a hierarchy list item. */
  renderItem?: ItemRenderer;
  /** Maximum height of Hierarchy Search result list. */
  searchMaxHeight?: number;
  /** Placeholder label for the search input. */
  searchPlaceholder?: string;
  /** Width of the Hierarchy Search result list. */
  searchWidth?: number;
  /** Vertically align nested hierarchy levels. */
  verticallyAlign?: boolean;
};

export type HierarchyPickerState = {
  open: boolean;
};

export class HierarchyPicker extends React.Component<
  HierarchyPickerProps & WithStylesProps,
  HierarchyPickerState
> {
  static defaultProps = {
    chosen: [],
    disabled: false,
    formatter: defaultFormatter,
    hierarchyMaxHeight: 400,
    hierarchyWidth: 225,
    invalid: false,
    onPickerToggle: () => {},
    searchMaxHeight: 400,
    searchWidth: 300,
    verticallyAlign: false,
  };

  state = {
    open: false,
  };

  ref = React.createRef<HTMLDivElement>();

  /**
   * Given a "chosen" array, what's the best label for the item?
   */
  getLabel = (chosen: TreePath) => {
    const label = chosen.reduce((items: string | ItemShape[], path, i) => {
      if (Array.isArray(items) && items.length > 0) {
        const item = items.find(({ name }) => path === name);

        if (!item) {
          return '';
        }

        return i < chosen.length - 1 ? item.items || [] : item.label || item.name;
      }

      return '';
    }, this.props.items);

    return typeof label === 'string' ? label : '';
  };

  boundFormatter = (chosen: TreePath) => this.props.formatter!(chosen, this.getLabel);

  toggle = () => {
    if (this.props.disabled) {
      return;
    }

    this.setState(
      state => ({ open: !state.open }),
      () => {
        const { open } = this.state;
        if (open) {
          this.props.onPickerToggle!(true);
        } else {
          this.handleClose();
        }
      },
    );
  };

  private handleClose = () => {
    this.props.onPickerToggle!(false);
    this.setState({ open: false });

    const el = this.ref.current;

    if (el) {
      el.focus();
    }
  };

  private handleClick = () => {
    this.toggle();
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== this.ref.current) {
      return;
    }

    switch (event.key) {
      case ENTER:
      case SPACE:
        event.preventDefault();
        this.toggle();
        break;
      default:
        break;
    }
  };

  render() {
    const {
      cx,
      children,
      disabled,
      invalid,
      noResultsLabel,
      searchPlaceholder,
      styles,
      ...passThruProps
    } = this.props;
    const { chosen } = passThruProps;
    const { open } = this.state;

    return (
      <div>
        <div
          ref={this.ref}
          className={cx(
            styles.selectlike,
            !disabled && styles.selectlike_enabled,
            styles.input,
            styles.select,
            invalid && styles.input_invalid,
            disabled && styles.input_disabled,
          )}
          tabIndex={disabled ? -1 : 0}
          role="button"
          onKeyDown={this.handleKeyDown}
          onClick={this.handleClick}
        >
          {children || <Text>{this.boundFormatter(chosen || [])}</Text>}

          <span className={cx(styles.arrow)}>
            <IconCaretDown decorative size="1.5em" />
          </span>
        </div>

        <Overlay open={open} onClose={this.handleClose}>
          <Picker
            {...passThruProps}
            formatter={this.boundFormatter}
            searchPlaceholder={searchPlaceholder || T.phrase('lunar.common.search', 'Search')}
            noResultsLabel={noResultsLabel || T.phrase('lunar.picker.noResults', 'No results')}
            onClose={this.handleClose}
          />
        </Overlay>
      </div>
    );
  }
}

export default withStyles(styleSheet)(HierarchyPicker);
