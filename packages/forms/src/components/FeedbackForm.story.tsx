import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FeedbackForm from './FeedbackForm';

storiesOf('Forms/FeedbackForm', module)
  .add('Basic form.', () => (
    <FeedbackForm
      categories={{
        chat: 'Chat',
        phone: 'Phone',
      }}
      channel="Lunar"
      channelID={1}
      teamID={2}
      onSubmit={action('onSubmit')}
    />
  ))
  .add('Without bug reporting.', () => (
    <FeedbackForm
      categories={{
        chat: 'Chat',
        phone: 'Phone',
      }}
      channel="Lunar"
      channelID={1}
      teamID={2}
      onSubmit={action('onSubmit')}
      disableBugReporting
    />
  ));
