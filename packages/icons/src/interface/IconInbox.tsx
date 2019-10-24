import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconInbox(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M19 3H4.99c-1.11 0-1.98.89-1.98 2L3 19c0 1.1.88 2 1.99 2H19c1.1 0 2-.9 2-2V5a2 2 0 00-2-2zm0 12h-3.13c-.47 0-.85.34-.98.8-.35 1.27-1.52 2.2-2.89 2.2s-2.54-.93-2.89-2.2c-.13-.46-.51-.8-.98-.8H5V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1z" />
    </svg>
  );
}

export default withIcon('IconInbox')(IconInbox);
