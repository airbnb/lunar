import React from 'react';
import { storiesOf } from '@storybook/react';
import Image from './Image';
import stars from ':storybook/images/stars.jpg';

storiesOf('Core/Image', module)
  .addParameters({
    inspectComponents: [Image],
  })
  .add('default', () => <Image src={stars} alt="Something descriptive" height={600} />)
  .add('background', () => (
    <Image background src={stars} alt="Something descriptive" height={600} />
  ))
  .add('background contain', () => (
    <Image background contain src={stars} alt="Something descriptive" height={600} />
  ))
  .add('no background, still contain, default borderRadius', () => (
    <Image contain src={stars} alt="Something descriptive" height={600} />
  ))
  .add('with custom borderRadius', () => (
    <Image contain borderRadius={25} src={stars} alt="Something descriptive" height={600} />
  ))
  .add('with zero borderRadius', () => (
    <Image contain borderRadius={0} src={stars} alt="Something descriptive" height={600} />
  ))
  .add('background alignTop', () => (
    <Image alignTop background src={stars} alt="Something descriptive" height={600} />
  ))
  .add('background, alignBottom', () => (
    <Image alignBottom background src={stars} alt="Something descriptive" height={600} />
  ));
