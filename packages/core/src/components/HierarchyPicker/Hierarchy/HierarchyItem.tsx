import React from 'react';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import IconCheckmark from '@airbnb/lunar-icons/lib/interface/IconCheck';
import useStyles from '../../../hooks/useStyles';
import useTheme from '../../../hooks/useTheme';
import { ENTER, SPACE, ARROW_RIGHT, ARROW_LEFT } from '../../../keys';
import DirectionalIcon from '../../DirectionalIcon';
import Text from '../../Text';
import {
  ItemPickedHandler,
  DeepFocusHandler,
  ShallowFocusHandler,
  TreePath,
  SubTreeHandler,
  ItemShape,
  ItemRenderer,
} from '../types';
import { styleSheetItem as styleSheet, ICON_SIZE } from './styles';

export { ICON_SIZE };

export type HierarchyItemProps = {
  item: ItemShape;
  definition: TreePath;
  renderItem?: ItemRenderer;
  selected: boolean;
  focused: boolean;
  onSubtree: SubTreeHandler;
  onItemPicked: ItemPickedHandler;
  onDomFocusDeeper: DeepFocusHandler;
  onDomFocusShallower: ShallowFocusHandler;
};

export default function HierarchyItem({
  item,
  definition,
  renderItem,
  selected,
  focused,
  onSubtree,
  onItemPicked,
  onDomFocusDeeper,
  onDomFocusShallower,
}: HierarchyItemProps) {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();

  const goDeeper = () => {
    if (item.items || item.description) {
      onSubtree(definition, onDomFocusDeeper, true);
    }
  };

  const maybePick = () => {
    if (item.readonly) {
      onItemPicked(null, null);
      goDeeper();
    } else {
      onItemPicked(definition, item);
    }
  };

  const goShallower = () => {
    onDomFocusShallower();
    onSubtree(definition.slice(0, -2), undefined, true);
  };

  const handleClick = () => {
    maybePick();
  };

  const handleMouseMove = () => {
    onSubtree(definition);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case ENTER:
      case SPACE:
        maybePick();
        break;

      case ARROW_RIGHT:
        goDeeper();
        break;

      case ARROW_LEFT:
        goShallower();
        break;

      default:
        break;
    }
  };

  const getRenderItem = () => {
    return renderItem ? (
      renderItem(item, selected, focused)
    ) : (
      <>
        {selected && (
          <span className={cx(styles.checkmark)}>
            <IconCheckmark decorative color={theme.color.core.primary[3]} size={ICON_SIZE} />
          </span>
        )}

        <span className={cx(styles.label)}>
          <Text>{item.label || item.name}</Text>
        </span>
      </>
    );
  };

  return (
    <div
      className={cx(
        styles.item,
        focused && styles.item_focused,
        item.readonly && styles.item_readonly,
      )}
      role="option"
      aria-selected={selected}
      tabIndex={focused ? 1 : 0}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      // this is needed to find a focused parent item in a vertically aligned list
      onKeyDown={handleKeyDown}
    >
      {getRenderItem()}

      {item.items && (
        <DirectionalIcon
          decorative
          inline
          direction="right"
          left={IconChevronLeft}
          right={IconChevronRight}
          size="1.4em"
        />
      )}
    </div>
  );
}
