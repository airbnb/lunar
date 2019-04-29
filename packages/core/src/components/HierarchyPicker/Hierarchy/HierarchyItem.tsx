import React from 'react';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import IconCheckmark from '@airbnb/lunar-icons/lib/interface/IconCheck';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import { ENTER, SPACE, ARROW_RIGHT, ARROW_LEFT } from '../../../keys';
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

export type Props = {
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

const ICON_SIZE = 18;

class HierarchyItem extends React.Component<Props & WithStylesProps> {
  maybePick = () => {
    const { onItemPicked, item, definition } = this.props;

    if (item.readonly) {
      onItemPicked(null);
      this.goDeeper();
    } else {
      onItemPicked(definition);
    }
  };

  goDeeper = () => {
    const { onSubtree, onDomFocusDeeper, definition, item } = this.props;

    if (item.items || item.description) {
      onSubtree(definition, onDomFocusDeeper, true);
    }
  };

  goShallower = () => {
    const { onSubtree, onDomFocusShallower, definition } = this.props;

    onDomFocusShallower();
    onSubtree(definition.slice(0, -2), undefined, true);
  };

  private handleClick = () => {
    this.maybePick();
  };

  private handleMouseMove = () => {
    const { onSubtree, definition } = this.props;

    onSubtree(definition);
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case ENTER:
      case SPACE:
        this.maybePick();
        break;

      case ARROW_RIGHT:
        this.goDeeper();
        break;

      case ARROW_LEFT:
        this.goShallower();
        break;

      default:
        break;
    }
  };

  renderItem = () => {
    const { focused, item, styles, selected, renderItem, theme } = this.props;

    return renderItem ? (
      renderItem(item, selected, focused)
    ) : (
      <>
        {selected && (
          <span {...css(styles.checkmark)}>
            <IconCheckmark color={theme!.color.core.primary[3]} size={ICON_SIZE} decorative />
          </span>
        )}

        <span {...css(styles.label)}>{<Text>{item.label || item.name}</Text>}</span>
      </>
    );
  };

  render() {
    const { focused, item, styles, selected } = this.props;

    return (
      <div
        {...css(styles.item, focused && styles.item_focused, item.readonly && styles.item_readonly)}
        role="option"
        aria-selected={selected}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        tabIndex={focused ? 1 : 0} // this is needed to find a focused parent item in a vertically aligned list
      >
        {this.renderItem()}
        {item.items && <IconChevronRight size="1.4em" decorative inline />}
      </div>
    );
  }
}

export default withStyles(
  ({ color, unit, ui }) => ({
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: `${unit}px ${1.5 * unit}px ${unit}px ${2.75 * unit}px`,
      cursor: 'pointer',
      position: 'relative',
      borderRadius: ui.borderRadius,

      '@selectors': {
        ':hover, :focus': {
          backgroundColor: color.accent.bgHover,
          outline: 'none',
        },
      },
    },

    item_focused: {
      backgroundColor: color.accent.bgHover,
    },

    item_readonly: {
      cursor: 'initial',
    },

    label: {
      flexGrow: 1,
    },

    checkmark: {
      position: 'absolute',
      left: 0.25 * unit + 1,
      top: ICON_SIZE / 2 + 1,
    },
  }),
  { passThemeProp: true },
)(HierarchyItem);
