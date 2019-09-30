import React from 'react';
import { action } from '@storybook/addon-actions';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from '../Text';
import MutedButton from '../MutedButton';
import Spacing from '../Spacing';
import Alert from '.';

export default {
  title: 'Core/Alert',
  parameters: {
    inspectComponents: [Alert],
  },
};

export function defaultAndStatusClassifiedAlerts() {
  return (
    <>
      <Alert title="Alert title" />
      <br />
      <Alert notice title="Notice alert title" />
      <br />
      <Alert info title="Info alert title" />
      <br />
      <Alert success title="Success alert title" />
      <br />
      <Alert warning title="Warning alert title" />
      <br />
      <Alert danger title="Danger alert title" />
    </>
  );
}

defaultAndStatusClassifiedAlerts.story = {
  name: 'Default and status classified alerts.',
};

export function withNoIcons() {
  return (
    <>
      <Alert hideStatusIcon title="Alert title" />
      <br />
      <Alert notice hideStatusIcon title="Notice alert title" />
      <br />
      <Alert info hideStatusIcon title="Info alert title" />
      <br />
      <Alert success hideStatusIcon title="Success alert title" />
      <br />
      <Alert warning hideStatusIcon title="Warning alert title" />
      <br />
      <Alert danger hideStatusIcon title="Danger alert title" />
    </>
  );
}

withNoIcons.story = {
  name: 'With no icons.',
};

export function withACloseButton() {
  return (
    <>
      <div>
        <Alert title="Alert title" onClose={action('onClose')} />

        <br />

        <Alert title="Alert title" onClose={action('onClose')}>
          <Text>Supporting content that is descriptive and helpful would go here</Text>
        </Alert>

        <br />

        <Alert danger title="Danger alert title" onClose={action('onClose')}>
          <Text>Supporting content that is descriptive and helpful would go here</Text>
        </Alert>
      </div>
    </>
  );
}

withACloseButton.story = {
  name: 'With a close button.',
};

export function inlineStory() {
  return (
    <Alert inline notice title="Inline notice alert title">
      <Text>Supporting content that is descriptive and helpful would go here</Text>
    </Alert>
  );
}

inlineStory.story = {
  name: 'Inline.',
};

export function withSupportingContent() {
  return (
    <Alert danger title="Something failed horribly" onClose={action('onClose')}>
      <MutedButton inverted onClick={action('onClick')}>
        Retry the thing
      </MutedButton>
    </Alert>
  );
}

withSupportingContent.story = {
  name: 'With supporting content.',
};

export function withWrappingContent() {
  return (
    <Alert info title="Something failed horribly" onClose={action('onClose')}>
      <Text>
        <LoremIpsum />
      </Text>

      <Spacing top={1}>
        <MutedButton inverted onClick={action('onClick')}>
          Retry the thing
        </MutedButton>
      </Spacing>
    </Alert>
  );
}

withWrappingContent.story = {
  name: 'With wrapping content.',
};
