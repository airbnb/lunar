import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconTwitter(props: Props) {
  return (
    <svg viewBox="0 0 16 16" {...props}>
      <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" fill="currentColor" />
      <path
        d="M6.902 11.165c2.661 0 4.116-2.205 4.116-4.116 0-.063 0-.126-.003-.186.282-.204.528-.459.723-.75a2.936 2.936 0 01-.831.228c.3-.18.528-.462.636-.8a2.93 2.93 0 01-.918.35 1.447 1.447 0 00-2.463 1.32A4.104 4.104 0 015.18 5.7a1.44 1.44 0 00.45 1.929 1.421 1.421 0 01-.654-.18v.018c0 .702.498 1.284 1.161 1.42a1.442 1.442 0 01-.654.023c.183.576.717.993 1.35 1.005a2.908 2.908 0 01-2.142.597 4.03 4.03 0 002.211.654z"
        fill="#fff"
      />
    </svg>
  );
}

export default withIcon('IconTwitter')(IconTwitter);
