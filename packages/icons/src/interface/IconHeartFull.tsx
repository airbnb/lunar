import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconHeartFull(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M13.35 20.307c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.447 1.87 12.337 2 8.457c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76z" />
    </svg>
  );
}

export default withIcon('IconHeartFull')(IconHeartFull);
