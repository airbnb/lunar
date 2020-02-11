/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import withBoundary from '../../composers/withBoundary';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import GradientScroller from '../GradientScroller';
import Tab, { TabProps } from './Tab';
import { styleSheet } from './styles';

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
};

export type TabsState = {
  selectedKey: string;
};

/** A controller for multiple tabs. */
export class Tabs extends React.Component<TabsProps & WithStylesProps, TabsState> {
  static defaultProps = {
    borderless: false,
    defaultKey: '',
    onChange() {},
    persistWithHash: '',
    scrollable: false,
    secondary: false,
    stretched: false,
  };

  state = {
    selectedKey: this.getDefaultSelectedKey(),
  };

  handlePopstate = () => {
    const { persistWithHash } = this.props;

    if (persistWithHash) {
      const query = this.getHashQuery();
      if (query.has(persistWithHash)) {
        this.setState({
          selectedKey: query.get(persistWithHash)!,
        });
      }
    }
  };

  componentDidMount() {
    if (this.props.persistWithHash) {
      window.addEventListener('popstate', this.handlePopstate);
    }
  }

  componentWillUnmount() {
    if (this.props.persistWithHash) {
      window.removeEventListener('popstate', this.handlePopstate);
    }
  }

  componentDidUpdate(prevProps: TabsProps) {
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
    const { cx, borderless, children, secondary, scrollable, stretched, styles } = this.props;
    const { selectedKey } = this.state;
    const noBorder = borderless || secondary;

    // Generate content
    let content = null;
    const nav = (
      <nav
        role="tablist"
        className={cx(
          styles.nav,
          noBorder && styles.nav_noBorder,
          secondary && styles.nav_secondary,
        )}
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

export default withBoundary('Tabs')(withStyles(styleSheet)(Tabs));
