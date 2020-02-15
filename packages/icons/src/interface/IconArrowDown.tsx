import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconArrowDown(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.005 5.209v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0s-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 10-1.41-1.41l-4.88 4.88V5.209c0-.55-.45-1-1-1s-1 .45-1 1z" />
    </svg>
  );
}

export default withIcon('IconArrowDown')(IconArrowDown);
