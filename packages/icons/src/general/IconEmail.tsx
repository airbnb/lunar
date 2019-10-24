import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconEmail(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 11.9-1.44L12 11l6.7-4.19a.85.85 0 11.9 1.44z" />
    </svg>
  );
}

export default withIcon('IconEmail')(IconEmail);
