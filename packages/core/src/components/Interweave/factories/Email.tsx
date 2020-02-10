import React from 'react';
import { EmailProps as BaseEmailProps } from 'interweave-autolink';
import Link from '../../Link';

export type EmailProps = BaseEmailProps & {
  /** Render using large prop on the Link component. */
  large?: boolean;
  /** Render using small prop on the Link component. */
  small?: boolean;
};

export default function Email({
  children,
  email,
  large = false,
  newWindow,
  small = false,
}: EmailProps) {
  return (
    <Link baseline href={`mailto:${email}`} openInNewWindow={newWindow} small={small} large={large}>
      {children}
    </Link>
  );
}
