import React from 'react';
import Text from '../../Text';
import useStyles from '../../../hooks/useStyles';
import HierarchyItem from './HierarchyItem';
import ItemDescription from './ItemDescription';
import { ItemShape, TreePath, SubTreeHandler, ItemPickedHandler, ItemRenderer } from '../types';
import { styleSheetList as styleSheet } from './styles';

export type HierarchyListProps = {
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

export default function HierarchyList({
  items = [],
  chosen = [],
  focus = [],
  maxHeight,
  renderItem,
  parents = [],
  onSubtree,
  onItemPicked,
  width,
  verticallyAlign,
}: HierarchyListProps) {
  const ref = React.createRef<HTMLDivElement>();
  const [styles, cx] = useStyles(styleSheet);
  const passThruProps = { chosen, maxHeight, renderItem, onSubtree, onItemPicked, width };

  const isChosen = (definition: TreePath): boolean =>
    definition.every((name, i) => chosen![i] === name);

  /** Returns the closest <li> to the current document activeElement */
  const closestRowToActiveElement = (): HTMLLIElement | null => {
    const { activeElement } = document;

    if (!activeElement || !activeElement.closest || !ref.current) {
      return null;
    }

    return activeElement.closest('li');
  };

  const handleDomFocusDeeper = () => {
    const li = closestRowToActiveElement();

    let deeper;
    if (verticallyAlign) {
      // next HierarchyList is a sibling
      const ul = li?.parentElement;
      const parentDiv = ul?.parentElement;
      const nextMenu = parentDiv?.nextElementSibling;
      deeper = nextMenu?.querySelector('[tabindex]');
    } else {
      // next HierarchyList is a child
      const ul = li?.lastElementChild;
      deeper = ul?.querySelector('[tabindex]');
    }

    if (deeper) {
      (deeper as HTMLElement).focus();
    }
  };

  const handleDomFocusShallower = () => {
    const li = closestRowToActiveElement();

    let shallower;
    if (verticallyAlign) {
      // prev HierarchyList is a sibling
      const ul = li?.parentElement;
      const parentDiv = ul?.parentElement;
      const prevMenu = parentDiv?.previousElementSibling;
      // focused parent tabIndex is higher than other parents
      shallower = prevMenu?.querySelector('[tabindex="1"]');
    } else {
      // prev HierarchyList is a parent
      const parentLi = li?.parentElement?.closest('li');
      shallower = parentLi?.querySelector('[tabindex]');
    }

    if (shallower) {
      (shallower as HTMLElement).focus();
    }
  };

  const renderAside = (item: ItemShape) => {
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
          onClick={() => onItemPicked([...parents, item.name], item)}
        >
          <ItemDescription item={item} />
        </button>
      </aside>
    );
  };

  if (items.length === 0) {
    return null;
  }

  const [focusName, ...focusRest] = focus;
  const isNested = parents.length > 0;

  // Track focused item to render as a sibling if vertically aligned
  let focusedItem: ItemShape | undefined;
  let currentSection: string | undefined;

  return (
    <>
      <div
        key="list"
        ref={ref}
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
                    selected={isChosen(definition)}
                    focused={isFocused}
                    onDomFocusDeeper={handleDomFocusDeeper}
                    onDomFocusShallower={handleDomFocusShallower}
                  />

                  {!verticallyAlign && isFocused && item.items && item.items.length > 0 ? (
                    <HierarchyList
                      {...passThruProps}
                      items={item.items!}
                      focus={focusRest}
                      parents={parents.concat(item.name)}
                      verticallyAlign={false}
                    />
                  ) : (
                    !verticallyAlign && isFocused && renderAside(item)
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
          items={focusedItem!.items}
          focus={focusRest}
          parents={parents.concat(focusedItem!.name)}
        />
      ) : (
        verticallyAlign && focusedItem && renderAside(focusedItem)
      )}
    </>
  );
}
