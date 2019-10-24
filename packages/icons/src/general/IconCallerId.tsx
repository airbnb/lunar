import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCallerId(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM8 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H2v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1zm3.85-4h1.39c.16 0 .3.07.4.2l1.1 1.45c.15.2.13.48-.05.65l-1.36 1.36c-.18.18-.48.2-.67.04a7.557 7.557 0 01-2.38-3.71 7.248 7.248 0 010-3.99 7.513 7.513 0 012.38-3.71c.2-.17.49-.14.67.04l1.36 1.36c.18.18.2.46.05.65l-1.1 1.45a.48.48 0 01-.4.2h-1.39c-.22.63-.35 1.3-.35 2s.13 1.38.35 2.01z" />
    </svg>
  );
}

export default withIcon('IconCallerId')(IconCallerId);
