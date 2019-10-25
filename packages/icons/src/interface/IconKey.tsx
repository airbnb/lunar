import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconKey(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12.65 10.001a5.998 5.998 0 00-6.88-3.88c-2.29.46-4.15 2.29-4.63 4.58a6.006 6.006 0 005.86 7.3 5.99 5.99 0 005.65-4H17v2c0 1.1.9 2 2 2s2-.9 2-2v-2c1.1 0 2-.9 2-2s-.9-2-2-2zm-5.65 4c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  );
}

export default withIcon('IconKey')(IconKey);
