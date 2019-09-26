import React from 'react';
import { storiesOf } from '@storybook/react';
import Portal from '.';

storiesOf('Core/Portal', module)
  .addParameters({
    happo: false,
    inspectComponents: [Portal],
  })
  .add('Declarative component.', () => <Portal>Content within the portal!</Portal>);
