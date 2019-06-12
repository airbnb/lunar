import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Text, { Props as TextProps } from '../Text';
import { STATUSES } from '../../constants';

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

export type Props = TextProps & {
  /** The text to render. */
  children: NonNullable<React.ReactNode>;
  /** Dangerous/failure status (red). */
  danger?: boolean;
  /** Informational status (blue). */
  info?: boolean;
  /** Muted/disabled status (gray). */
  muted?: boolean;
  /** Notice status. */
  notice?: boolean;
  /** Successful status (green). */
  success?: boolean;
  /** Warning status (yellow). */
  warning?: boolean;
};

/** Display a string of classified text with colorful statuses. */
export class StatusText extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    danger: statusPropType,
    info: statusPropType,
    muted: statusPropType,
    notice: statusPropType,
    success: statusPropType,
    warning: statusPropType,
  };

  static defaultProps = {
    danger: false,
    info: false,
    muted: false,
    notice: false,
    success: false,
    warning: false,
  };

  render() {
    const {
      cx,
      children,
      danger,
      info,
      muted,
      notice,
      styles,
      success,
      warning,
      ...restProps
    } = this.props;

    return (
      <Text {...restProps}>
        <span
          className={cx(
            danger && styles.text_danger,
            info && styles.text_info,
            muted && styles.text_muted,
            notice && styles.text_notice,
            success && styles.text_success,
            warning && styles.text_warning,
          )}
        >
          {children}
        </span>
      </Text>
    );
  }
}

export default withStyles(({ color }) => ({
  text_danger: {
    color: color.core.danger[4],
  },

  text_info: {
    color: color.core.primary[4],
  },

  text_muted: {
    color: color.muted,
  },

  text_notice: {
    color: color.core.secondary[4],
  },

  text_success: {
    color: color.core.success[4],
  },

  text_warning: {
    color: color.core.warning[5],
  },
}))(StatusText);
