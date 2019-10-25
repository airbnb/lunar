import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconBookmark(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export default withIcon('IconBookmark')(IconBookmark);
