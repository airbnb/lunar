import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconFilter(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11 18h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1zm4 6h10c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1z" />
    </svg>
  );
}

export default withIcon('IconFilter')(IconFilter);
