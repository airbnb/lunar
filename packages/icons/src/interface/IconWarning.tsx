import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconWarning(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4.47 20.504h15.06c1.54 0 2.5-1.67 1.73-3l-7.53-13.01c-.77-1.33-2.69-1.33-3.46 0l-7.53 13.01c-.77 1.33.19 3 1.73 3zm7.53-7c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2z" />
    </svg>
  );
}

export default withIcon('IconWarning')(IconWarning);
