import React from 'react';
import { UrlProps } from 'interweave-autolink';
import Link from '../../Link';

export type Props = UrlProps & {
  /** Render using large prop on the Link component. */
  large?: boolean;
  /** Render using small prop on the Link component. */
  small?: boolean;
};

export default function Url({
  children,
  href,
  large = false,
  newWindow,
  small = false,
  url,
}: Props) {
  let nextUrl = href || url || '';

  if (!url.match(/^https?:\/\//)) {
    nextUrl = `http://${url}`;
  }

  return (
    <Link baseline href={nextUrl} openInNewWindow={newWindow} small={small} large={large}>
      {children}
    </Link>
  );
}
