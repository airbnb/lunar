import React from 'react';
import { storiesOf } from '@storybook/react';
import Emoji from './Emoji';

storiesOf('Core/Emoji', module)
  .addParameters({
    inspectComponents: [Emoji],
  })
  .add('Using a unicode character.', () => <Emoji unicode="🎮️" />)
  .add('Using a hexcode with a custom size.', () => <Emoji hexcode="1F3AE" emojiSize="3em" />);
