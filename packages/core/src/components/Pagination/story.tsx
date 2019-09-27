import React from 'react';
import { action } from '@storybook/addon-actions';
import Pagination from '.';
import T from '../Translate';

export default {
  title: 'Core/Pagination',
  parameters: {
    inspectComponents: [Pagination],
  },
};

export function noPreviousOrNextPages() {
  return <Pagination page={1} onNext={action('onNext')} onPrevious={action('onPrevious')} />;
}

noPreviousOrNextPages.story = {
  name: 'No previous or next pages.',
};

export function nextPages() {
  return (
    <Pagination hasNext page={1} onNext={action('onNext')} onPrevious={action('onPrevious')} />
  );
}

nextPages.story = {
  name: 'Next pages.',
};

export function previousPages() {
  return (
    <Pagination hasPrev page={2} onNext={action('onNext')} onPrevious={action('onPrevious')} />
  );
}

previousPages.story = {
  name: 'Previous pages.',
};

export function bothNextAndPages() {
  return (
    <Pagination
      hasPrev
      hasNext
      page={2}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  );
}

bothNextAndPages.story = {
  name: 'Both next and pages.',
};

export function withLabel() {
  return (
    <Pagination
      hasPrev
      hasNext
      pageLabel={T.phrase('Photo', {}, 'Label for photo pagination')}
      page={2}
      onNext={action('onNext')}
      onPrevious={action('onPrevious')}
    />
  );
}

withLabel.story = {
  name: 'With label.',
};

export function withNoLabel() {
  return (
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
  );
}

withNoLabel.story = {
  name: 'With no label.',
};

export function bookendsFirstPage() {
  return (
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
  );
}

bookendsFirstPage.story = {
  name: 'Bookends, first page.',
};

export function bookendsLastPage() {
  return (
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
  );
}

bookendsLastPage.story = {
  name: 'Bookends, last page.',
};

export function bookendsMiddlePage() {
  return (
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
  );
}

bookendsMiddlePage.story = {
  name: 'Bookends, middle page.',
};

export function alignArrowsAtTheStart() {
  return (
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
  );
}

alignArrowsAtTheStart.story = {
  name: 'Align arrows at the start',
};

export function alignArrowsInTheCenter() {
  return (
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
  );
}

alignArrowsInTheCenter.story = {
  name: 'Align arrows in the center',
};

export function alignArrowsAtTheEnd() {
  return (
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
  );
}

alignArrowsAtTheEnd.story = {
  name: 'Align arrows at the end',
};
