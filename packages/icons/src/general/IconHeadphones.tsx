import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconHeadphones(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.4 2.52C6.62 2.83 3 7.02 3 11.81v6.69c0 1.66 1.34 3 3 3h1c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2H5v-1.71c0-3.84 2.96-7.18 6.79-7.29a6.999 6.999 0 017.21 7v2h-2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h1c1.66 0 3-1.34 3-3v-7c0-5.17-4.36-9.32-9.6-8.98z" />
    </svg>
  );
}

export default withIcon('IconHeadphones')(IconHeadphones);
