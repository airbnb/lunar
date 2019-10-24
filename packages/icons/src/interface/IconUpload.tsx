import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconUpload(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M10 16.296h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71l-4.59-4.59a.996.996 0 00-1.41 0l-4.59 4.59c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1zm-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1z" />
    </svg>
  );
}

export default withIcon('IconUpload')(IconUpload);
