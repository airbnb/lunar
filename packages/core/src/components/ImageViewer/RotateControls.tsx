import React, { useCallback } from 'react';
import IconRotateLeft from '@airbnb/lunar-icons/lib/interface/IconRotateLeft';
import IconRotateRight from '@airbnb/lunar-icons/lib/interface/IconRotateRight';
import IconButton from '../IconButton';
import ButtonGroup from '../ButtonGroup';
import T from '../Translate';

export type RotateControlsProps = {
  /** The current rotation. 0 by default. */
  rotation?: number;
  /** Callback when rotation changes */
  onRotation: (rotation: number) => void;
  /** Size of the icons. */
  size?: number | string;
};

/** Rotate controls that can be used with an image viewer component */
export default function RotateControls(props: RotateControlsProps) {
  const { onRotation, rotation = 0, size = '2em' } = props;

  const handleRotateLeft = useCallback(() => onRotation(rotation - 90 < 0 ? 270 : rotation - 90), [
    onRotation,
    rotation,
  ]);
  const handleRotateRight = useCallback(() => onRotation((rotation + 90) % 360), [
    onRotation,
    rotation,
  ]);

  return (
    <ButtonGroup>
      <IconButton onClick={handleRotateLeft}>
        <IconRotateLeft
          accessibilityLabel={T.phrase(
            'lunar.image.rotateCounterClockwise',
            'Rotate counter clockwise',
          )}
          size={size}
        />
      </IconButton>

      <IconButton onClick={handleRotateRight}>
        <IconRotateRight
          accessibilityLabel={T.phrase('lunar.image.rotateClockwise', 'Rotate clockwise')}
          size={size}
        />
      </IconButton>
    </ButtonGroup>
  );
}
