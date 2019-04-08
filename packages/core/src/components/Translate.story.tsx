import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Translate from './Translate';

storiesOf('Core/Translate', module)
  .add('Display a message with an editor related context.', () => (
    <Text>
      <Translate
        phrase="This content should be translated."
        context="This message is for translation editors."
      />
    </Text>
  ))
  .add('Interpolate variables. Also support HTML.', () => (
    <Text>
      <Translate
        phrase="Hello %{name}!"
        name={<b>Bruce</b>}
        context="This message is for translation editors."
        html
      />
    </Text>
  ))
  .add('Handle contextual messages based on counts.', () => (
    <>
      <Text>
        <Translate
          phrase="%{smartCount} item||||%{smartCount} items"
          smartCount={0}
          context="This message is for translation editors."
        />
        <br />
        <br />
        <Translate
          phrase="%{smartCount} item||||%{smartCount} items"
          smartCount={1}
          context="This message is for translation editors."
        />
        <br />
        <br />
        <Translate
          phrase="%{smartCount} item||||%{smartCount} items"
          smartCount={2}
          context="This message is for translation editors."
        />
      </Text>
    </>
  ))
  .add('Return a string instead of rendering a component.', () => (
    <div>
      {Translate.phrase(
        'Hello %{name}',
        { name: 'Bruce' },
        'This message is for translation editors.',
      )}
      >
    </div>
  ));
