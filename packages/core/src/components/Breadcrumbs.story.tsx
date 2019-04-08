import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Breadcrumbs, { Breadcrumb } from './Breadcrumbs';

storiesOf('Core/Breadcrumbs', module)
  .add('Breadcrumbs with `highlighted` and optional `href` or `onClick`.', () => (
    <Breadcrumbs accessibilityLabel="Breadcrumb">
      <Breadcrumb label="Galaxy" href="#cool" />
      <Breadcrumb label="Milky Way" onClick={action('onClick')} />
      <Breadcrumb highlighted selected label="Solar System" />
    </Breadcrumbs>
  ))
  .add('Breadcrumbs with `disabled` and `hideIcon` on last breadcrumb.', () => (
    <Breadcrumbs accessibilityLabel="Progress">
      <Breadcrumb label="Step 1" onClick={action('onClick')} />
      <Breadcrumb selected label="Step 2" />
      <Breadcrumb disabled hideIcon label="Step 3" />
    </Breadcrumbs>
  ));
