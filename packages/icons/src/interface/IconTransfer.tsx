import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconTransfer(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12.204 8.004v-1.59c0-.89 1.08-1.34 1.71-.71l5.59 5.59c.39.39.39 1.02 0 1.41l-5.59 5.59c-.63.63-1.71.19-1.71-.7v-1.59h-7c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1z" />
    </svg>
  );
}

export default withIcon('IconTransfer')(IconTransfer);
