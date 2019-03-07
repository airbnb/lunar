import React from 'react';
import { UrlProps } from 'interweave-autolink';
import Link from '../../Link';

export type Props = UrlProps & {
  /** Render using large prop on the Link component. */
  large?: boolean;
  /** Render using small prop on the Link component. */
  small?: boolean;
};

export default class Url extends React.PureComponent<Props> {
  static defaultProps = {
    href: '',
    large: false,
    newWindow: false,
    small: false,
  };

  render() {
    const { children, href, large, newWindow, small } = this.props;
    let url = href || children || '';

    if (!url.match(/^https?:\/\//)) {
      url = `http://${url}`;
    }

    return (
      <Link baseline href={url} openInNewWindow={newWindow} small={small} large={large}>
        {children}
      </Link>
    );
  }
}
