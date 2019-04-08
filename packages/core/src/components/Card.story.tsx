import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import LoremIpsum from ':storybook/components/LoremIpsum';
import lunar from ':storybook/images/lunar-logo.png';
import stars from ':storybook/images/stars.jpg';
import moon from ':storybook/images/moon.png';
import Text from './Text';
import ResponsiveImage from './ResponsiveImage';
import Card, { Content } from './Card';

storiesOf('Core/Card', module)
  .add('A standard card.', () => (
    <Card>
      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with multiple blocks of content.', () => (
    <Card>
      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>

      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('With a max height.', () => (
    <Card>
      <Content middleAlign maxHeight={50}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a top featured image.', () => (
    <Card>
      <Content topImageSrc={stars}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a top featured image.', () => (
    <Card>
      <Content large topImageSrc={stars}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a left featured image.', () => (
    <Card>
      <Content beforeImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a left featured image.', () => (
    <Card>
      <Content large beforeImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a right featured image.', () => (
    <Card>
      <Content afterImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with a right featured image.', () => (
    <Card>
      <Content large afterImageSrc={moon}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('A card with text truncation.', () => (
    <Card>
      <Content truncated beforeImageSrc={stars}>
        <Text truncated>
          <LoremIpsum />
        </Text>

        <Text truncated>
          <LoremIpsum />
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
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  ))
  .add('Compact.', () => (
    <Card>
      <Content compact>
        <Text>
          <LoremIpsum />
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
          <LoremIpsum />
        </Text>

        <Text>Read more</Text>
      </Content>
    </Card>
  ));
