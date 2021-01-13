import React, { useState } from 'react';
import space from ':storybook/images/space.jpg';
import ImageViewer, { FilterControls, ZoomControls, RotateControls } from '.';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

type ImageViewerDemoProps = {
  width?: string;
  height?: string;
  controlsBottom?: boolean;
};

const styleSheet: StyleSheet = () => ({
  controls: {
    display: 'flex',
  },
});

function ImageViewerDemo({ width, height, controlsBottom }: ImageViewerDemoProps) {
  const [styles, cx] = useStyles(styleSheet);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  return controlsBottom ? (
    <>
      <ImageViewer
        alt="Testing"
        scale={scale}
        src={space}
        rotation={rotation}
        brightness={brightness}
        contrast={contrast}
        height={height}
        width={width}
      />
      <div className={cx(styles.controls)}>
        <FilterControls
          dropdownAbove
          brightness={brightness}
          contrast={contrast}
          onBrightnessChange={(value: number) => setBrightness(value)}
          onContrastChange={(value: number) => setContrast(value)}
        />
        <RotateControls rotation={rotation} onRotation={(value: number) => setRotation(value)} />
        <ZoomControls dropdownAbove scale={scale} onScale={(value: number) => setScale(value)} />
      </div>
    </>
  ) : (
    <>
      <div className={cx(styles.controls)}>
        <FilterControls
          brightness={brightness}
          contrast={contrast}
          onBrightnessChange={(value: number) => setBrightness(value)}
          onContrastChange={(value: number) => setContrast(value)}
        />
        <RotateControls rotation={rotation} onRotation={(value: number) => setRotation(value)} />
        <ZoomControls scale={scale} onScale={(value: number) => setScale(value)} />
      </div>
      <ImageViewer
        alt="Testing"
        scale={scale}
        src={space}
        rotation={rotation}
        brightness={brightness}
        contrast={contrast}
        height={height}
        width={width}
      />
    </>
  );
}

export default {
  title: 'Core/ImageViewer',
  parameters: {
    inspectComponents: [ImageViewer, ZoomControls, RotateControls, FilterControls],
  },
};

export function imageViewer() {
  return <ImageViewerDemo />;
}

imageViewer.story = {
  name: 'ImageViewer',
};

export function withSetWidthAndHeightLandscape() {
  return <ImageViewerDemo height="200px" width="400px" />;
}

withSetWidthAndHeightLandscape.story = {
  name: 'With set width and height, landscape.',
};

export function withSetWidthAndHeightPortrait() {
  return <ImageViewerDemo height="300px" width="250px" />;
}

withSetWidthAndHeightPortrait.story = {
  name: 'With set width and height, portrait.',
};

export function withControlsBottom() {
  return <ImageViewerDemo controlsBottom />;
}

withControlsBottom.story = {
  name: 'With dropdownAbove set.',
};
