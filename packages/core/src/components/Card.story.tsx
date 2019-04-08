import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import lunar from ':image/lunar-logo.png';
import stars from ':image/stars.jpg';
import moon from ':image/moon.png';
import Text from './Text';
import ResponsiveImage from './ResponsiveImage';
import Card, { Content } from './Card';

storiesOf('Core/Card', module)
  .add('A standard card.', () => (
    <Card>
      <Content>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with multiple blocks of content.', () => (
    <Card>
      <Content>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>

      <Content>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('With a max height.', () => (
    <Card>
      <Content middleAlign maxHeight={50}>
        <Text>Lorem ipsum dolor sit amet.</Text>
      </Content>
    </Card>
  ))
  .add('A card with a top featured image.', () => (
    <Card>
      <Content topImageSrc={stars}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a top featured image.', () => (
    <Card>
      <Content large topImageSrc={stars}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a left featured image.', () => (
    <Card>
      <Content beforeImageSrc={moon}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a left featured image.', () => (
    <Card>
      <Content large beforeImageSrc={moon}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a right featured image.', () => (
    <Card>
      <Content afterImageSrc={moon}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a right featured image.', () => (
    <Card>
      <Content large afterImageSrc={moon}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with text truncation.', () => (
    <Card>
      <Content truncated beforeImageSrc={stars}>
        <Text truncated>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>

        <Text truncated>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('Click-able.', () => (
    <Card>
      <Content
        truncated
        after={<IconChevronRight decorative size={24} />}
        onClick={action('onClick Card')}
      >
        <Text truncated>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('Compact.', () => (
    <Card>
      <Content compact>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
      </Content>
    </Card>
  ))
  .add('Card as a button with middle alignment.', () => (
    <Card>
      <Content
        compact
        middleAlign
        truncated
        before={
          <ResponsiveImage
            cover
            noShadow
            alt="Image"
            borderRadius={3}
            maxHeight={100}
            maxWidth={100}
            src={lunar}
          />
        }
        onClick={action('onClick')}
      >
        <Text bold>Suspendisse vitae dui elit?</Text>

        <Text truncated>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
          porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem
          vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est
          lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut,
          maximus euismod erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui
          elit. Aliquam erat volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque
          ullamcorper quam a nibh aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada
          dapibus tincidunt.
        </Text>
        <Text>Read more</Text>
      </Content>
    </Card>
  ));
