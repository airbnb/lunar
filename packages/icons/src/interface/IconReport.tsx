import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconReport(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M15.325 3h-6.64c-.26 0-.52.11-.7.29l-4.69 4.69c-.18.18-.29.44-.29.7v6.63c0 .27.11.52.29.71l4.68 4.68c.19.19.45.3.71.3h6.63c.27 0 .52-.11.71-.29l4.68-4.68a.99.99 0 00.29-.71V8.68c0-.27-.11-.52-.29-.71l-4.68-4.68c-.18-.18-.44-.29-.7-.29zm-3.32 14.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm0-4.3c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1z" />
    </svg>
  );
}

export default withIcon('IconReport')(IconReport);
