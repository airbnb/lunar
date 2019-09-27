import React from 'react';
import Text from '../Text';
import Translate from '.';

export default {
  title: 'Core/Translate',
  parameters: {
    inspectComponents: [Translate],
  },
};

export function displayAMessageWithAnEditorRelatedContext() {
  return (
    <Text>
      <Translate
        phrase="This content should be translated."
        context="This message is for translation editors."
      />
    </Text>
  );
}

displayAMessageWithAnEditorRelatedContext.story = {
  name: 'Display a message with an editor related context.',
};

export function interpolateVariablesAlsoSupportHtml() {
  return (
    <Text>
      <Translate
        html
        phrase="Hello %{name}!"
        name={<b>Bruce</b>}
        context="This message is for translation editors."
      />
    </Text>
  );
}

interpolateVariablesAlsoSupportHtml.story = {
  name: 'Interpolate variables. Also support HTML.',
};

export function handleContextualMessagesBasedOnCounts() {
  return (
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
  );
}

handleContextualMessagesBasedOnCounts.story = {
  name: 'Handle contextual messages based on counts.',
};

export function returnAStringInsteadOfRenderingAComponent() {
  return (
    <div>
      {Translate.phrase(
        'Hello %{name}',
        { name: 'Bruce' },
        'This message is for translation editors.',
      )}
    </div>
  );
}

returnAStringInsteadOfRenderingAComponent.story = {
  name: 'Return a string instead of rendering a component.',
};
