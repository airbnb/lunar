import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Aside from './Aside';
import SplitLayout from './SplitLayout';

storiesOf('Layouts/SplitLayout', module)
  .addParameters({
    inspectComponents: [SplitLayout],
  })
  .add('A split column layout with before and after aside.', () => (
    <SplitLayout
      after={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
      before={
        <Aside>
          <LoremIpsum />
        </Aside>
      }
    />
  ));
