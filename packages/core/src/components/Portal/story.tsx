import React from 'react';
import Portal from '.';

export default {
  title: 'Core/Portal',
  parameters: {
    happo: false,
    inspectComponents: [Portal],
  },
};

export function declarativeComponent() {
  return <Portal>Content within the portal!</Portal>;
}

declarativeComponent.story = {
  name: 'Declarative component.',
};
