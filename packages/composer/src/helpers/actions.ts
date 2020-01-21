import T from '@airbnb/lunar/lib/components/Translate';
import IconEmail from '@airbnb/lunar-icons/lib/general/IconEmail';
import IconChatGroup from '@airbnb/lunar-icons/lib/interface/IconChatGroup';
import IconLock from '@airbnb/lunar-icons/lib/interface/IconLock';
import { MODE_MESSAGE, MODE_EMAIL, MODE_PRIVATE_NOTE } from '../constants';
import { ActionConfig, GroupedActions } from '../types';

export function getWritingModeActions(): ActionConfig[] {
  const groupLabel = T.phrase('New…', null, { key: 'composer.actions.group.new' });

  return [
    {
      condition: ({ mode }) => mode !== MODE_MESSAGE,
      group: groupLabel,
      label: T.phrase('Message', null, { key: 'composer.actions.label.message' }),
      icon: IconChatGroup,
      onRun: ({ setMode }) => {
        setMode(MODE_MESSAGE);
      },
    },
    {
      condition: ({ mode }) => mode !== MODE_EMAIL,
      group: groupLabel,
      label: T.phrase('Email', null, { key: 'composer.actions.label.email' }),
      icon: IconEmail,
      onRun: ({ setMode }) => {
        setMode(MODE_EMAIL);
      },
    },
    {
      condition: ({ mode }) => mode !== MODE_PRIVATE_NOTE,
      group: groupLabel,
      label: T.phrase('Private note', null, { key: 'composer.actions.label.privateNote' }),
      icon: IconLock,
      onRun: ({ setMode }) => {
        setMode(MODE_PRIVATE_NOTE);
      },
    },
  ];
}

export function mapActionsIntoGroups(actions: ActionConfig[], groupedActions: GroupedActions) {
  actions.forEach(action => {
    // eslint-disable-next-line no-param-reassign
    groupedActions[action.group] = (groupedActions[action.group] || []).concat(action);
  });
}
