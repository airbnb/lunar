import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconThumbDown(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.048 21.248l5.53-5.54c.37-.37.58-.88.58-1.41v-9.99c0-1.1-.9-2-2-2h-8.99c-.8 0-1.52.48-1.83 1.21l-3.26 7.61c-.85 1.98.6 4.18 2.75 4.18h5.65l-.95 4.58c-.1.5.05 1.01.41 1.37.59.58 1.53.58 2.11-.01zm10.12-18.94c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2z" />
    </svg>
  );
}

export default withIcon('IconThumbDown')(IconThumbDown);
