import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconLast(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M6.291 8.11l3.89 3.89-3.89 3.89a.996.996 0 101.41 1.41l4.59-4.59a.996.996 0 000-1.41l-4.59-4.6a.996.996 0 00-1.41 0c-.38.39-.38 1.03 0 1.41zM17.001 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1z" />
    </svg>
  );
}

export default withIcon('IconLast')(IconLast);
