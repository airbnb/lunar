import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconGrid(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z" />
    </svg>
  );
}

export default withIcon('IconGrid')(IconGrid);
