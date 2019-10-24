import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconStop(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z" />
    </svg>
  );
}

export default withIcon('IconStop')(IconStop);
