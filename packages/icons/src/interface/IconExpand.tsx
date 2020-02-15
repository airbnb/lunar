import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconExpand(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 5.83l2.46 2.46a.996.996 0 101.41-1.41L12.7 3.7a.996.996 0 00-1.41 0L8.12 6.88a.996.996 0 101.41 1.41zm0 12.34l-2.46-2.46a.996.996 0 10-1.41 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.17a.996.996 0 10-1.41-1.41z" />
    </svg>
  );
}

export default withIcon('IconExpand')(IconExpand);
