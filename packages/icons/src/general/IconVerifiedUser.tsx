import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconVerifiedUser(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M11.19 1.266l-7 3.11C3.47 4.696 3 5.416 3 6.206v4.7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12v-4.7c0-.79-.47-1.51-1.19-1.83l-7-3.11c-.51-.23-1.11-.23-1.62 0zm-1.9 14.93l-2.59-2.59a.996.996 0 111.41-1.41l1.89 1.88 5.88-5.88a.996.996 0 111.41 1.41l-6.59 6.59a.996.996 0 01-1.41 0z" />
    </svg>
  );
}

export default withIcon('IconVerifiedUser')(IconVerifiedUser);
