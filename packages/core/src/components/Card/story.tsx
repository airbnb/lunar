import React from 'react';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import LoremIpsum from ':storybook/components/LoremIpsum';
import lunar from ':storybook/images/lunar-logo.png';
import stars from ':storybook/images/stars.jpg';
import moon from ':storybook/images/moon.png';
import Text from '../Text';
import ResponsiveImage from '../ResponsiveImage';
import Image from '../Image';
import Card, { Content } from '.';

export default {
  title: 'Core/Card',
  parameters: {
    inspectComponents: [Card, Content],
    happo: { delay: 500 },
  },
};

export function aStandardCard() {
  return (
    <Card>
      <Content>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aStandardCard.story = {
  name: 'A standard card.',
};

export function aCardWithOverflowVisible() {
  return (
    <Card overflow>
      <Content>
        <div
          style={{
            position: 'relative',
            top: '-50px',
            background: '#ebebeb',
            padding: '16px',
          }}
        >
          <Text>
            <Text>
              <LoremIpsum />
            </Text>
          </Text>
        </div>
      </Content>
    </Card>
  );
}

aCardWithOverflowVisible.story = {
  name: 'A card with overflow visible.',
};

export function aCardWithMultipleBlocksOfContent() {
  return (
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
  );
}

aCardWithMultipleBlocksOfContent.story = {
  name: 'A card with multiple blocks of content.',
};

export function withAMaxHeight() {
  return (
    <Card>
      <Content middleAlign maxHeight={50}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

withAMaxHeight.story = {
  name: 'With a max height.',
};

export function withAMinHeight() {
  return (
    <Card>
      <Content middleAlign minHeight={300}>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

withAMinHeight.story = {
  name: 'With a min height.',
};

export function aCardWithATopFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingTop
        top={<Image background cover alt="" height={105} width="100%" src={stars} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithATopFeaturedImage.story = {
  name: 'A card with a top featured image.',
};

export function aCardWithALargeTopFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingTop
        top={<Image background cover alt="" height={195} width="100%" src={stars} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithALargeTopFeaturedImage.story = {
  name: 'A card with a large top featured image.',
};

export function aCardWithASmallLeftFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingBefore
        before={<Image background cover alt="" height="100%" width={80} src={moon} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithASmallLeftFeaturedImage.story = {
  name: 'A card with a small left featured image.',
};

export function aCardWithALeftFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingBefore
        before={<Image background cover alt="" height="100%" width={152} src={moon} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithALeftFeaturedImage.story = {
  name: 'A card with a left featured image.',
};

export function aCardWithALargeLeftFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingBefore
        before={<Image background cover alt="" height="100%" width={195} src={moon} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithALargeLeftFeaturedImage.story = {
  name: 'A card with a large left featured image.',
};

export function aCardWithASmallRightFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingAfter
        after={<Image background cover alt="" height="100%" width={80} src={moon} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithASmallRightFeaturedImage.story = {
  name: 'A card with a small right featured image.',
};

export function aCardWithARightFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingAfter
        after={<Image background cover alt="" height="100%" width={152} src={moon} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithARightFeaturedImage.story = {
  name: 'A card with a right featured image.',
};

export function aCardWithALargeRightFeaturedImage() {
  return (
    <Card>
      <Content
        noPaddingAfter
        after={<Image background cover alt="" height="100%" width={195} src={moon} />}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithALargeRightFeaturedImage.story = {
  name: 'A card with a large right featured image.',
};

export function aCardWithTextTruncation() {
  return (
    <Card>
      <Content
        truncated
        noPaddingBefore
        before={<Image background cover alt="" height="100%" width={152} src={moon} />}
      >
        <Text truncated>
          <LoremIpsum />
        </Text>

        <Text truncated>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

aCardWithTextTruncation.story = {
  name: 'A card with text truncation.',
};

export function clickableCard() {
  return (
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
  );
}

clickableCard.story = {
  name: 'Click-able.',
};

export function asCompact() {
  return (
    <Card>
      <Content compact>
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

asCompact.story = {
  name: 'As compact.',
};

export function cardAsAButtonWithMiddleAlignment() {
  return (
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
  );
}

cardAsAButtonWithMiddleAlignment.story = {
  name: 'Card as a button with middle alignment.',
};

export function asClickableBeforeImage() {
  return (
    <Card>
      <Content
        noPaddingBefore
        before={<Image background cover alt="" height="100%" width={152} src={moon} />}
        onBeforeClick={action('onClick before')}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

asClickableBeforeImage.story = {
  name: 'A card with a clickable before image',
};

export function asClickableAfterImage() {
  return (
    <Card>
      <Content
        noPaddingAfter
        after={<Image background cover alt="" height="100%" width={152} src={moon} />}
        onAfterClick={action('onClick after')}
      >
        <Text>
          <LoremIpsum />
        </Text>
      </Content>
    </Card>
  );
}

asClickableAfterImage.story = {
  name: 'A card with a clickable after image.',
};

export function aCardWithAllTheExtraContentAndAlignMents() {
  return (
    <>
      <Card>
        <Content
          after={<Text>After</Text>}
          before={<Image background cover alt="" height={80} width={80} src={moon} />}
          top={<Text centerAlign>Top</Text>}
        >
          <Text>Default alignment</Text>
        </Content>
      </Card>

      <br />

      <Card>
        <Content
          middleAlign
          after={<Text>After</Text>}
          before={<Image background cover alt="" height={80} width={80} src={moon} />}
          top={<Text centerAlign>Top</Text>}
        >
          <Text>Middle alignment</Text>
        </Content>
      </Card>
    </>
  );
}

aCardWithAllTheExtraContentAndAlignMents.story = {
  name: 'Cards with before, after, and top content showing different alignments.',
};
