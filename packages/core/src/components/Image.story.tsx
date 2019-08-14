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
  .add('no background, still contain, default borderRadius', () => (
    <Image
      contain
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('with custom borderRadius', () => (
    <Image
      contain
      borderRadius={25}
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('with zero borderRadius', () => (
    <Image
      contain
      borderRadius={0}
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('background, top', () => (
    <Image
      alignTop
      background
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ))
  .add('background, bottom', () => (
    <Image
      alignBottom
      background
      src="https://images.freeimages.com/images/large-previews/035/young-golden-retriever-1404848.jpg"
      alt="Something descriptive"
      height={450}
    />
  ));
