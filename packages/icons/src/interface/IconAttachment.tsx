import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconAttachment(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17.252 16H6.672c-2.09 0-3.95-1.53-4.15-3.61A3.998 3.998 0 016.502 8h12.36c1.31 0 2.5.94 2.63 2.24a2.5 2.5 0 01-2.49 2.76h-10.5c-.55 0-1-.45-1-1s.45-1 1-1h8.75c.41 0 .75-.34.75-.75s-.34-.75-.75-.75h-8.61c-1.31 0-2.5.94-2.63 2.24a2.5 2.5 0 002.49 2.76h10.33c2.09 0 3.95-1.53 4.15-3.61a3.993 3.993 0 00-3.98-4.39H6.732c-2.87 0-5.44 2.1-5.71 4.96a5.505 5.505 0 005.48 6.04h10.75c.41 0 .75-.34.75-.75s-.34-.75-.75-.75z" />
    </svg>
  );
}

export default withIcon('IconAttachment')(IconAttachment);
