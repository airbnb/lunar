import React from 'react';
import Aside from './Aside';
import SplitLayout from './SplitLayout';
import LoremIpsum from ':storybook/components/LoremIpsum';
import { storiesOf } from '@storybook/react';

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
