import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconWallet(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M9.5 16V8a2 2 0 012-2h9V5c0-1.1-.9-2-2-2h-14a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-1h-9a2 2 0 01-2-2zm3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );
}

export default withIcon('IconWallet')(IconWallet);
