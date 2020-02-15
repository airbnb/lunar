import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconPhone(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M19.222 15.268l-2.54-.29a1.99 1.99 0 00-1.64.57l-1.84 1.84a15.045 15.045 0 01-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 00-1.99-1.77h-1.73c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
    </svg>
  );
}

export default withIcon('IconPhone')(IconPhone);
