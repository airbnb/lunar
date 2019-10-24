import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconVideo(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l2.29 2.29c.63.63 1.71.18 1.71-.71V8.91c0-.89-1.08-1.34-1.71-.71z" />
    </svg>
  );
}

export default withIcon('IconVideo')(IconVideo);
