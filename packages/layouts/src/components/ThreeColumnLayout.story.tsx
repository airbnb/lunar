import React from 'react';
import { storiesOf } from '@storybook/react';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import SideBar, { Item } from './SideBar';
import ThreeColumnLayout from './ThreeColumnLayout';

storiesOf('Layouts/ThreeColumnLayout', module)
  .add('A three column layout.', () => (
    <ThreeColumnLayout
      after={
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
      }
      before={
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
      }
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
    </ThreeColumnLayout>
  ))
  .add('A three column layout with a side navigation.', () => (
    <ThreeColumnLayout
      after={
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
      }
      before={
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
      }
      sideBar={
        <SideBar accessibilityLabel="Nav">
          <Item icon={<IconSettings accessibilityLabel="Settings" />} />
        </SideBar>
      }
    >
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
    </ThreeColumnLayout>
  ));
