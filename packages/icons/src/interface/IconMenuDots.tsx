import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconMenuDots(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export default withIcon('IconMenuDots')(IconMenuDots);
