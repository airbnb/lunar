import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconMap(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M14.655 4.98l-5-1.75c-.42-.15-.88-.15-1.3-.01l-3.99 1.34c-.81.28-1.36 1.04-1.36 1.9v11.85c0 1.41 1.41 2.37 2.72 1.86l2.93-1.14c.22-.09.47-.09.69-.01l5 1.75c.42.15.88.15 1.3.01l3.99-1.34c.81-.27 1.36-1.04 1.36-1.9V5.69c0-1.41-1.41-2.37-2.72-1.86l-2.93 1.14c-.22.08-.46.09-.69.01zm.35 13.91l-6-2.11V5.11l6 2.11z" />
    </svg>
  );
}

export default withIcon('IconMap')(IconMap);
