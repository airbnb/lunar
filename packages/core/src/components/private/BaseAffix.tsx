import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { WithStylesProps } from '../../composers/withStyles';

const dirProp = mutuallyExclusiveTrueProps('after', 'before');

export type Props = {
  /** @ignore */
  after?: boolean;
  /** @ignore */
  before?: boolean;
  /** Content within the affix. */
  children: NonNullable<React.ReactNode>;
  /** Decrease font size and padding. */
  compact?: boolean;
  /** Mark the affix as disabled. */
  disabled?: boolean;
};

export default class BaseAffix extends React.PureComponent<Props & WithStylesProps> {
  static propTypes = {
    after: dirProp,
    before: dirProp,
  };

  static defaultProps = {
    after: false,
    before: false,
    compact: false,
    disabled: false,
  };

  render() {
    const { cx, after, before, children, compact, disabled, styles } = this.props;

    return (
      <div
        className={cx(
          styles.affix,
          compact && styles.affix_compact,
          before && styles.affix_before,
          after && styles.affix_after,
          disabled && styles.affix_disabled,
        )}
      >
        {children}
      </div>
    );
  }
}
