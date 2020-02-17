import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { WithStylesProps } from '../../composers/withStyles';

const dirProp = mutuallyExclusiveTrueProps('after', 'before');
const sizeProp = mutuallyExclusiveTrueProps('small', 'large');

export type BaseAffixProps = {
  /** @ignore */
  after?: boolean;
  /** @ignore */
  before?: boolean;
  /** Content within the affix. */
  children: NonNullable<React.ReactNode>;
  /** Increase font size and padding. */
  large?: boolean;
  /** Mark the affix as disabled. */
  disabled?: boolean;
  /** Align using flexbox. */
  flex?: boolean;
  /** Decrease font size and padding. */
  small?: boolean;
};

function BaseAffix({
  cx,
  after,
  before,
  children,
  small,
  large,
  disabled,
  flex,
  styles,
}: BaseAffixProps & WithStylesProps) {
  return (
    <div
      className={cx(
        styles.affix,
        small && styles.affix_small,
        large && styles.affix_large,
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

BaseAffix.propTypes = {
  after: dirProp,
  before: dirProp,
  large: sizeProp,
  small: sizeProp,
};

export default BaseAffix;
