import React, { useState } from 'react';
import space from ':storybook/images/space.jpg';
import ImageViewer, { ZoomControls, RotateControls } from '.';
import Row from '../Row';

type ImageViewerDemoProps = {
  width?: string;
  height?: string;
  controlsBottom?: boolean;
};

function ImageViewerDemo({ width, height, controlsBottom }: ImageViewerDemoProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  return controlsBottom ? (
    <>
      <ImageViewer
        alt="Testing"
        scale={scale}
        src={space}
        rotation={rotation}
        height={height}
        width={width}
      />
      <Row
        before={
          <RotateControls rotation={rotation} onRotation={(value: number) => setRotation(value)} />
        }
      >
        <ZoomControls dropdownAbove scale={scale} onScale={(value: number) => setScale(value)} />
      </Row>
    </>
  ) : (
    <>
      <Row
        before={
          <RotateControls rotation={rotation} onRotation={(value: number) => setRotation(value)} />
        }
      >
        <ZoomControls scale={scale} onScale={(value: number) => setScale(value)} />
      </Row>
      <ImageViewer
        alt="Testing"
        scale={scale}
        src={space}
        rotation={rotation}
        height={height}
        width={width}
      />
    </>
  );
}

export default {
  title: 'Core/ImageViewer',
  parameters: {
    inspectComponents: [ImageViewer, ZoomControls, RotateControls],
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
