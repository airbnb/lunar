import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconHome(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M9.998 19.328v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87l-8.36-7.53c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87h1.7v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
    </svg>
  );
}

export default withIcon('IconHome')(IconHome);
