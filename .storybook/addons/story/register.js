import React from 'react';
import addons, { types } from '@storybook/addons';
import Panel from './Panel';

addons.register('storybook/story', api => {
  addons.add('storybook/story/panel', {
    title: 'Story',
    type: types.PANEL,
    render: ({ active, key }) => (
      <Panel key={key} api={api} active={active} channel={addons.getChannel()} />
    ),
  });
});
