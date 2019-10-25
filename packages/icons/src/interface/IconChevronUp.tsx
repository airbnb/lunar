import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconChevronUp(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M8.125 15l3.88-3.88 3.88 3.88a.996.996 0 101.41-1.41L12.705 9a.996.996 0 00-1.41 0l-4.59 4.59a.996.996 0 000 1.41c.39.38 1.03.39 1.42 0z" />
    </svg>
  );
}

export default withIcon('IconChevronUp')(IconChevronUp);
