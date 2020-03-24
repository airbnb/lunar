import React from 'react';

export type BrowserNotificationProps = {
  /** Title of the notification. */
  title: string;
  /** Unique ID. */
  tag?: string;
  /** Content of the notification. */
  body?: string;
  /** URL of an image. */
  icon?: string;
  /** Timeout in which to automatically close the notificaiton. */
  timeout?: number;
  /** Callback fired when the notification is clicked. */
  onClick?: () => void;
};

/** Display a browser notification through a declarative component. */
export default class BrowserNotification extends React.PureComponent<BrowserNotificationProps> {
  static defaultProps = {
    onClick: null,
    timeout: null,
  };

  closeTimeout?: number;

  notification: Notification | null = null;

  componentDidMount() {
    this.showNotification();
  }

  componentDidUpdate() {
    this.showNotification();
  }

  componentWillUnmount() {
    if (this.closeTimeout) {
      window.clearTimeout(this.closeTimeout);
    }

    if (this.notification) {
      this.notification.close();
    }
  }

  showNotification() {
    if (typeof Notification === 'undefined') {
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const { title, tag, body, icon, timeout, onClick } = this.props;

        this.notification = new Notification(title, {
          tag,
          body,
          icon,
        });

        if (onClick) {
          this.notification.addEventListener('click', onClick);
        }

        if (timeout) {
          this.closeTimeout = window.setTimeout(() => {
            this.closeTimeout = 0;

            if (this.notification) {
              this.notification.close();
              this.notification = null;
            }
          }, timeout);
        }
      }

      /* istanbul ignore next */
      if (__DEV__ && permission !== 'granted') {
        // eslint-disable-next-line no-console
        console.warn('Attempted to show a notification, but was denied permission.');
      }
    });
  }

  render() {
    return null;
  }
}
