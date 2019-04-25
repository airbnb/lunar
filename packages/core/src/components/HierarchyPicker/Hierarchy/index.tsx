import React from 'react';
import debounce from 'lodash/debounce';
import HierarchyList from './HierarchyList';
import { readonlyReducer } from './helpers';
import {
  DeepFocusHandler,
  Formatter,
  ItemRenderer,
  ItemShape,
  ItemPickedHandler,
  TreePath,
} from '../types';

export type Props = {
  /** An array of names define the path to the currently selected item. */
  chosen?: TreePath;
  /** A function to format the display of choice. */
  formatter: Formatter;
  /** Maximum height of the hierarchy menu. */
  hierarchyMaxHeight?: number;
  /** Width of a single level of the hierarchy menu. */
  hierarchyWidth?: number;
  /** The hierarchy of things to choose from. */
  items?: ItemShape[];
  /** Callback for when user selects an item. */
  onItemPicked: ItemPickedHandler;
  /** Render a hierarchy item */
  renderItem?: ItemRenderer;
  /** Vertically align nested hierarchy levels. */
  verticallyAlign?: boolean;
};

export type State = {
  focusDef: TreePath;
  filteredItems: ItemShape[];
};

export default class Hierarchy extends React.Component<Props, State> {
  static defaultProps = {
    chosen: [],
    items: [],
  };

  state = {
    focusDef: [],
    filteredItems: [],
  };

  componentDidMount() {
    this.filterItems();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.items !== prevProps.items) {
      this.filterItems();
    }
  }

  filterItems() {
    this.setState({
      // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
      filteredItems: (this.props.items || []).reduce(readonlyReducer, []),
    });
  }

  setFocus(focusDef: TreePath, callback?: DeepFocusHandler) {
    this.setState({ focusDef }, callback);
  }

  setFocusDebounced = debounce(this.setFocus, 100);

  private handleSubtree = (
    focusDef: TreePath,
    callback?: DeepFocusHandler,
    immediate: boolean = false,
  ) => {
    if (immediate) {
      this.setFocus(focusDef, callback);
    } else {
      this.setFocusDebounced(focusDef, callback);
    }
  };

  private handleItemPicked = (chosen: TreePath | null) => {
    this.props.onItemPicked(chosen, { origin: 'Hierarchy' });
  };

  render() {
    const { filteredItems, focusDef } = this.state;
    const { chosen, renderItem, hierarchyMaxHeight, hierarchyWidth, verticallyAlign } = this.props;

    return (
      <HierarchyList
        chosen={chosen}
        focus={focusDef}
        items={filteredItems}
        maxHeight={hierarchyMaxHeight}
        onItemPicked={this.handleItemPicked}
        onSubtree={this.handleSubtree}
        renderItem={renderItem}
        width={hierarchyWidth}
        verticallyAlign={verticallyAlign}
      />
    );
  }
}
