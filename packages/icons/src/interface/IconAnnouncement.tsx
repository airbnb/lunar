import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconAnnouncement(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 9c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2z" />
    </svg>
  );
}

export default withIcon('IconAnnouncement')(IconAnnouncement);
