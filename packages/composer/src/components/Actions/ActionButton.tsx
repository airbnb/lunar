import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import T from '@airbnb/lunar/lib/components/Translate';
import ToggleButton from '../Menu/ToggleButton';
import { MENU_ACTIONS } from '../../constants';

export default function ActionButton() {
  return (
    <ToggleButton
      accessibilityLabel={T.phrase('lunar.composer.labels.openActionsMenu', 'Open actions menu')}
      icon={IconAddAlt}
      menu={MENU_ACTIONS}
    />
  );
}
