/* eslint-disable prefer-destructuring */
import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import IconFlag from '@airbnb/lunar-icons/lib/interface/IconFlag';
import IconCheckAlt from '@airbnb/lunar-icons/lib/interface/IconCheckAlt';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import IconError from '@airbnb/lunar-icons/lib/interface/IconError';
import IconInfo from '@airbnb/lunar-icons/lib/interface/IconInfo';
import IconWarning from '@airbnb/lunar-icons/lib/interface/IconWarning';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';
import Row from '../Row';
import Spacing from '../Spacing';
import Text from '../Text';
import T from '../Translate';
import IconButton from '../IconButton';
import { STATUSES } from '../../constants';
import { styleSheet } from './styles';

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
function Alert({
  children,
  danger,
  hideStatusIcon,
  info,
  inline,
  notice,
  success,
  title,
  warning,
  onClose,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);
  const { color, unit } = useTheme();

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
                accessibilityLabel={T.phrase('lunar.common.close', 'Close')}
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

Alert.propTypes = {
  danger: alertColorTypePropType,
  info: alertColorTypePropType,
  notice: alertColorTypePropType,
  success: alertColorTypePropType,
  warning: alertColorTypePropType,
};

export default Alert;
