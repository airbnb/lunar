import React from 'react';
import Hierarchy from '../Hierarchy';
import Search from '../Search';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import { ARROW_UP, ARROW_DOWN } from '../../../keys';
import {
  ChoiceDetails,
  Formatter,
  ItemPickedHandler,
  ItemRenderer,
  ItemShape,
  TreePath,
} from '../types';
import { styleSheet } from './styles';

export type Props = {
  chosen?: TreePath;
  hierarchyMaxHeight?: number;
  hierarchyWidth?: number;
  indexParentPath?: boolean;
  items: ItemShape[];
  formatter: Formatter;
  noResultsLabel: string;
  onClose: () => void;
  onItemPicked: ItemPickedHandler;
  renderItem?: ItemRenderer;
  searchMaxHeight?: number;
  searchPlaceholder: string;
  searchWidth?: number;
  verticallyAlign?: boolean;
};

export type State = {
  searchQuery: string;
};

export class Picker extends React.Component<Props & WithStylesProps, State> {
  static defaultProps = {
    searchWidth: 300,
  };

  state = {
    searchQuery: '',
  };

  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const [focusable] = this.getFocusables();
    const { scrollX, scrollY } = window;

    // We want to focus the first focusable item,
    // but that could cause a scroll of the document
    // depending on where the dropdown is positioned.
    // This would break initial alignment of the dropdown with the trigger.
    // so we get scroll position before focus, then set it back.
    if (focusable) {
      focusable.focus();
      window.scrollTo(scrollX, scrollY);
    }
  }

  getFocusables(): HTMLElement[] {
    const el = this.ref.current;

    return el ? Array.from(el.querySelectorAll('input,[tabindex]')) : [];
  }

  focusNext(forward: boolean = true) {
    const f = this.getFocusables();
    const index = f.findIndex(el => el === document.activeElement);

    if (index >= 0) {
      if (forward) {
        f[index < f.length - 1 ? index + 1 : 0].focus();
      } else {
        f[(index || f.length) - 1].focus();
      }
    }
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { searchQuery } = this.state;
    if (searchQuery) return;

    switch (event.key) {
      case ARROW_DOWN:
      case ARROW_UP:
        event.preventDefault();
        this.focusNext(event.key === ARROW_DOWN);
        break;
      default:
        break;
    }
  };

  private handleSearch = (searchQuery: string) => {
    this.setState({ searchQuery });
  };

  private handleItemPicked = (
    def: TreePath | null,
    item: ItemShape | null,
    details?: ChoiceDetails,
  ) => {
    if (def) {
      // null if item.readonly
      this.props.onItemPicked(def, item, details);
      this.props.onClose();
    }
  };

  render() {
    const {
      cx,
      chosen,
      hierarchyMaxHeight,
      hierarchyWidth,
      indexParentPath,
      items,
      formatter,
      noResultsLabel,
      renderItem,
      searchMaxHeight,
      searchPlaceholder,
      searchWidth,
      styles,
      verticallyAlign,
    } = this.props;

    const { searchQuery } = this.state;

    return (
      /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
      <div ref={this.ref} className={cx(styles.pane)} onKeyDown={this.handleKeyDown}>
        <Search
          formatter={formatter}
          indexParentPath={indexParentPath}
          items={items}
          maxHeight={searchMaxHeight}
          noResultsLabel={noResultsLabel}
          placeholder={searchPlaceholder}
          query={searchQuery}
          width={searchWidth!}
          onSearch={this.handleSearch}
          onItemPicked={this.handleItemPicked}
        />

        {!searchQuery && (
          <div role="listbox" className={cx(styles.hierarchy)}>
            <Hierarchy
              chosen={chosen}
              items={items}
              formatter={formatter}
              hierarchyMaxHeight={hierarchyMaxHeight}
              hierarchyWidth={hierarchyWidth}
              renderItem={renderItem}
              verticallyAlign={verticallyAlign}
              onItemPicked={this.handleItemPicked}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styleSheet)(Picker);
