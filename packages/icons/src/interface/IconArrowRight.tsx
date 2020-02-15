import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconArrowRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M5.209 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42s1.02.39 1.41 0l6.59-6.59a.996.996 0 000-1.41l-6.58-6.6a.996.996 0 10-1.41 1.41l4.87 4.89H5.209c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

export default withIcon('IconArrowRight')(IconArrowRight);
