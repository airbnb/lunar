import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Pagination from './Pagination';
import T from './Translate';

storiesOf('Core/Pagination', module)
  .addParameters({
    inspectComponents: [Pagination],
  })
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
  .add('With label.', () => (
    <Pagination
      hasPrev
      hasNext
      pageLabel={T.phrase('Photo', {}, 'Label for photo pagination')}
      page={2}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('With no label.', () => (
    <Pagination
      hasPrev
      hasNext
      pageLabel=""
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
