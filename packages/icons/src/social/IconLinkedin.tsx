import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconLinkedIn(props: Props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 4.29C3 3.576 3.596 3 4.33 3h15.34c.734 0 1.33.577 1.33 1.29v15.42c0 .713-.596 1.29-1.33 1.29H4.33C3.596 21 3 20.423 3 19.71V4.29zm5.456 13.777V9.94H5.738v8.128h2.718zM7.097 8.83c.948 0 1.538-.625 1.538-1.404-.018-.798-.59-1.405-1.52-1.405s-1.538.607-1.538 1.405c0 .78.59 1.404 1.502 1.404h.018zm5.582 9.237H9.961s.035-7.365 0-8.128h2.719v1.151l-.019.028h.019v-.028c.36-.554 1.007-1.341 2.45-1.341 1.788 0 3.13 1.161 3.13 3.658v4.66H15.54V13.72c0-1.093-.393-1.838-1.377-1.838-.751 0-1.199.503-1.395.988-.072.174-.09.416-.09.66v4.538z"
      />
    </svg>
  );
}

export default withIcon('IconLinkedIn')(IconLinkedIn);
