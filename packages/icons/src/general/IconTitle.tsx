import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconTitle(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M5 4v3h5.5v12h3V7H19V4z" />
    </svg>
  );
}

export default withIcon('IconTitle')(IconTitle);
