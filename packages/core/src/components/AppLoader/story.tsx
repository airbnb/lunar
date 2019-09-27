import React from 'react';
import Text from '../Text';
import AppLoader from '.';

export default {
  title: 'Core/AppLoader',
  parameters: {
    inspectComponents: [AppLoader],
  },
};

export function byDefaultDisplaysALoadingStateWhileRequestingData() {
  return (
    <AppLoader failureText="Failed to load application" loadingText="Loading application">
      <Text>Content</Text>
    </AppLoader>
  );
}

byDefaultDisplaysALoadingStateWhileRequestingData.story = {
  name: 'By default, displays a loading state while requesting data.',
};

export function displayAnErrorWhenARequestFails() {
  return (
    <AppLoader
      error={new Error('404')}
      failureText="Failed to load application"
      loadingText="Loading application"
    >
      <Text>Content</Text>
    </AppLoader>
  );
}

displayAnErrorWhenARequestFails.story = {
  name: 'Display an error when a request fails.',
};

export function displayTheContentForASuccessfulFetchedRequest() {
  return (
    <AppLoader fetched failureText="Failed to load application" loadingText="Loading application">
      <Text>Content</Text>
    </AppLoader>
  );
}

displayTheContentForASuccessfulFetchedRequest.story = {
  name: 'Display the content for a successful, fetched request.',
};

export function withASubtitle() {
  return (
    <AppLoader
      failureText="Failed to load reservation"
      loadingText="Loading reservation"
      subtitle="HMRJ5TC3HK"
    >
      <Text>Content</Text>
    </AppLoader>
  );
}

withASubtitle.story = {
  name: 'With a subtitle.',
};

export function withASmallHeadingAndCenteredHorizontally() {
  return (
    <AppLoader
      centered
      small
      failureText="Failed to load reservation"
      loadingText="Loading reservation"
      subtitle="HMRJ5TC3HK"
    >
      <Text>Content</Text>
    </AppLoader>
  );
}

withASmallHeadingAndCenteredHorizontally.story = {
  name: 'With a small heading and centered horizontally.',
};
