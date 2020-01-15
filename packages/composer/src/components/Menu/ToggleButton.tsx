import React, { useCallback, useContext } from 'react';
import IconButton, { IconButtonProps } from '../IconButton';
import ComposerContext from '../../contexts/ComposerContext';

export type ToggleButtonProps = {
  /** Accessibility label. */
  accessibilityLabel: IconButtonProps['accessibilityLabel'];
  /** Icon to render in the button. */
  icon: IconButtonProps['icon'];
  /** Menu to toggle. */
  menu: string;
};

export default function ToggleButton({ accessibilityLabel, icon, menu }: ToggleButtonProps) {
  const { setMenu } = useContext(ComposerContext);
  const handleToggle = useCallback(() => {
    setMenu(activeMenu => (activeMenu === menu ? '' : menu));
  }, [setMenu, menu]);

  return (
    <IconButton
      accessibilityLabel={accessibilityLabel}
      icon={icon}
      id={`toggle-button-${menu}`}
      onClick={handleToggle}
    />
  );
}
