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
  },

  wrapper: {
    padding: `${unit * 2}px ${unit * 3}px`,
  },

  wrapper_noPadding: {
    padding: 0,
  },

  wrapper_collapsed: {
    display: 'none',
  },

  wrapper_scrollable: {
    maxHeight: '100%',
    overflowY: 'auto',
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
  const [expanded, setExpanded] = useState(true);

  const handleCollapseToggle: React.DOMAttributes<HTMLButtonElement>['onClick'] = collapsible
    ? () => {
        setExpanded(prev => !prev);

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
        collapsible && styles.aside_collapsible,
        scrollable && styles.aside_scrollable,
        {
          width: collapsible && !expanded ? 0 : width,
        },
      )}
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
          collapsible && !expanded && styles.wrapper_collapsed,
          scrollable && styles.wrapper_scrollable,
        )}
      >
        {children}
      </div>
    </aside>
  );
}
