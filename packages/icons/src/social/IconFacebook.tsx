import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconFacebook(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.993 3h16.014a.993.993 0 01.993.993v16.014a.993.993 0 01-.993.993h-4.593v-6.96h2.35v-.004h.015l.35-2.725h-2.7V9.576c0-.649.15-1.125.833-1.273.143-.03.31-.046.502-.046h1.443V5.824a19.925 19.925 0 00-2.092-.105 4.91 4.91 0 00-.26.006c-1.897.1-3.184 1.309-3.233 3.456a5.433 5.433 0 00-.001.128v2.005h-2.343v2.725h2.343V21H3.993A.993.993 0 013 20.007V3.993A.993.993 0 013.993 3z"
      />
    </svg>
  );
}

export default withIcon('IconFacebook')(IconFacebook);
