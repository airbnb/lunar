import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconFirst(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17.699 15.89L13.819 12l3.89-3.89a.996.996 0 10-1.41-1.41l-4.59 4.59a.996.996 0 000 1.41l4.59 4.59c.39.39 1.02.39 1.41 0a.993.993 0 00-.01-1.4zM6.999 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z" />
    </svg>
  );
}

export default withIcon('IconFirst')(IconFirst);
