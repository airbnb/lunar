import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconPauseAlt(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1z" />
    </svg>
  );
}

export default withIcon('IconPauseAlt')(IconPauseAlt);
