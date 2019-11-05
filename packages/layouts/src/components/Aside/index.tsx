import React, { useState } from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import Tab from './private/Tab';

const styleSheet: StyleSheet = ({ ui, unit }) => ({
  aside: {
    display: 'block',
    flexGrow: 0,
    flexShrink: 0,
    zIndex: 10,
  },

  aside_animating: {
    pointerEvents: 'none',
    animationDuration: ui.transitionTime,
  },

  aside_scrollable: {
    height: '100%',
  },

  aside_after: {
    borderLeft: ui.border,
  },

  aside_before: {
    borderRight: ui.border,
  },

  aside_collapsible: {
    position: 'relative',
    transition: `transform ${ui.transitionTime} ease-in-out`,
  },

  aside_expanded: {
    transform: 'translateX(0)',
  },

  aside_before_collapsed: {
    transform: 'translateX(-100%)',
  },

  aside_after_collapsed: {
    transform: 'translateX(100%)',
  },

  aside_collapsed_end: {
    borderColor: 'transparent',
  },

  hidden: {
    display: 'none',
  },

  wrapper: {
    opacity: 1,
    padding: unit * 2,
    position: 'relative',
    transition: `opacity ${ui.transitionTime} ease-out`,
    zIndex: 10,
  },

  wrapper_noPadding: {
    padding: 0,
  },

  wrapper_collapsed: {
    opacity: 0,
  },

  wrapper_scrollable: {
    overflowY: 'auto',
    maxHeight: '100%',
  },
});

export type Props = {
  /** Column is rendered after content. Applies a left border. */
  after?: boolean;
  /** Column is rendered before content. Applies a right border. */
  before?: boolean;
  /** Whether the column is collapsible. Open by default, on the right. */
  collapsible?: boolean;
  /** Content within the column. */
  children: NonNullable<React.ReactNode>;
  /** Remove padding from column. */
  noPadding?: boolean;
  /** Convert column to a scrollable container. */
  scrollable?: boolean;
  /** Width of the aside column. */
  width?: number | string;
  /** Callback when column is toggled. */
  onCollapseToggle?: (expanded: boolean) => void;
};

/** An aside column within a layout. */
export default function Aside({
  after,
  before,
  children,
  collapsible,
  noPadding,
  scrollable,
  width,
  onCollapseToggle,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);
  const [animating, setAnimating] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleAnimationEnd = () => {
    setAnimating(false);
  };

  const handleCollapseToggle: React.DOMAttributes<HTMLButtonElement>['onClick'] = collapsible
    ? () => {
        setExpanded(!expanded);
        setAnimating(true);

        if (onCollapseToggle) {
          onCollapseToggle(!expanded);
        }
      }
    : undefined;

  return (
    <aside
      className={cx(
        styles.aside,
        after && styles.aside_after,
        before && styles.aside_before,
        scrollable && styles.aside_scrollable,
        collapsible && styles.aside_collapsible,
        animating && styles.aside_animating,
        {
          width,
        },
        collapsible && expanded && styles.aside_expanded,
        collapsible &&
          !expanded &&
          (before || (!before && !after)) &&
          styles.aside_before_collapsed,
        collapsible && !expanded && after && styles.aside_after_collapsed,
        collapsible && !animating && !expanded && styles.aside_collapsed_end,
      )}
      onTransitionEnd={handleAnimationEnd}
    >
      {collapsible && (
        <Tab
          bordered={!!before || !!after}
          expanded={expanded}
          position={before || (!before && !after) ? 'after' : 'before'}
          onCollapseToggle={handleCollapseToggle}
        />
      )}

      <div
        className={cx(
          styles.wrapper,
          noPadding && styles.wrapper_noPadding,
          scrollable && styles.wrapper_scrollable,
          collapsible && !expanded && styles.wrapper_collapsed,
        )}
      >
        {collapsible ? (
          <div className={cx(!animating && !expanded && styles.hidden)}>{children}</div>
        ) : (
          children
        )}
      </div>
    </aside>
  );
}
