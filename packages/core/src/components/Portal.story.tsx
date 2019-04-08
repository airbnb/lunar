import React from 'react';
import { storiesOf } from '@storybook/react';
import Portal from './Portal';

storiesOf('Core/Portal', module).add('Declarative component.', () => (
  <Portal>Content within the portal!</Portal>
));
