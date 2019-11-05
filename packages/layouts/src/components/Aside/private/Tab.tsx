import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import DirectionalIcon from '@airbnb/lunar/lib/components/DirectionalIcon';
import T from '@airbnb/lunar/lib/components/Translate';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';

const ICON_SIZE = 18;

const styleSheet: StyleSheet = ({ color, pattern, transition, ui, unit }) => ({
  tab: {
    ...pattern.regularButton,
    ...transition.box,
    border: ui.border,
    borderColor: color.accent.bg,
    backgroundColor: color.accent.bg,
    color: color.core.neutral[5],
    cursor: 'pointer',
    position: 'absolute',
    padding: `${unit}px 0`,
    top: unit * 2,
    transform: 'translate3d(0,0,0)',
    zIndex: 10,
    overflow: 'hidden',

    ':hover': {
      background: color.accent.bgHover,
      color: color.core.neutral[4],
    },
  },

  tab_bordered: {
    borderColor: color.accent.border,
    borderRadius: ui.borderRadius,
  },

  tab_after: {
    right: -ICON_SIZE - ui.borderWidth * 2,
    borderLeftColor: color.accent.bg,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,

    ':hover': {
      borderLeftColor: color.accent.bgHover,
    },
  },

  tab_before: {
    left: -ICON_SIZE - ui.borderWidth * 2,
    borderRightColor: color.accent.bg,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    ':hover': {
      borderRightColor: color.accent.bgHover,
    },
  },
});

export type Props = {
  /** Whether to apply bordered styles. */
  bordered?: boolean;
  /** Whether the column is expanded. */
  expanded?: boolean;
  /**
   Tab's position relative to the column:
    `after` tab is on the right for a left column (default);
    `before` tab is on the left for a right column.
  */
  position?: 'before' | 'after';
  /** Callback when column is toggled. */
  onCollapseToggle: React.DOMAttributes<HTMLButtonElement>['onClick'];
};

/** A tab for toggling an aside. */
export default function Tab({ bordered, expanded, position = 'after', onCollapseToggle }: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const labelCollapse = T.phrase('Collapse', null, {
    context: 'Collapse',
    key: 'lunar.common.collapse',
  });

  const labelExpand = T.phrase('Expand', null, {
    context: 'Expand',
    key: 'lunar.common.expand',
  });

  let direction: 'left' | 'right' = expanded ? 'left' : 'right';
  if (position === 'before') {
    direction = expanded ? 'right' : 'left';
  }

  return (
    <button
      className={cx(
        styles.tab,
        bordered && styles.tab_bordered,
        position === 'after' && styles.tab_after,
        position === 'before' && styles.tab_before,
      )}
      type="button"
      onClick={onCollapseToggle}
    >
      <DirectionalIcon
        accessibilityLabel={expanded ? labelCollapse : labelExpand}
        direction={direction}
        left={IconChevronLeft}
        right={IconChevronRight}
        size={ICON_SIZE}
      />
    </button>
  );
}
