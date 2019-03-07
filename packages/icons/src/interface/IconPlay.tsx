import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconPlay(props: Props) {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M6.928 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69l-8.14-5.17a.998.998 0 0 0-1.54.84z" />
    </svg>
  );
}

export default withIcon('IconPlay')(IconPlay);
