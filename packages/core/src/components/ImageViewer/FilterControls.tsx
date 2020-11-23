import React, { useCallback, useState } from 'react';
import IconTune from '@airbnb/lunar-icons/lib/interface/IconTune';
import ButtonGroup from '../ButtonGroup';
import Card, { Content } from '../Card';
import Dropdown from '../Dropdown';
import IconButton from '../IconButton';
import Range from '../Range';
import Text from '../Text';
import T from '../Translate';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export type FilterControlsProps = {
  /** The current brightness. 1 by default. Valid range: 0 -> ∞. */
  brightness?: number;
  /** Callback when brightness changes. */
  onBrightnessChange: (brightness: number) => void;
  /** The current contrast. 1 by default. Valid range: 0 -> ∞. */
  contrast?: number;
  /** Callback when contrast changes. */
  onContrastChange: (contrast: number) => void;
  /** Size of the icons. */
  iconSize?: number | string;
  /** Place dropdown menu above. */
  dropdownAbove?: boolean;
};

const styleSheet: StyleSheet = () => ({
  controls: {
    position: 'relative',
  },
  filterLabel: {
    width: 100,
  },
  filterRow: {
    alignItems: 'baseline',
    display: 'flex',
  },
});

/** Filter controls that can be used with an image viewer component */
export default function FilterControls(props: FilterControlsProps) {
  const [styles, cx] = useStyles(styleSheet);
  const [visible, setVisible] = useState(false);

  const {
    onBrightnessChange,
    brightness = 1,
    onContrastChange,
    contrast = 1,
    iconSize = '2em',
    dropdownAbove,
  } = props;

  const handleBrightnessChange = useCallback(
    (v) => {
      onBrightnessChange(10 ** v);
    },
    [onBrightnessChange],
  );

  const handleContrastChange = useCallback(
    (v) => {
      onContrastChange(10 ** v);
    },
    [onContrastChange],
  );

  const toggleContrastPicker = useCallback(() => setVisible(!visible), [visible]);

  return (
    <ButtonGroup>
      <div className={cx(styles.controls)}>
        <IconButton onClick={toggleContrastPicker}>
          <IconTune
            accessibilityLabel={T.phrase('lunar.image.adjustContrast', 'Adjust contrast')}
            size={iconSize}
          />
        </IconButton>

        {visible && (
          <Dropdown
            visible={visible}
            bottom={dropdownAbove ? '100%' : undefined}
            left={0}
            zIndex={5}
            onClickOutside={toggleContrastPicker}
          >
            <Card>
              <Content>
                <div className={cx(styles.filterRow)}>
                  <div className={cx(styles.filterLabel)}>
                    <Text>{T.phrase('lunar.image.brightness', 'Brightness')}</Text>
                  </div>
                  <Range
                    hideLabel
                    label="brightness"
                    width={200}
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    value={Math.log10(brightness)}
                    onChange={handleBrightnessChange}
                  />
                </div>
                <div className={cx(styles.filterRow)}>
                  <div className={cx(styles.filterLabel)}>
                    <Text>{T.phrase('lunar.image.contrast', 'Contrast')}</Text>
                  </div>
                  <Range
                    hideLabel
                    label="contrast"
                    width={200}
                    min={-0.5}
                    max={0.5}
                    step={0.05}
                    value={Math.log10(contrast)}
                    onChange={handleContrastChange}
                  />
                </div>
              </Content>
            </Card>
          </Dropdown>
        )}
      </div>
    </ButtonGroup>
  );
}
