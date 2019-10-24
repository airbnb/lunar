import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconChevronRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M9 15.875l3.88-3.88L9 8.115a.996.996 0 111.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.59a.996.996 0 01-1.41 0c-.38-.39-.39-1.03 0-1.42z" />
    </svg>
  );
}

export default withIcon('IconChevronRight')(IconChevronRight);
