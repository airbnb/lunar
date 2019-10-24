import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconNav(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12.925 4.126l6.15 14.99c.34.83-.51 1.66-1.33 1.29l-5.34-2.36c-.26-.11-.55-.11-.81 0l-5.34 2.36c-.82.36-1.67-.46-1.33-1.29l6.15-14.99c.33-.83 1.51-.83 1.85 0z" />
    </svg>
  );
}

export default withIcon('IconNav')(IconNav);
