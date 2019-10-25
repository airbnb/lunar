import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCaretLeft(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12.586 8.706l-2.59 2.59a.996.996 0 000 1.41l2.59 2.59c.63.63 1.71.18 1.71-.71v-5.18c0-.89-1.08-1.33-1.71-.7z" />
    </svg>
  );
}

export default withIcon('IconCaretLeft')(IconCaretLeft);
