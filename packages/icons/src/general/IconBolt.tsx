import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconBolt(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M7.37 3.675v9c0 .55.45 1 1 1h2v7.15c0 .51.67.69.93.25l5.19-8.9a.995.995 0 00-.86-1.5h-2.26l2.49-6.65a.994.994 0 00-.93-1.35H8.37c-.55 0-1 .45-1 1z" />
    </svg>
  );
}

export default withIcon('IconBolt')(IconBolt);
