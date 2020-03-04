import React, { useContext } from 'react';
import T from '@airbnb/lunar/lib/components/Translate';
import ItemMenu, { Item, Row, Separator } from '@airbnb/lunar/lib/components/Menu';
import ComposerContext from '../../contexts/ComposerContext';
import Menu from '../Menu';
import { MENU_ACTIONS, MAX_MENU_HEIGHT } from '../../constants';
import { mapActionsIntoGroups, getWritingModeActions } from '../../helpers/actions';
import ActionButton from './ActionButton';
import { GroupedActions, ActionConfig } from '../../types';

export type ActionsProps = {
  /** List of actions to support. */
  actions: ActionConfig[];
  /** Align on the right instead of the left. */
  endAlign?: boolean;
  /** Disable the automatic inclusion of writing mode actions. */
  noWritingModes?: boolean;
};

export { ActionButton };

export default function Actions({ actions, endAlign, noWritingModes }: ActionsProps) {
  const context = useContext(ComposerContext);
  const { setMenu } = context;

  // Enable feature
  context.flags.actions = true;

  // Group actions
  const groupedActions: GroupedActions = {};

  if (!noWritingModes) {
    mapActionsIntoGroups(getWritingModeActions(), groupedActions);
  }

  mapActionsIntoGroups(actions, groupedActions);

  return (
    <Menu borderless startAlign={!endAlign} endAlign={endAlign} name={MENU_ACTIONS} width={215}>
      <ItemMenu
        overflow
        accessibilityLabel={T.phrase('lunar.composer.actions.label', 'Actions menu')}
        maxHeight={MAX_MENU_HEIGHT}
      >
        {Object.entries(groupedActions).map(([group, acts], index) => (
          <React.Fragment key={group}>
            {index !== 0 && <Separator />}

            <Row>
              <strong>{group}</strong>
            </Row>

            {acts
              .filter(action => (action.condition ? action.condition(context) : true))
              .map((action, i) => {
                const Icon = action.icon;
                const onClick = () => {
                  setMenu('');
                  action.onRun(context);
                };

                return (
                  <Item
                    key={action.label}
                    icon={<Icon decorative size="1.25em" />}
                    tabIndex={i}
                    onClick={onClick}
                  >
                    {action.label}
                  </Item>
                );
              })}
          </React.Fragment>
        ))}
      </ItemMenu>
    </Menu>
  );
}
