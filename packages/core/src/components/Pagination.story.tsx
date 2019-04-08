import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pagination from './Pagination';

storiesOf('Core/Pagination', module)
  .add('No previous or next pages.', () => (
    <Pagination page={1} onNext={action('onNext')} onPrevious={action('onPrevious')} />
  ))
  .add('Next pages.', () => (
    <Pagination hasNext page={1} onNext={action('onNext')} onPrevious={action('onPrevious')} />
  ))
  .add('Previous pages.', () => (
    <Pagination hasPrev page={2} onNext={action('onNext')} onPrevious={action('onPrevious')} />
  ))
  .add('Both next and pages.', () => (
    <Pagination
      hasPrev
      hasNext
      page={2}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Bookends, first page.', () => (
    <Pagination
      hasNext
      showBookends
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
      page={1}
      pageCount={3}
    />
  ))
  .add('Bookends, last page.', () => (
    <Pagination
      hasPrev
      showBookends
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
      page={3}
      pageCount={3}
    />
  ))
  .add('Bookends, middle page.', () => (
    <Pagination
      hasNext
      hasPrev
      showBookends
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
      page={2}
      pageCount={3}
    />
  ));
