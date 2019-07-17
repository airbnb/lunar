import React, { useState } from 'react';
import IconAdd from '@airbnb/lunar-icons/src/interface/IconAdd';
import IconRemove from '@airbnb/lunar-icons/src/interface/IconRemove';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Button from '../Button';
import IconButton from '../IconButton';
import ButtonGroup from '../ButtonGroup';
import Dropdown from '../Dropdown';
import Menu, { Item } from '../Menu';

const ZOOM_FACTOR = 0.5;
const ZOOM_OPTIONS = [
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

export type Props = {
  /** The current scale / zoom level. 1 by default. */
  scale?: number;
  /** Callback when scale / zoom changes */
  onSetScale: (scale: number) => void;
};

export function ZoomControls(props: Props & WithStylesProps) {
  const [visible, setVisible] = useState(false);
  const { onSetScale, scale = 1, cx, styles } = props;

  function getItemOnClick(value: number) {
    return () => onSetScale(value);
  }

  const zoomOptions = ZOOM_OPTIONS.map((zoom: { label: string; scale: number }) => ({
    ...zoom,
    handleOnClick: getItemOnClick(zoom.scale),
  }));

  const zoomOut = () => onSetScale(scale - ZOOM_FACTOR);
  const zoomIn = () => onSetScale(scale + ZOOM_FACTOR);
  const toggleZoomMenu = () => setVisible(!visible);

  return (
    <div className={cx(styles.controls)}>
      <ButtonGroup>
        <IconButton onClick={zoomOut} disabled={scale === 1}>
          <IconRemove accessibilityLabel="Zoom out" size="2em" />
        </IconButton>
        <Button borderless onClick={toggleZoomMenu}>
          {scale * 100}%
        </Button>
        <IconButton onClick={zoomIn}>
          <IconAdd accessibilityLabel="Zoom in" size="2em" />
        </IconButton>
      </ButtonGroup>
      {visible && (
        <Dropdown visible left="0" onClickOutside={toggleZoomMenu} zIndex={5}>
          <Menu accessibilityLabel="Zoom dropdown menu">
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

export default withStyles(() => ({
  controls: {
    position: 'relative',
    display: 'inline-block',
  },
}))(ZoomControls);
