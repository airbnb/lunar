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
      showBookends
      page={2}
      pageLabel=""
      pageCount={3}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Bookends, first page.', () => (
    <Pagination
      hasNext
      showBookends
      page={1}
      pageCount={3}
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Bookends, last page.', () => (
    <Pagination
      hasPrev
      showBookends
      page={3}
      pageCount={3}
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Bookends, middle page.', () => (
    <Pagination
      hasNext
      hasPrev
      showBookends
      page={2}
      pageCount={3}
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Align arrows at the start', () => (
    <Pagination
      hasNext
      hasPrev
      showBookends
      startAlign
      page={2}
      pageCount={3}
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Align arrows in the center', () => (
    <Pagination
      centerAlign
      hasNext
      hasPrev
      showBookends
      page={2}
      pageCount={3}
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ))
  .add('Align arrows at the end', () => (
    <Pagination
      endAlign
      hasNext
      hasPrev
      showBookends
      page={2}
      pageCount={3}
      onFirst={action('onFirst')}
      onLast={action('onLast')}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  ));
