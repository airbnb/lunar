/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import withBoundary from '../../composers/withBoundary';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import GradientScroller from '../GradientScroller';
import Tab, { Props as TabProps } from './Tab';

export { Tab };

export type Props = {
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
  /** Wrap tabs in a scrollable region. */
  scrollable?: boolean;
  /** Stretch tabs to fill the full width. */
  stretched?: boolean;
  /** A unique name for tracking purposes. */
  trackingName?: string;
};

export type State = {
  selectedKey: string;
};

/** A controller for multiple tabs. */
export class Tabs extends React.Component<Props & WithStylesProps, State> {
  static propTypes = {
    children: childrenOfType(Tab).isRequired,
  };

  static defaultProps = {
    borderless: false,
    defaultKey: '',
    onChange() {},
    persistWithHash: '',
    scrollable: false,
    stretched: false,
  };

  state = {
    selectedKey: this.getDefaultSelectedKey(),
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.defaultKey !== prevProps.defaultKey) {
      this.setState({
        selectedKey: this.props.defaultKey!,
      });
    }
  }

  getDefaultSelectedKey(): string {
    const { defaultKey, persistWithHash } = this.props;

    return (persistWithHash && this.getHashQuery().get(persistWithHash)) || defaultKey || '';
  }

  getHashQuery(): URLSearchParams {
    const { hash } = location;

    return new URLSearchParams(hash.length > 1 ? hash.slice(1) : '');
  }

  private handleClick = (key: string) => {
    const { persistWithHash } = this.props;

    this.setState({
      selectedKey: key,
    });

    this.props.onChange!(key);

    if (persistWithHash) {
      const query = this.getHashQuery();

      query.set(persistWithHash, key);

      history.pushState(null, '', `#${String(query)}`);
    }
  };

  render() {
    const { cx, borderless, children, scrollable, stretched, styles } = this.props;
    const { selectedKey } = this.state;

    // Generate content
    let content = null;
    const nav = (
      <nav role="tablist" className={cx(styles.nav, borderless && styles.nav_borderless)}>
        {React.Children.map(children, (child, i) => {
          if (!child) {
            return null;
          }

          const { key, props } = child as any;
          const selected = key === selectedKey || (!selectedKey && i === 0);

          if (__DEV__ && !key) {
            throw new Error('Tab components require a unique `key`.');
          }

          if (selected && props && props.children) {
            content = props.children;
          }

          return React.cloneElement(child as React.ReactElement<TabProps>, {
            borderless,
            keyName: key,
            selected,
            stretched,
            onClick: this.handleClick,
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
}

export default withBoundary('Tabs')(
  withStyles(({ color, ui, unit }) => ({
    nav: {
      borderBottom: ui.borderThick,
      display: 'flex',
    },

    nav_borderless: {
      borderColor: color.clear,
    },

    panel: {
      marginTop: unit,
    },
  }))(Tabs),
);
