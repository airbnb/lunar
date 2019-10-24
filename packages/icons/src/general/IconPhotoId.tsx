import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconPhotoId(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18 7.01h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zm3-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.1-.9-2-2-2zm-1 16.01H4c-.55 0-1-.45-1-1V5.99c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12.03c0 .55-.45 1-1 1z" />
    </svg>
  );
}

export default withIcon('IconPhotoId')(IconPhotoId);
