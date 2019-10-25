import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconThumbUp(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12.949 2.752l-5.54 5.54c-.37.37-.58.88-.58 1.41v9.99c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61c.84-1.98-.61-4.18-2.76-4.18h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01zm-10.12 18.94c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2z" />
    </svg>
  );
}

export default withIcon('IconThumbUp')(IconThumbUp);
