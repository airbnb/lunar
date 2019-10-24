import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconSend(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M3.671 20.4l17.45-7.48a1 1 0 000-1.84L3.671 3.6a.993.993 0 00-1.39.91l-.01 4.61c0 .5.37.93.87.99L17.271 12l-14.13 1.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
    </svg>
  );
}

export default withIcon('IconSend')(IconSend);
