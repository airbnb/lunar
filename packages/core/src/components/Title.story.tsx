import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from './Title';

storiesOf('Core/Title', module)
  .add('Titles with different heading levels.', () => (
    <>
      <Title level={1}>Lorem ipsum dolor sit amet.</Title>
      <Title level={2}>Lorem ipsum dolor sit amet.</Title>
      <Title level={3}>Lorem ipsum dolor sit amet.</Title>
    </>
  ))
  .add('With different states: muted and inverted.', () => (
    <>
      <Title level={3} muted>
        Lorem ipsum dolor sit amet.
      </Title>
      <Title level={3} inverted>
        Lorem ipsum dolor sit amet.
      </Title>
    </>
  ))
  .add('With aligned text.', () => (
    <>
      <Title level={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Title>
      <Title level={3} centerAlign>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Title>
      <Title level={3} endAlign>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Title>
    </>
  ));
