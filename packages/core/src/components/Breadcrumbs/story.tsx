import React from 'react';
import { action } from '@storybook/addon-actions';
import Breadcrumbs, { Breadcrumb } from '.';

export default {
  title: 'Core/Breadcrumbs',
  parameters: {
    inspectComponents: [Breadcrumbs, Breadcrumb],
  },
};

export function breadcrumbsWithHighlightedAndOptionalHrefOrOnClick() {
  return (
    <Breadcrumbs accessibilityLabel="Breadcrumb">
      <Breadcrumb label="Galaxy" href="#cool" />
      <Breadcrumb label="Milky Way" onClick={action('onClick')} />
      <Breadcrumb highlighted selected label="Solar System" />
    </Breadcrumbs>
  );
}

breadcrumbsWithHighlightedAndOptionalHrefOrOnClick.story = {
  name: 'Breadcrumbs with `highlighted` and optional `href` or `onClick`.',
};

export function breadcrumbsWithDisabledAndHideIconOnLastBreadcrumb() {
  return (
    <Breadcrumbs accessibilityLabel="Progress">
      <Breadcrumb label="Step 1" onClick={action('onClick')} />
      <Breadcrumb selected label="Step 2" />
      <Breadcrumb disabled hideIcon label="Step 3" />
    </Breadcrumbs>
  );
}

breadcrumbsWithDisabledAndHideIconOnLastBreadcrumb.story = {
  name: 'Breadcrumbs with `disabled` and `hideIcon` on last breadcrumb.',
};
