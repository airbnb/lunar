import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconInboxSolved(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M16.59 7.58L10 14.17 7.41 11.59 6 13 10 17 18 9z" />
    </svg>
  );
}

export default withIcon('IconInboxSolved')(IconInboxSolved);
