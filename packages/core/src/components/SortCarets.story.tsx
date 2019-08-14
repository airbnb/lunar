import React from 'react';
import { storiesOf } from '@storybook/react';
import SortCarets from './SortCarets';

storiesOf('Core/SortCarets', module)
  .addParameters({
    inspectComponents: [SortCarets],
  })
  .add('With up and down carets.', () => <SortCarets down up />)
  .add('With only up.', () => <SortCarets up />)
  .add('With only down.', () => <SortCarets down />)
  .add('Active up caret.', () => <SortCarets down up enableUp />)
  .add('Active down caret.', () => <SortCarets down up enableDown />);
