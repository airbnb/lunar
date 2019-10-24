import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCaretDown(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8.706 11.414l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71h-5.18c-.89 0-1.33 1.08-.7 1.71z" />
    </svg>
  );
}

export default withIcon('IconCaretDown')(IconCaretDown);
