import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCheck(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8.795 15.875l-3.47-3.47a.996.996 0 10-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0l10.58-10.58a.996.996 0 10-1.41-1.41z" />
    </svg>
  );
}

export default withIcon('IconCheck')(IconCheck);
