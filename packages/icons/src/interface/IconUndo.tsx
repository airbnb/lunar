import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconUndo(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12.466 8c-2.65 0-5.05.99-6.9 2.6l-1.89-1.89c-.63-.63-1.71-.19-1.71.7V15c0 .55.45 1 1 1h5.59c.89 0 1.34-1.08.71-1.71l-1.91-1.91c1.39-1.16 3.16-1.88 5.12-1.88 3.16 0 5.89 1.84 7.19 4.5.27.56.91.84 1.5.64.71-.23 1.07-1.04.75-1.72-1.72-3.5-5.3-5.92-9.45-5.92z" />
    </svg>
  );
}

export default withIcon('IconUndo')(IconUndo);
