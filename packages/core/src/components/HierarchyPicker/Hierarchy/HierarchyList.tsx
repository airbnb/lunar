import React from 'react';
import Text from '../../Text';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
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
    const { cx, styles, parents = [], onItemPicked, width, verticallyAlign } = this.props;

    if (item.items || !item.description) {
      return null;
    }

    return (
      <aside
        className={cx(
          styles.pane, // descriptions are always nested
          styles.pane_nested,
          !verticallyAlign && styles.pane_verticallyOffset,
          styles.aside,
          { width },
        )}
      >
        <button
          className={cx(styles.asideButton)}
          tabIndex={-1}
          type="button"
          onClick={() => onItemPicked([...parents, item.name])}
        >
          <ItemDescription item={item} />
        </button>
      </aside>
    );
  }

  render() {
    const { cx, focus, items, styles, parents, verticallyAlign, ...passThruProps } = this
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
          ref={this.ref}
          className={cx(
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
        >
          <ul className={cx(styles.list)}>
            {items.map((item, index) => {
              const { name, section } = item;
              const definition = parents.concat(name);
              const isFocused = name === focusName;
              const shouldRenderSection = typeof section === 'string' && section !== currentSection;

              focusedItem = verticallyAlign && isFocused ? item : focusedItem;
              currentSection = shouldRenderSection ? section : currentSection;

              return (
                <React.Fragment key={item.name}>
                  {shouldRenderSection && index > 0 ? <li className={cx(styles.divider)} /> : null}

                  {shouldRenderSection && section ? (
                    <li className={cx(styles.sectionHeader)}>
                      <Text small bold uppercased>
                        {section}
                      </Text>
                    </li>
                  ) : null}

                  <li className={cx(styles.row)}>
                    <HierarchyItem
                      {...passThruProps}
                      item={item}
                      definition={definition}
                      selected={this.isChosen(definition)}
                      focused={isFocused}
                      onDomFocusDeeper={this.handleDomFocusDeeper}
                      onDomFocusShallower={this.handleDomFocusShallower}
                    />

                    {!verticallyAlign && isFocused && item.items && item.items.length > 0 ? (
                      <HierarchyList
                        {...passThruProps}
                        cx={cx}
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
            verticallyAlign
            cx={cx}
            styles={styles}
            items={focusedItem!.items}
            focus={focusRest}
            parents={parents.concat(focusedItem!.name)}
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
