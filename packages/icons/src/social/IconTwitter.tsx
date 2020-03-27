import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconTwitter(props: Props) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 8A6 6 0 112 8a6 6 0 0112 0zm-2.982-.95c0 1.91-1.455 4.115-4.116 4.115a4.03 4.03 0 01-2.211-.654 2.908 2.908 0 002.142-.597 1.444 1.444 0 01-1.35-1.005 1.442 1.442 0 00.654-.024 1.448 1.448 0 01-1.161-1.419v-.018c.195.108.417.174.654.18A1.44 1.44 0 015.18 5.7a4.104 4.104 0 002.982 1.512 1.447 1.447 0 012.463-1.32 2.93 2.93 0 00.918-.35 1.446 1.446 0 01-.636.8c.294-.036.573-.114.831-.228a2.964 2.964 0 01-.723.75c.003.06.003.123.003.186z"
        fill="currentColor"
      />
    </svg>
  );
}

export default withIcon('IconTwitter')(IconTwitter);
