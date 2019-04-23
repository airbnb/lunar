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

  closestListToActiveElement(): HTMLDivElement | null {
    const { activeElement } = document;

    if (!activeElement || !activeElement.closest || !this.ref.current) {
      return null;
    }

    const ul = activeElement.closest('ul');
    const div = ul && ul.closest('div');

    return div;
  }

  isChosen(definition: TreePath): boolean {
    const { chosen } = this.props;

    return definition.every((name, i) => chosen![i] === name);
  }

  private handleDomFocusDeeper = () => {
    const parentList = this.closestListToActiveElement();
    const nextMenu = parentList && parentList.nextElementSibling;
    const deeper = nextMenu && nextMenu.querySelector('[tabindex]');

    if (deeper) {
      (deeper as HTMLElement).focus();
    }
  };

  private handleDomFocusShallower = () => {
    const parentList = this.closestListToActiveElement();
    const parentMenu = parentList && parentList.previousElementSibling;
    // focused parent tabIndex is higher than other parents
    const shallower = parentMenu && parentMenu.querySelector('[tabindex="1"]');

    if (this.props.parents!.length === 0 || !shallower) {
      return;
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

    const isNested = parents.length > 0;

    return (
      <aside
        {...css(
          styles.pane,
          isNested && styles.pane_nested,
          isNested && !verticallyAlign && styles.pane_verticallyOffset,
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

    // Track focused item to render as a sibling in vertically aligned menus
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

                    {!verticallyAlign && isFocused && item.items ? (
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

        {verticallyAlign && focusedItem && focusedItem!.items ? (
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
          focusedItem && this.renderAside(focusedItem)
        )}
      </>
    );
  }
}

export default withStyles(({ color, pattern, unit, ui }) => ({
  pane: {
    display: 'flex',
    borderTop: `1px solid ${color.accent.border}`,
    borderRadius: ui.borderRadius,
  },

  pane_verticallyAlign: {
    overflowY: 'auto',
  },

  pane_nested: {
    borderLeft: `1px solid ${color.accent.border}`,
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
