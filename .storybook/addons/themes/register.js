import React from 'react';
import addons, { types } from '@storybook/addons';
import ThemeSelector from './ThemeSelector';

addons.register('storybook/themes', api => {
  addons.add('storybook/themes', {
    title: 'Theme selector',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <ThemeSelector api={api} />,
  });
});
