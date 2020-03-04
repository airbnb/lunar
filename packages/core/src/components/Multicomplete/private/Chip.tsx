import React from 'react';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import Chip from '../../Chip';

export type MulticompleteChipProps = {
  /** Value to display. */
  value: string;
  /** Callback when the icon is clicked. */
  onClick: (value: string, event: React.MouseEvent<HTMLElement>) => void;
};

export default function MulticompleteChip({ value, onClick }: MulticompleteChipProps) {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    onClick(value, event);
  };

  return (
    <Chip afterIcon={<IconCloseAlt decorative size="2em" />} onIconClick={handleClick}>
      {value}
    </Chip>
  );
}
