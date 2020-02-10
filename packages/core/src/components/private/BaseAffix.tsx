import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { WithStylesProps } from '../../composers/withStyles';

const dirProp = mutuallyExclusiveTrueProps('after', 'before');

export type BaseAffixProps = {
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
  /** Align using flexbox. */
  flex?: boolean;
};

export default class BaseAffix extends React.PureComponent<BaseAffixProps & WithStylesProps> {
  static propTypes = {
    after: dirProp,
    before: dirProp,
  };

  static defaultProps = {
    after: false,
    before: false,
    compact: false,
    disabled: false,
    flex: false,
  };

  render() {
    const { cx, after, before, children, compact, disabled, flex, styles } = this.props;

    return (
      <div
        className={cx(
          styles.affix,
          compact && styles.affix_compact,
          before && styles.affix_before,
          after && styles.affix_after,
          disabled && styles.affix_disabled,
          flex && styles.affix_flex,
        )}
      >
        {children}
      </div>
    );
  }
}
