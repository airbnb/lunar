import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconLock(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18 8.5h-1v-2c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3-9v-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2z" />
    </svg>
  );
}

export default withIcon('IconLock')(IconLock);
