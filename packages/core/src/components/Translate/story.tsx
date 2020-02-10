import React from 'react';
import Text from '../Text';
import T from '.';

export default {
  title: 'Core/Translate',
  parameters: {
    inspectComponents: [T],
  },
};

export function displayAMessageWithAnEditorRelatedContext() {
  return (
    <Text>
      <T phrase="This content should be translated." />
    </Text>
  );
}

displayAMessageWithAnEditorRelatedContext.story = {
  name: 'Display a message with an editor related context.',
};

export function interpolateVariablesAlsoSupportHtml() {
  return (
    <Text>
      <T html phrase="Hello %{name}!" name={<b>Bruce</b>} />
    </Text>
  );
}

interpolateVariablesAlsoSupportHtml.story = {
  name: 'Interpolate variables. Also support HTML.',
};

export function handleContextualMessagesBasedOnCounts() {
  return (
    <Text>
      <T phrase="%{smartCount} item||||%{smartCount} items" smartCount={0} />
      <br />
      <br />
      <T phrase="%{smartCount} item||||%{smartCount} items" smartCount={1} />
      <br />
      <br />
      <T phrase="%{smartCount} item||||%{smartCount} items" smartCount={2} />
    </Text>
  );
}

handleContextualMessagesBasedOnCounts.story = {
  name: 'Handle contextual messages based on counts.',
};

export function returnAStringInsteadOfRenderingAComponent() {
  return (
    <div>
      {T.phrase('Hello %{name}', { name: 'Bruce' }, 'This message is for translation editors.')}
    </div>
  );
}

returnAStringInsteadOfRenderingAComponent.story = {
  name: 'Return a string instead of rendering a component.',
};
