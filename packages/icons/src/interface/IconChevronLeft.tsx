import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconChevronLeft(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M15 15.875l-3.88-3.88L15 8.115a.996.996 0 10-1.41-1.41L9 11.295a.996.996 0 000 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
    </svg>
  );
}

export default withIcon('IconChevronLeft')(IconChevronLeft);
