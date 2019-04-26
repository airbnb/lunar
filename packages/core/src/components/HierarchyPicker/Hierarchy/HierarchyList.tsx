import React from 'react';
import Text from '../../Text';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import HierarchyItem from './HierarchyItem';
import ItemDescription from './ItemDescription';
import { ItemShape, TreePath, SubTreeHandler, ItemPickedHandler, ItemRenderer } from '../types';

export type Props = {
  items?: ItemShape[];
  chosen?: TreePath;
  focus: TreePath;
  maxHeight?: number;
  renderItem?: ItemRenderer;
  parents?: TreePath;
  onSubtree: SubTreeHandler;
  onItemPicked: ItemPickedHandler;
  width?: number;
  verticallyAlign?: boolean;
};

export class HierarchyList extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    chosen: [],
    items: [],
    parents: [],
    verticallyAlign: false,
  };

  ref = React.createRef<HTMLDivElement>();

  isChosen(definition: TreePath): boolean {
    const { chosen } = this.props;

    return definition.every((name, i) => chosen![i] === name);
  }

  /** Returns the closest <li> to the current document activeElement */
  closestRowToActiveElement(): HTMLLIElement | null {
    const { activeElement } = document;

    if (!activeElement || !activeElement.closest || !this.ref.current) {
      return null;
    }

    return activeElement.closest('li');
  }

  private handleDomFocusDeeper = () => {
    const { verticallyAlign } = this.props;
    const li = this.closestRowToActiveElement();

    let deeper;
    if (verticallyAlign) {
      // next HierarchyList is a sibling
      const ul = li && li.parentElement;
      const parentDiv = ul && ul.parentElement;
      const nextMenu = parentDiv && parentDiv.nextElementSibling;
      deeper = nextMenu && nextMenu.querySelector('[tabindex]');
    } else {
      // next HierarchyList is a child
      const ul = li && li.lastElementChild;
      deeper = ul && ul.querySelector('[tabindex]');
    }

    if (deeper) {
      (deeper as HTMLElement).focus();
    }
  };

  private handleDomFocusShallower = () => {
    const { verticallyAlign } = this.props;
    const li = this.closestRowToActiveElement();

    let shallower;
    if (verticallyAlign) {
      // prev HierarchyList is a sibling
      const ul = li && li.parentElement;
      const parentDiv = ul && ul.parentElement;
      const prevMenu = parentDiv && parentDiv.previousElementSibling;
      // focused parent tabIndex is higher than other parents
      shallower = prevMenu && prevMenu.querySelector('[tabindex="1"]');
    } else {
      // prev HierarchyList is a parent
      const parentLi = li && li.parentElement && li.parentElement.closest('li');
      shallower = parentLi && parentLi.querySelector('[tabindex]');
    }

    if (shallower) {
      (shallower as HTMLElement).focus();
    }
  };

  renderAside(item: ItemShape) {
    const { styles, parents = [], onItemPicked, width, verticallyAlign } = this.props;

    if (item.items || !item.description) {
      return null;
    }

    return (
      <aside
        {...css(
          styles.pane,
          styles.pane_nested, // descriptions are always nested
          !verticallyAlign && styles.pane_verticallyOffset,
          styles.aside,
          { width },
        )}
      >
        <button
          {...css(styles.asideButton)}
          onClick={() => onItemPicked([...parents, item.name])}
          tabIndex={-1}
          type="button"
        >
          <ItemDescription item={item} />
        </button>
      </aside>
    );
  }

  render() {
    const { focus, items, styles, parents, verticallyAlign, ...passThruProps } = this
      .props as Required<Props & WithStylesProps>;

    if (items.length === 0) {
      return null;
    }

    const [focusName, ...focusRest] = focus;
    const { maxHeight, width } = passThruProps;
    const isNested = parents.length > 0;

    // Track focused item to render as a sibling if vertically aligned
    let focusedItem: ItemShape | undefined;
    let currentSection: string | undefined;

    return (
      <>
        <div
          key="list"
          {...css(
            styles.pane,
            verticallyAlign && styles.pane_verticallyAlign,
            isNested && styles.pane_nested,
            isNested && !verticallyAlign && styles.pane_verticallyOffset,
            {
              width,
              maxHeight: verticallyAlign ? maxHeight : undefined,
              zIndex: 1,
            },
          )}
          ref={this.ref}
        >
          <ul {...css(styles.list)}>
            {items.map((item, index) => {
              const { name, section } = item;
              const definition = parents.concat(name);
              const isFocused = name === focusName;
              const shouldRenderSection = typeof section === 'string' && section !== currentSection;

              focusedItem = verticallyAlign && isFocused ? item : focusedItem;
              currentSection = shouldRenderSection ? section : currentSection;

              return (
                <React.Fragment key={item.name}>
                  {shouldRenderSection && index > 0 ? <li {...css(styles.divider)} /> : null}

                  {shouldRenderSection && section ? (
                    <li {...css(styles.sectionHeader)}>
                      <Text small bold uppercased>
                        {section}
                      </Text>
                    </li>
                  ) : null}

                  <li {...css(styles.row)}>
                    <HierarchyItem
                      {...passThruProps}
                      onDomFocusDeeper={this.handleDomFocusDeeper}
                      onDomFocusShallower={this.handleDomFocusShallower}
                      item={item}
                      definition={definition}
                      selected={this.isChosen(definition)}
                      focused={isFocused}
                    />

                    {!verticallyAlign && isFocused && item.items && item.items.length > 0 ? (
                      <HierarchyList
                        {...passThruProps}
                        styles={styles}
                        items={item.items!}
                        focus={focusRest}
                        parents={parents.concat(item.name)}
                        verticallyAlign={false}
                      />
                    ) : (
                      !verticallyAlign && isFocused && this.renderAside(item)
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>

        {verticallyAlign && focusedItem && focusedItem!.items && focusedItem.items.length > 0 ? (
          <HierarchyList
            key="sub-list"
            {...passThruProps}
            styles={styles}
            items={focusedItem!.items}
            focus={focusRest}
            parents={parents.concat(focusedItem!.name)}
            verticallyAlign
          />
        ) : (
          verticallyAlign && focusedItem && this.renderAside(focusedItem)
        )}
      </>
    );
  }
}

export default withStyles(({ color, pattern, unit, ui }) => ({
  pane: {
    display: 'flex',
    borderRadius: ui.borderRadius,
  },

  pane_verticallyAlign: {
    overflowY: 'auto',
    borderRadius: 0,
  },

  pane_nested: {
    borderLeft: ui.border,
  },

  pane_verticallyOffset: {
    position: 'absolute',
    overflow: 'visible',
    top: 0,
    marginLeft: -2,
    transform: 'translateX(100%)',
    background: color.accent.bg,
    border: ui.border,
    boxShadow: ui.boxShadowMedium,
  },

  list: {
    flex: 1,
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },

  sectionHeader: {
    padding: `${1.5 * unit}px ${3 * unit}px`,
  },

  divider: {
    borderBottom: ui.border,
    marginTop: 0.5 * unit,
    marginBottom: 0.5 * unit,
  },

  aside: {
    flex: 1,
    alignItems: 'flex-start',
    overflow: 'auto',
    wordBreak: 'break-word',
  },

  asideButton: {
    ...pattern.resetButton,
    flex: 1,
    padding: unit * 2,
    textAlign: 'left',
    cursor: 'help',
  },

  row: {
    position: 'relative',
  },
}))(HierarchyList);
