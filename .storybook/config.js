import './bootstrap';
import React from 'react';
import { setDefaultDelay } from 'happo-plugin-storybook/register';
import { addDecorator, configure } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { withA11y } from '@storybook/addon-a11y';
import { withProps } from './addons/props';
import { withStory } from './addons/story';
import contexts from './contexts';

setDefaultDelay(100);

addDecorator(story => <div style={{ padding: 24 }}>{story()}</div>);
addDecorator(withA11y);
addDecorator(withProps);
addDecorator(withStory);
addDecorator(withContexts(contexts));

configure(require.context('../packages', true, /\/([A-Za-z0-9]+\.)?story\.tsx?$/), module);
