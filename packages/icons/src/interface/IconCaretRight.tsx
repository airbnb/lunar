import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCaretRight(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.414 15.292l2.59-2.59a.996.996 0 000-1.41l-2.59-2.59c-.63-.62-1.71-.18-1.71.71v5.17c0 .9 1.08 1.34 1.71.71z" />
    </svg>
  );
}

export default withIcon('IconCaretRight')(IconCaretRight);
