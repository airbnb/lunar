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
      contain
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('no background, still contain', () => (
    <Image
      contain
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('with rounded corners', () => (
    <Image
      contain
      borderRadius={6}
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
