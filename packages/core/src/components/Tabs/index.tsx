/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect, useCallback } from 'react';
import withBoundary from '../../composers/withBoundary';
import GradientScroller from '../GradientScroller';
import Tab, { TabProps } from './Tab';
import { styleSheetTabs } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export { Tab };

export type TabsProps = {
  /** Hide bottom border of Tabs. */
  borderless?: boolean;
  /** Tabs and their content. */
  children: NonNullable<React.ReactNode>;
  /** Key of tab selected by default. */
  defaultKey?: string;
  /** Callback fired when a tab changes. */
  onChange?: (key: string) => void;
  /** Persist the selected tab through the defined URL hash. */
  persistWithHash?: string;
  /** Secondary tab style, implies borderless. */
  secondary?: boolean;
  /** Wrap tabs in a scrollable region. */
  scrollable?: boolean;
  /** Stretch tabs to fill the full width. */
  stretched?: boolean;
  /** A unique name for tracking purposes. */
  trackingName?: string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

function getHashQuery(): URLSearchParams {
  const { hash } = location;

  return new URLSearchParams(hash.length > 1 ? hash.slice(1) : '');
}

/** A controller for multiple tabs. */
function Tabs({
  borderless,
  children,
  secondary,
  scrollable,
  stretched,
  persistWithHash,
  defaultKey,
  onChange,
  styleSheet,
}: TabsProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetTabs);
  const [selectedKey, setSelectedKey] = useState(
    () => (persistWithHash && getHashQuery().get(persistWithHash)) || defaultKey || '',
  );
  const noBorder = borderless || secondary;

  const handlePopstate = useCallback(() => {
    if (!persistWithHash) {
      return;
    }

    const query = getHashQuery();

    if (query.has(persistWithHash)) {
      setSelectedKey(query.get(persistWithHash)!);
    }
  }, [persistWithHash]);

  const handleClick = (key: string) => {
    setSelectedKey(key);

    if (onChange) {
      onChange(key);
    }

    if (persistWithHash) {
      const query = getHashQuery();

      query.set(persistWithHash, key);

      history.pushState(null, '', `#${String(query)}`);
    }
  };

  useEffect(() => {
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [handlePopstate]);

  // Generate content
  let content = null;
  const nav = (
    <nav
      role="tablist"
      className={cx(styles.nav, noBorder && styles.nav_noBorder, secondary && styles.nav_secondary)}
    >
      {React.Children.map(children, (child, i) => {
        if (!child) {
          return null;
        }

        const { key, props } = child as React.ReactElement;
        const selected = key === selectedKey || (!selectedKey && i === 0);

        if (__DEV__ && !key) {
          throw new Error('Tab components require a unique `key`.');
        }

        if (selected && props && props.children) {
          content = props.children;
        }

        return React.cloneElement(child as React.ReactElement<TabProps>, {
          borderless,
          keyName: String(key),
          secondary,
          selected,
          stretched,
          onClick: handleClick,
        });
      })}
    </nav>
  );

  return (
    <div>
      {scrollable ? (
        <GradientScroller hideScrollbar showArrows>
          {nav}
        </GradientScroller>
      ) : (
        nav
      )}

      {content && (
        <section role="tabpanel" className={cx(styles.panel)}>
          {content}
        </section>
      )}
    </div>
  );
}

export default withBoundary('Tabs')(Tabs);
