import React from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import T from '@airbnb/lunar/lib/components/Translate';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';

const ICON_SIZE = 24;

const styleSheet: StyleSheet = ({ color, pattern, ui, unit }) => ({
  tab: {
    ...pattern.regularButton,
    border: ui.border,
    borderColor: color.accent.bg,
    backgroundColor: color.accent.bg,
    color: color.accent.border,
    position: 'absolute',
    padding: `${unit / 2}px 0`,
    top: unit * 2,
    transform: 'translate3d(0,0,0)',
    zIndex: 10,
  },

  tab_bordered: {
    borderColor: color.accent.border,
    borderRadius: ui.borderRadius,
  },

  tab_after: {
    right: -ICON_SIZE - ui.borderWidth,
    borderLeftColor: color.accent.bg,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  tab_before: {
    left: -ICON_SIZE - ui.borderWidth,
    borderRightColor: color.accent.bg,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
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

  let Icon = expanded ? (
    <IconChevronLeft accessibilityLabel={labelCollapse} size={ICON_SIZE} />
  ) : (
    <IconChevronRight accessibilityLabel={labelExpand} size={ICON_SIZE} />
  );

  if (position === 'before') {
    Icon = expanded ? (
      <IconChevronRight accessibilityLabel={labelCollapse} size={ICON_SIZE} />
    ) : (
      <IconChevronLeft accessibilityLabel={labelExpand} size={ICON_SIZE} />
    );
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
      {Icon}
    </button>
  );
}
