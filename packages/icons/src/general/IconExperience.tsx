import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconExperience(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M20 6.5h-3v-2c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2v-11c0-1.11-.89-2-2-2zm-11-2h6v2H9zm11 15H4v-2h16zm0-5H4v-5c0-.55.45-1 1-1h2v1c0 .55.45 1 1 1s1-.45 1-1v-1h6v1c0 .55.45 1 1 1s1-.45 1-1v-1h2c.55 0 1 .45 1 1z" />
    </svg>
  );
}

export default withIcon('IconExperience')(IconExperience);
