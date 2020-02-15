import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCopy(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M15.5 1h-11c-1.1 0-2 .9-2 2v13c0 .55.45 1 1 1s1-.45 1-1V4c0-.55.45-1 1-1h10c.55 0 1-.45 1-1s-.45-1-1-1zm4 4h-11c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-1 16h-9c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z" />
    </svg>
  );
}

export default withIcon('IconCopy')(IconCopy);
