import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconPlayAlt(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5v-7a.5.5 0 01.8-.4l4.67 3.5c.27.2.27.6 0 .8l-4.67 3.5a.5.5 0 01-.8-.4z" />
    </svg>
  );
}

export default withIcon('IconPlayAlt')(IconPlayAlt);
