import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconMenu(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
    </svg>
  );
}

export default withIcon('IconMenu')(IconMenu);
