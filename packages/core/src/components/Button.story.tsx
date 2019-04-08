import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Button from './Button';

storiesOf('Core/Button', module)
  .add('Standard button with an inverted variant.', () => (
    <>
      <Button>Button</Button> <Button inverted>Button</Button>
    </>
  ))
  .add('Render an anchor link when passing `href`.', () => (
    <>
      <Button href="https://github.com/airbnb/lunar" openInNewWindow>
        Link
      </Button>{' '}
      <Button href="https://github.com/airbnb/lunar" openInNewWindow inverted>
        Link
      </Button>
    </>
  ))
  .add('With event handlers.', () => (
    <Button
      onClick={action('onClick')}
      onMouseOver={action('onMouseOver')}
      onFocus={action('onFocus')}
    >
      Button
    </Button>
  ))
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <Button small>Button</Button> <Button>Button</Button> <Button large>Button</Button>
      <br />
      <br />
      <Button inverted small>
        Button
      </Button>{' '}
      <Button inverted>Button</Button>{' '}
      <Button inverted large>
        Button
      </Button>
    </>
  ))
  .add('With different states: disabled and loading.', () => (
    <>
      <Button disabled>Button</Button> <Button loading>Button</Button>
      <br />
      <br />
      <Button inverted disabled>
        Button
      </Button>{' '}
      <Button inverted loading>
        Button
      </Button>
    </>
  ))
  .add('With before and or after icons.', () => (
    <>
      <div>
        <Button beforeIcon={<IconAddAlt decorative />}>Before icon</Button>{' '}
        <Button afterIcon={<IconAddAlt decorative />}>After icon</Button>
      </div>
    </>
  ))
  .add('With borderless.', () => (
    <>
      <div>
        <Button borderless>Button</Button>{' '}
        <Button borderless inverted>
          Button
        </Button>{' '}
        <Button borderless disabled>
          Button
        </Button>
      </div>
    </>
  ));
