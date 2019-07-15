import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconSnooze(props: Props) {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M17.093 8.262l3.904.015L20.683 10H14l.253-1.412 4.616-4.843-3.636-.015.313-1.73H22l-.245 1.368-4.662 4.894z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.748 14a8 8 0 1 1-8.719-9.942l.314-2.037C6.126 2.36 2 6.698 2 12.001c0 5.522 4.477 10 10 10 4.838 0 8.873-3.436 9.8-8h-2.052z"
      />
    </svg>
  );
}

export default withIcon('IconSnooze')(IconSnooze);
