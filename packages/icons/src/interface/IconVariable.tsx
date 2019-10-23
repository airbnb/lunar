import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconVariable(props: Props) {
  return (
    <svg {...props} viewBox="0 0 24 24">
      <path d="M2.028 12.718a9.991 9.991 0 0110.69-10.69c5.29.36 9.28 4.98 9.28 10.29v1.09c0 1.44-.82 2.81-2.16 3.34-1.63.65-3.41.01-4.3-1.21-1.15 1.17-2.9 1.76-4.74 1.33a4.997 4.997 0 01-3.72-3.94 5.007 5.007 0 015.66-5.87c2.48.35 4.26 2.61 4.26 5.12v1.25c0 .79.71 1.57 1.5 1.57s1.5-.78 1.5-1.57v-1.1c0-3.73-2.42-7.15-6.04-8.07-5.8-1.5-11.2 3.91-9.71 9.71.93 3.61 4.35 6.03 8.08 6.03h3.67c.55 0 1 .45 1 1a1.001 1.001 0 01-1 1h-3.69c-5.3 0-9.92-3.99-10.28-9.28zm6.97-.72c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z" />
    </svg>
  );
}

export default withIcon('IconVariable')(IconVariable);
