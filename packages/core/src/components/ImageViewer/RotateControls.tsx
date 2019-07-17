import React from 'react';
import IconRotateLeft from '@airbnb/lunar-icons/src/interface/IconRotateLeft';
import IconRotateRight from '@airbnb/lunar-icons/src/interface/IconRotateRight';
import IconButton from '../IconButton';
import ButtonGroup from '../ButtonGroup';

export type Props = {
  /** The current rotation. 0 by default. */
  rotation?: number;
  /** Callback when rotation changes */
  onSetRotation: (rotation: number) => void;
};

export default function RotateControls(props: Props) {
  const { onSetRotation, rotation = 0 } = props;

  const handleRotateLeft = () => onSetRotation(rotation - 90 < 0 ? 270 : rotation - 90);
  const handleRotateRight = () => onSetRotation((rotation + 90) % 360);

  return (
    <div>
      <ButtonGroup>
        <IconButton onClick={handleRotateLeft}>
          <IconRotateLeft accessibilityLabel="Rotate counter clockwise" size="2em" />
        </IconButton>
        <IconButton onClick={handleRotateRight}>
          <IconRotateRight accessibilityLabel="Rotate clockwise" size="2em" />
        </IconButton>
      </ButtonGroup>
    </div>
  );
}
