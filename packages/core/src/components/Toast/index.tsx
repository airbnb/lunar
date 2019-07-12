import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { getErrorMessage } from '../ErrorMessage';
import IconButton from '../IconButton';
import Button from '../Button';
import Text from '../Text';
import T from '../Translate';
import Spacing from '../Spacing';
import crosstab from '../../crosstab';

const statusPropType = mutuallyExclusiveTrueProps('danger', 'success');

export type Props = {
  /** Use cross tab events to sync closes for the same toast id across tabs  */
  crosstabClose?: boolean;
  /** Dangerous/failure status (red). */
  danger?: boolean;
  /** Delay before showing the toast. */
  delay?: number;
  /** Duration to show the toast before auto-closing. */
  duration?: number;
  /** Unique ID of the toast. */
  id: string;
  /** Message or error to display in the toast. */
  message: string | Error;
  /** Callback fired when the toast is opened. */
  onOpen?: () => void;
  /** Callback fired when the toast is closed. */
  onClose?: () => void;
  /** Callback fired when the toast is removed via the close button. */
  onRemove?: (id: string) => void;
  /** Display a "refresh page" toast. */
  refresh?: boolean;
  /** Successful status (green). */
  success?: boolean;
  /** Title header. */
  title?: React.ReactNode;
};

/** Abstract component for displaying a toast message above the pages content. */
export class Toast extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    danger: statusPropType,
    success: statusPropType,
  };

  static defaultProps = {
    danger: false,
    delay: 250,
    duration: 10000,
    refresh: false,
    success: false,
    title: null,
  };

  hideTimer: number = 0;

  state = {
    visible: false,
  };

  componentDidMount() {
    const { delay = 0, duration = 0, crosstabClose } = this.props;

    window.setTimeout(this.showToast, delay);

    if (duration > 0) {
      this.hideTimer = window.setTimeout(this.handleClose, delay + duration);
    }

    if (crosstabClose) {
      crosstab.on(this.crosstabCloseEvent(), this.handleClose);
    }
  }

  componentWillUnmount() {
    crosstab.off(this.crosstabCloseEvent(), this.handleClose);
  }

  showToast = () => {
    this.setState({ visible: true }, () => {
      if (this.props.onOpen) {
        this.props.onOpen();
      }
    });
  };

  private handleClosePress = () => {
    this.handleClose();

    if (this.props.crosstabClose) {
      crosstab.emit(this.crosstabCloseEvent());
    }
  };

  private handleClose = () => {
    window.clearTimeout(this.hideTimer);

    this.setState({ visible: false }, () => {
      // Wait for the transition
      window.setTimeout(() => {
        if (this.props.onClose) {
          this.props.onClose();
        }

        if (this.props.onRemove) {
          this.props.onRemove(this.props.id);
        }
      }, 150);
    });
  };

  /* istanbul ignore next */
  private handleRefreshPress() {
    global.location.reload();
  }

  private crosstabCloseEvent() {
    return `toast:crosstabClose:${this.props.id}`;
  }

  render() {
    const { visible } = this.state;
    const { cx, styles, message, title, danger, success, refresh } = this.props;
    const isError = message instanceof Error;
    const failed = danger || isError;

    return (
      <div
        className={cx(
          styles.container,
          visible && styles.container_visible,
          failed && styles.container_danger,
          success && styles.container_success,
        )}
        role="status"
      >
        {refresh ? (
          <div>
            <Text bold inverted>
              {message}
            </Text>

            <Spacing top={0.5}>
              <Button small onClick={this.handleRefreshPress}>
                <T phrase="Refresh" context="Refresh the page that was triggerd by a toast" />
              </Button>
            </Spacing>
          </div>
        ) : (
          <div>
            {title && (
              <Text bold inverted>
                {title}
              </Text>
            )}

            <Text inverted>{isError ? getErrorMessage(message, true) : message}</Text>
          </div>
        )}

        <div className={cx(styles.right)}>
          <IconButton inverted onClick={this.handleClosePress}>
            <IconClose
              size="1.5em"
              accessibilityLabel={T.phrase('Close', {}, 'Close a toast popup')}
            />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default withStyles(({ color, ui, unit }) => ({
  container: {
    marginTop: unit * 1.5,
    padding: unit * 2,
    backgroundColor: color.core.neutral[6],
    boxShadow: ui.boxShadowLarge,
    willChange: 'transform, opacity',
    transform: 'translateY(-100%)',
    transition: 'transform .3s, opacity .3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0,
    lineHeight: 1,
    borderRadius: ui.borderRadius,
  },

  container_visible: {
    transform: 'translateY(0)',
    opacity: 1,
  },

  container_success: {
    backgroundColor: color.core.success[3],
  },

  container_danger: {
    backgroundColor: color.core.danger[3],
  },

  right: {
    textAlign: 'right',
    margin: -unit,
    marginLeft: unit,
  },
}))(Toast);
