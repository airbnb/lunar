import React from 'react';
import { storiesOf } from '@storybook/react';
import Image from './Image';
import lunar from ':storybook/images/lunar-logo.png';

storiesOf('Core/Image', module)
  .addParameters({
    inspectComponents: [Image],
    happo: { delay: 250 },
  })
  .add('default', () => <Image src={lunar} alt="Something descriptive" height={600} />)
  .add('background', () => (
    <Image background src={lunar} alt="Something descriptive" height={600} />
  ))
  .add('background contain', () => (
    <Image background contain src={lunar} alt="Something descriptive" height={600} />
  ))
  .add('no background, still contain, default borderRadius', () => (
    <Image contain src={lunar} alt="Something descriptive" height={600} />
  ))
  .add('with custom borderRadius', () => (
    <Image contain borderRadius={25} src={lunar} alt="Something descriptive" height={600} />
  ))
  .add('with zero borderRadius', () => (
    <Image contain borderRadius={0} src={lunar} alt="Something descriptive" height={600} />
  ))
  .add('background alignTop', () => (
    <Image alignTop background src={lunar} alt="Something descriptive" height={600} />
  ))
  .add('background, alignBottom', () => (
    <Image alignBottom background src={lunar} alt="Something descriptive" height={600} />
  ));
