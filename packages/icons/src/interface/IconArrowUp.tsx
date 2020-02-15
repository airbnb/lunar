import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconArrowUp(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M13 18.791V7.621l4.88 4.88c.39.39 1.03.39 1.42 0s.39-1.02 0-1.41l-6.59-6.59a.996.996 0 00-1.41 0l-6.6 6.58a.996.996 0 101.41 1.41L11 7.621v11.17c0 .55.45 1 1 1s1-.45 1-1z" />
    </svg>
  );
}

export default withIcon('IconArrowUp')(IconArrowUp);
