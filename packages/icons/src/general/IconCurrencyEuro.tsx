import React from 'react';
import withIcon, { Props } from '../withIcon';

function IconCurrencyEuro(props: Props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M15.322 18.5a6.48 6.48 0 01-5.76-3.5h4.76c.55 0 1-.45 1-1s-.45-1-1-1h-5.42c-.05-.33-.08-.66-.08-1s.03-.67.08-1h5.42c.55 0 1-.45 1-1s-.45-1-1-1h-4.76a6.491 6.491 0 015.76-3.5c1.25 0 2.42.36 3.42.97.5.31 1.15.26 1.57-.16.58-.58.45-1.53-.25-1.96A9.034 9.034 0 0015.322 3c-3.92 0-7.24 2.51-8.48 6h-2.52c-.55 0-1 .45-1 1s.45 1 1 1h2.06a8.262 8.262 0 000 2h-2.06c-.55 0-1 .45-1 1s.45 1 1 1h2.52c1.24 3.49 4.56 6 8.48 6 1.74 0 3.36-.49 4.74-1.35.69-.43.82-1.39.24-1.97-.42-.42-1.07-.47-1.57-.15-.99.62-2.15.97-3.41.97z" />
    </svg>
  );
}

export default withIcon('IconCurrencyEuro')(IconCurrencyEuro);
