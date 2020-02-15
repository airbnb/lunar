import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconStarAlt(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.23 15.39L12 15.45l-3.22 1.94a.502.502 0 01-.75-.54l.85-3.66-2.83-2.45a.505.505 0 01.29-.88l3.74-.32 1.46-3.45c.17-.41.75-.41.92 0l1.46 3.44 3.74.32a.5.5 0 01.28.88l-2.83 2.45.85 3.67c.1.43-.36.77-.74.54z" />
    </svg>
  );
}

export default withIcon('IconStarAlt')(IconStarAlt);
