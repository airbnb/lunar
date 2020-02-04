import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconReturn(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z" />
    </svg>
  );
}

export default withIcon('IconReturn')(IconReturn);
