import React from 'react';
import { storiesOf } from '@storybook/react';
import Image from './Image';

storiesOf('Core/Image', module)
  .addParameters({
    inspectComponents: [Image],
  })
  .add('default', () => (
    <Image
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('background', () => (
    <Image
      background
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('background contain', () => (
    <Image
      background
      backgroundSize="contain"
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('no background, still contain', () => (
    <Image
      fit
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('with rounded corners', () => (
    <Image
      fit
      hasBorderRadius
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('with rounded top corners', () => (
    <Image
      fit
      hasBorderTopRadius
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('with rounded bottom corners', () => (
    <Image
      fit
      hasBorderBottomRadius
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('background, top', () => (
    <Image
      background
      backgroundPositionY="top"
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('background, bottom', () => (
    <Image
      background
      backgroundPositionY="bottom"
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ));
