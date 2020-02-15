import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconViewList(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" />
    </svg>
  );
}

export default withIcon('IconViewList')(IconViewList);
