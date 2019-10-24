import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconMapPin(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2.265c-3.87 0-7 3.13-7 7 0 4.17 4.42 9.92 6.24 12.11.4.48 1.13.48 1.53 0 1.81-2.19 6.23-7.94 6.23-12.11 0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

export default withIcon('IconMapPin')(IconMapPin);
