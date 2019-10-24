import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconIphone(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M16 1H8a2.5 2.5 0 00-2.5 2.5v17A2.5 2.5 0 008 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0016 1zm-4 21c-.83 0-1.5-.67-1.5-1.5S11.17 19 12 19s1.5.67 1.5 1.5S12.83 22 12 22zm4.5-4h-9V4h9z" />
    </svg>
  );
}

export default withIcon('IconIphone')(IconIphone);
