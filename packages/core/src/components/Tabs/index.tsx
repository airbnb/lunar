/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect, useCallback } from 'react';
import withBoundary, { WithBoundaryWrapperProps } from '../../composers/withBoundary';
import GradientScroller from '../GradientScroller';
import Tab, { TabProps } from './Tab';
import { styleSheetTabs } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export { Tab };

export type TabsProps<T extends string = string> = {
  /** Hide bottom border of Tabs. */
  borderless?: boolean;
  /** Tabs and their content. */
  children: NonNullable<React.ReactNode>;
  /** Key of tab selected by default. */
  defaultKey?: T;
  /** Callback fired when a tab changes. */
  onChange?: (key: T) => void;
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
function Tabs<T extends string = string>({
  borderless,
  children,
  secondary,
  scrollable,
  stretched,
  persistWithHash,
  defaultKey,
  onChange,
  styleSheet,
}: TabsProps<T>) {
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

  const handleClick = (key: T) => {
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

        return React.cloneElement(child as React.ReactElement<TabProps<T>>, {
          borderless,
          keyName: String(key) as T,
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

// Required to pass generics around HOCs
const BoundaryTabs = withBoundary('Tabs')(Tabs) as <T extends string = string>(
  props: TabsProps<T> & WithBoundaryWrapperProps,
) => React.ReactElement<TabsProps<T>>;

export default BoundaryTabs;
