import React from 'react';
import addons, { types } from '@storybook/addons';
import SettingsDropdown from './SettingsDropdown';

addons.register('storybook/settings', api => {
  addons.add('storybook/settings', {
    title: 'Settings',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <SettingsDropdown api={api} />,
  });
});
