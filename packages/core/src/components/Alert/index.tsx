/* eslint-disable prefer-destructuring */

import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import IconFlag from '@airbnb/lunar-icons/lib/interface/IconFlag';
import IconCheckAlt from '@airbnb/lunar-icons/lib/interface/IconCheckAlt';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import IconError from '@airbnb/lunar-icons/lib/interface/IconError';
import IconInfo from '@airbnb/lunar-icons/lib/interface/IconInfo';
import IconWarning from '@airbnb/lunar-icons/lib/interface/IconWarning';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';
import T from '../Translate';
import IconButton from '../IconButton';
import { STATUSES } from '../../constants';

const alertColorTypePropType = mutuallyExclusiveTrueProps(...STATUSES);

export type Props = {
  /** Content within the label. */
  children?: React.ReactNode;
  /** Dangerous/failure status (red). */
  danger?: boolean;
  /** Whether to hide the corresponding status icon. */
  hideStatusIcon?: boolean;
  /** Informational status (blue). */
  info?: boolean;
  /** Display the alert as inline. */
  inline?: boolean;
  /** Notice status. */
  notice?: boolean;
  /** Successful status (green). */
  success?: boolean;
  /** The title of the alert, bold text at the top of the box. */
  title: NonNullable<React.ReactNode>;
  /** Warning status (yellow). */
  warning?: boolean;
  /** Callback fired when the alert is closed. */
  onClose?: () => void;
};

/** Classify content through the use of colorful alerts. */
export class Alert extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    danger: alertColorTypePropType,
    info: alertColorTypePropType,
    notice: alertColorTypePropType,
    success: alertColorTypePropType,
    warning: alertColorTypePropType,
  };

  static defaultProps = {
    children: null,
    danger: false,
    hideStatusIcon: false,
    info: false,
    inline: false,
    notice: false,
    success: false,
    warning: false,
  };

  render() {
    const {
      cx,
      children,
      danger,
      hideStatusIcon,
      info,
      inline,
      notice,
      styles,
      success,
      theme,
      title,
      warning,
      onClose,
    } = this.props;
    const { color, unit } = theme!;
    let StatusIcon = null;
    let iconColor = color.accent.text;

    if (danger) {
      StatusIcon = IconError;
      iconColor = color.core.danger[3];
    } else if (info) {
      StatusIcon = IconInfo;
      iconColor = color.core.primary[3];
    } else if (notice) {
      StatusIcon = IconFlag;
      iconColor = color.core.secondary[3];
    } else if (success) {
      StatusIcon = IconCheckAlt;
      iconColor = color.core.success[3];
    } else if (warning) {
      StatusIcon = IconWarning;
      iconColor = color.core.warning[3];
    }

    return (
      <div
        className={cx(
          styles.alert,
          inline && styles.alert_inline,
          !hideStatusIcon && !!StatusIcon && styles.alert_statusIcon,
          danger && styles.alert_danger,
          info && styles.alert_info,
          notice && styles.alert_notice,
          success && styles.alert_success,
          warning && styles.alert_warning,
        )}
      >
        <Row
          middleAlign={!children}
          after={
            onClose && (
              <IconButton onClick={onClose}>
                <IconClose
                  accessibilityLabel={T.phrase(
                    'Close',
                    {},
                    { context: 'Close the alert', key: 'lunar.common.close' },
                  )}
                  size={unit * 3}
                />
              </IconButton>
            )
          }
          before={
            !hideStatusIcon &&
            StatusIcon && <StatusIcon decorative color={iconColor} size={unit * 3} />
          }
        >
          <Text bold>{title}</Text>

          {children && (
            <Spacing top={1}>
              <Text>{children}</Text>
            </Spacing>
          )}
        </Row>
      </div>
    );
  }
}

export default withStyles(
  ({ color, unit, pattern }) => ({
    alert: {
      ...pattern.box,
      display: 'block',
      alignItems: 'start',
      position: 'relative',
      borderColor: color.core.neutral[1],
      backgroundColor: color.accent.bg,
      overflow: 'hidden',
      padding: unit * 3,
      wordBreak: 'break-word',

      ':before': {
        content: '" "',
        backgroundColor: color.accent.text,
        position: 'absolute',
        top: 0,
        left: 0,
        width: unit / 2,
        height: '100%',
      },
    },

    alert_inline: {
      display: 'inline-block',
    },

    alert_danger: {
      ':before': {
        backgroundColor: color.core.danger[3],
      },
    },

    alert_info: {
      ':before': {
        backgroundColor: color.core.primary[3],
      },
    },

    alert_notice: {
      ':before': {
        backgroundColor: color.core.secondary[3],
      },
    },

    alert_success: {
      ':before': {
        backgroundColor: color.core.success[3],
      },
    },

    alert_warning: {
      ':before': {
        backgroundColor: color.core.warning[3],
      },
    },

    alert_statusIcon: {
      paddingLeft: unit * 2.5,
    },
  }),
  {
    passThemeProp: true,
  },
)(Alert);
