import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FeedbackForm from './FeedbackForm';

storiesOf('Forms/FeedbackForm', module)
  .addParameters({
    inspectComponents: [FeedbackForm],
  })
  .add('Basic form.', () => (
    <FeedbackForm
      categories={{
        chat: 'Chat',
        phone: 'Phone',
      }}
      channel="Lunar"
      channelID={1}
      teamID={2}
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    />
  ))
  .add('Without bug reporting.', () => (
    <FeedbackForm
      disableBugReporting
      categories={{
        chat: 'Chat',
        phone: 'Phone',
      }}
      channel="Lunar"
      channelID={1}
      teamID={2}
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    />
  ));
