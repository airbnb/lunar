import React from 'react';
import addons, { types } from '@storybook/addons';
import Panel from './Panel';

addons.register('storybook/props', api => {
  addons.add('storybook/props/panel', {
    title: 'About',
    type: types.PANEL,
    render: ({ active, key }) => (
      <Panel key={key} api={api} active={active} channel={addons.getChannel()} />
    ),
  });
});
