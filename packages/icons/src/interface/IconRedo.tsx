import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconRedo(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18.429 10.6c-1.85-1.61-4.25-2.6-6.9-2.6-4.16 0-7.74 2.42-9.44 5.93-.32.67.04 1.47.75 1.71.59.2 1.23-.08 1.5-.64 1.3-2.66 4.03-4.5 7.19-4.5 1.95 0 3.73.72 5.12 1.88l-1.91 1.91c-.63.63-.19 1.71.7 1.71h5.59c.55 0 1-.45 1-1V9.41c0-.89-1.08-1.34-1.71-.71z" />
    </svg>
  );
}

export default withIcon('IconRedo')(IconRedo);
