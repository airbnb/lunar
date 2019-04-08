import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Text from './Text';
import MutedButton from './MutedButton';
import Spacing from './Spacing';
import Alert from './Alert';

storiesOf('Core/Alert', module)
  .add('Default and status classified alerts.', () => (
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
  ))
  .add('With no icons.', () => (
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
  ))
  .add('With a close button.', () => (
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
  ))
  .add('Inline.', () => (
    <Alert inline notice title="Inline notice alert title">
      <Text>Supporting content that is descriptive and helpful would go here</Text>
    </Alert>
  ))
  .add('With supporting content.', () => (
    <Alert danger title="Something failed horribly" onClose={action('onClose')}>
      <MutedButton inverted onClick={action('onClick')}>
        Retry the thing
      </MutedButton>
    </Alert>
  ))
  .add('With wrapping content.', () => (
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
  ));
