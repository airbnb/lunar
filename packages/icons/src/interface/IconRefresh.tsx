import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconRefresh(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17.642 6.351a7.95 7.95 0 00-6.48-2.31c-3.67.37-6.69 3.35-7.1 7.02-.55 4.85 3.2 8.94 7.93 8.94a7.98 7.98 0 007.21-4.56c.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53a5.994 5.994 0 01-6.8 3.31c-2.22-.49-4.01-2.3-4.48-4.52a6.002 6.002 0 015.85-7.32c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71h3.59c.55 0 1-.45 1-1v-3.59c0-.89-1.08-1.34-1.71-.71z" />
    </svg>
  );
}

export default withIcon('IconRefresh')(IconRefresh);
