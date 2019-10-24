import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconAudio(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 5v8.55c-.94-.54-2.1-.75-3.33-.32-1.34.48-2.37 1.67-2.61 3.07a4.007 4.007 0 004.59 4.65c1.96-.31 3.35-2.11 3.35-4.1V7h2c1.1 0 2-.9 2-2s-.9-2-2-2h-2c-1.1 0-2 .9-2 2z" />
    </svg>
  );
}

export default withIcon('IconAudio')(IconAudio);
