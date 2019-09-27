import React from 'react';
import { action } from '@storybook/addon-actions';
import FeedbackForm from '.';

export default {
  title: 'Forms/FeedbackForm',
  parameters: {
    inspectComponents: [FeedbackForm],
  },
};

export function basicForm() {
  return (
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
  );
}

basicForm.story = {
  name: 'Basic form.',
};

export function withoutBugReporting() {
  return (
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
  );
}

withoutBugReporting.story = {
  name: 'Without bug reporting.',
};
