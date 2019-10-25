import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconArrowLeft(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18.791 11.005H7.621l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 00-1.41 0l-6.59 6.59a.996.996 0 000 1.41l6.59 6.59a.996.996 0 101.41-1.41l-4.88-4.88h11.17c.55 0 1-.45 1-1s-.45-1-1-1z" />
    </svg>
  );
}

export default withIcon('IconArrowLeft')(IconArrowLeft);
