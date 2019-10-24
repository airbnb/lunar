import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconFlag(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M13.9 5.5l-.24-1.2c-.09-.46-.5-.8-.98-.8H5.5c-.55 0-1 .45-1 1v15c0 .55.45 1 1 1s1-.45 1-1v-6h5.6l.24 1.2c.09.47.5.8.98.8h5.18c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1z" />
    </svg>
  );
}

export default withIcon('IconFlag')(IconFlag);
