import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconPause(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" />
    </svg>
  );
}

export default withIcon('IconPause')(IconPause);
