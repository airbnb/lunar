import React, { useCallback } from 'react';
import IconRotateLeft from '@airbnb/lunar-icons/lib/interface/IconRotateLeft';
import IconRotateRight from '@airbnb/lunar-icons/lib/interface/IconRotateRight';
import IconButton from '../IconButton';
import ButtonGroup from '../ButtonGroup';
import T from '../Translate';

export type Props = {
  /** The current rotation. 0 by default. */
  rotation?: number;
  /** Callback when rotation changes */
  onRotation: (rotation: number) => void;
};

/** Rotate controls that can be used with an image viewer component */
export default function RotateControls(props: Props) {
  const { onRotation, rotation = 0 } = props;

  const handleRotateLeft = useCallback(() => onRotation(rotation - 90 < 0 ? 270 : rotation - 90), [
    rotation,
  ]);
  const handleRotateRight = useCallback(() => onRotation((rotation + 90) % 360), [rotation]);

  return (
    <ButtonGroup>
      <IconButton onClick={handleRotateLeft}>
        <IconRotateLeft
          accessibilityLabel={T.phrase(
            'Rotate counter clockwise',
            {},
            'Label for button that rotates an image counter clockwise',
          )}
          size="2em"
        />
      </IconButton>

      <IconButton onClick={handleRotateRight}>
        <IconRotateRight
          accessibilityLabel={T.phrase(
            'Rotate clockwise',
            {},
            'Label for button that rotates an image clockwise',
          )}
          size="2em"
        />
      </IconButton>
    </ButtonGroup>
  );
}
