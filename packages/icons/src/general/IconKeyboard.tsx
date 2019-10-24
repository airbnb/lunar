import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconKeyboard(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-1 2H5v-2h2zm0-3H5V8h2zm8 7H9c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm1-4h-2v-2h2zm0-3h-2V8h2zm3 3h-2v-2h2zm0-3h-2V8h2z" />
    </svg>
  );
}

export default withIcon('IconKeyboard')(IconKeyboard);
