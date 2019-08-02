import './bootstrap';
import 'happo-plugin-storybook/register';
import React from 'react';
import { addDecorator, configure } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { withA11y } from '@storybook/addon-a11y';
import { withProps } from './addons/props';
import { withStory } from './addons/story';
import contexts from './contexts';

addDecorator(story => <div style={{ padding: 24 }}>{story()}</div>);
addDecorator(withA11y);
addDecorator(withProps);
addDecorator(withStory);
addDecorator(withContexts(contexts));

configure(() => {
  const glob = require.context('../packages', true, /\.story\.tsx?$/);

  glob.keys().forEach(filename => glob(filename));
}, module);
