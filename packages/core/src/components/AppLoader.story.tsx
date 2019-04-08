import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import AppLoader from './AppLoader';

storiesOf('Core/AppLoader', module)
  .add('By default, displays a loading state while requesting data.', () => (
    <AppLoader failureText="Failed to load application" loadingText="Loading application">
      <Text>Content</Text>
    </AppLoader>
  ))
  .add('Display an error when a request fails.', () => (
    <AppLoader
      error={new Error('404')}
      failureText="Failed to load application"
      loadingText="Loading application"
    >
      <Text>Content</Text>
    </AppLoader>
  ))
  .add('Display the content for a successful, fetched request.', () => (
    <AppLoader fetched failureText="Failed to load application" loadingText="Loading application">
      <Text>Content</Text>
    </AppLoader>
  ))
  .add('With a subtitle.', () => (
    <AppLoader
      failureText="Failed to load reservation"
      loadingText="Loading reservation"
      subtitle="HMRJ5TC3HK"
    >
      <Text>Content</Text>
    </AppLoader>
  ))
  .add('With a small heading and centered horizontally.', () => (
    <AppLoader
      centered
      small
      failureText="Failed to load reservation"
      loadingText="Loading reservation"
      subtitle="HMRJ5TC3HK"
    >
      <Text>Content</Text>
    </AppLoader>
  ));
