import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconHelp(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5a3.997 3.997 0 011.17-2.83l1.24-1.26c.46-.44.68-1.1.55-1.8a1.99 1.99 0 00-1.39-1.53c-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C8.4 9 8 8.44 8.16 7.88a4.008 4.008 0 013.23-2.83c1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4z" />
    </svg>
  );
}

export default withIcon('IconHelp')(IconHelp);
