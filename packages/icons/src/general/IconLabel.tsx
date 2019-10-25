import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconLabel(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M17.241 5.84c-.36-.51-.96-.84-1.63-.84l-11 .01c-1.1 0-2 .89-2 1.99v10c0 1.1.9 1.99 2 1.99l11 .01c.67 0 1.27-.33 1.63-.84l3.96-5.58a.99.99 0 000-1.16z" />
    </svg>
  );
}

export default withIcon('IconLabel')(IconLabel);
