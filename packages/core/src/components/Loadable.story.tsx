import React from 'react';
import { storiesOf } from '@storybook/react';
import Loadable from './Loadable';

storiesOf('Core/Loadable', module)
  .add('Render a component after importing it.', () => (
    <Loadable component={() => import('./Shimmer')} />
  ))
  .add('Render a component using function children.', () => (
    <Loadable component={() => import('./Text')}>
      {Text => <Text>Loaded the `Text` component and rendered it.</Text>}
    </Loadable>
  ));
