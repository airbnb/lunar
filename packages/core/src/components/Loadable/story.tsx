import React from 'react';
import Loadable from '.';

export default {
  title: 'Core/Loadable',
  parameters: {
    inspectComponents: [Loadable],
  },
};

export function renderAComponentAfterImportingIt() {
  return <Loadable component={() => import('../Shimmer')} />;
}

renderAComponentAfterImportingIt.story = {
  name: 'Render a component after importing it.',
};

export function renderAComponentUsingFunctionChildren() {
  return (
    <Loadable component={() => import('../Text')}>
      {(Text) => <Text>Loaded the `Text` component and rendered it.</Text>}
    </Loadable>
  );
}

renderAComponentUsingFunctionChildren.story = {
  name: 'Render a component using function children.',
};
