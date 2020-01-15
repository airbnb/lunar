import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import T from '@airbnb/lunar/lib/components/Translate';
import ToggleButton from '../Menu/ToggleButton';
import { MENU_ACTIONS } from '../../constants';

export default function ActionButton() {
  return (
    <ToggleButton
      accessibilityLabel={T.phrase('Open actions menu', null, {
        key: 'composer.labels.openActionsMenu',
      })}
      icon={IconAddAlt}
      menu={MENU_ACTIONS}
    />
  );
}
