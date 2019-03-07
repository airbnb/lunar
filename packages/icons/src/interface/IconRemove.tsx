import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconRemove(props: Props) {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z" />
    </svg>
  );
}

export default withIcon('IconRemove')(IconRemove);
