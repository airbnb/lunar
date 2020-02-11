import React, { useState, useCallback } from 'react';
import IconAdd from '@airbnb/lunar-icons/lib/interface/IconAdd';
import IconRemove from '@airbnb/lunar-icons/lib/interface/IconRemove';
import Button from '../Button';
import IconButton from '../IconButton';
import ButtonGroup from '../ButtonGroup';
import Dropdown from '../Dropdown';
import Menu, { Item } from '../Menu';
import T from '../Translate';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = () => ({
  controls: {
    position: 'relative',
    display: 'inline-block',
  },
});

const ZOOM_FACTOR = 0.5;
export const ZOOM_OPTIONS = [
  {
    label: '100%',
    scale: 1,
  },
  {
    label: '125%',
    scale: 1.25,
  },
  {
    label: '150%',
    scale: 1.5,
  },
  {
    label: '200%',
    scale: 2,
  },
];

export type ZoomControlsProps = {
  /** The current scale / zoom level. 1 by default. */
  scale?: number;
  /** Callback when scale / zoom changes */
  onScale: (scale: number) => void;
};

/** Zoom controls that can be used with an image viewer component */
export default function ZoomControls(props: ZoomControlsProps) {
  const [styles, cx] = useStyles(styleSheet);
  const [visible, setVisible] = useState(false);
  const { onScale, scale = 1 } = props;

  const zoomOptions = ZOOM_OPTIONS.map((zoom: { label: string; scale: number }) => ({
    ...zoom,
    handleOnClick: () => {
      onScale(zoom.scale);
      setVisible(false);
    },
  }));

  const handleZoomOut = useCallback(
    () => onScale(scale - ZOOM_FACTOR < 1 ? 1 : scale - ZOOM_FACTOR),
    [onScale, scale],
  );
  const handleZoomIn = useCallback(() => onScale(scale + ZOOM_FACTOR), [onScale, scale]);
  const toggleZoomMenu = useCallback(() => setVisible(!visible), [visible]);

  return (
    <div className={cx(styles.controls)}>
      <ButtonGroup>
        <IconButton disabled={scale === 1} onClick={handleZoomOut}>
          <IconRemove accessibilityLabel={T.phrase('lunar.image.zoomOut', 'Zoom out')} size="2em" />
        </IconButton>

        <Button borderless onClick={toggleZoomMenu}>
          {scale * 100}%
        </Button>

        <IconButton onClick={handleZoomIn}>
          <IconAdd accessibilityLabel={T.phrase('lunar.image.zoomIn', 'Zoom in')} size="2em" />
        </IconButton>
      </ButtonGroup>

      {visible && (
        <Dropdown visible={visible} left="0" zIndex={5} onClickOutside={toggleZoomMenu}>
          <Menu accessibilityLabel={T.phrase('lunar.image.zoomMenu', 'Zoom dropdown menu')}>
            {zoomOptions.map(zoom => (
              <Item key={zoom.scale} onClick={zoom.handleOnClick}>
                {zoom.label}
              </Item>
            ))}
          </Menu>
        </Dropdown>
      )}
    </div>
  );
}
