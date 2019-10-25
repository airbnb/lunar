import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCamera(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 10a3 3 0 100 6 3 3 0 000-6zm8-5h-3.17l-1.24-1.35A1.99 1.99 0 0014.12 3H9.88c-.56 0-1.1.24-1.48.65L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </svg>
  );
}

export default withIcon('IconCamera')(IconCamera);
