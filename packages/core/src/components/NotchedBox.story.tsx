import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import NotchedBox from './NotchedBox';

storiesOf('Core/NotchedBox', module)
  .add('Display a box with a notch.', () => (
    <NotchedBox>
      <Text>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </div>
      </Text>
    </NotchedBox>
  ))
  .add('Specifying an offset.', () => (
    <NotchedBox notchOffset="50%">
      <Text>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </div>
      </Text>
    </NotchedBox>
  ))
  .add('With an inverted style.', () => (
    <NotchedBox inverted>
      <Text inverted>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </div>
      </Text>
    </NotchedBox>
  ))
  .add('Inline.', () => (
    <NotchedBox inline>
      <Text>Hello World</Text>
    </NotchedBox>
  ))
  .add('Inline and right-aligned notch.', () => (
    <NotchedBox inline notchOffset={-1}>
      <Text>Hello World</Text>
    </NotchedBox>
  ));
