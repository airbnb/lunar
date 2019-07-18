import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import space from ':storybook/images/space.jpg';
import ImageViewer, { ZoomControls, RotateControls } from './ImageViewer';

type ImageViewerDemoProps = {
  width?: string;
  height?: string;
};

function ImageViewerDemo({ width, height }: ImageViewerDemoProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  return (
    <>
      <RotateControls onRotation={(value: number) => setRotation(value)} rotation={rotation} />
      <ZoomControls onScale={(value: number) => setScale(value)} scale={scale} />
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

storiesOf('Core/ImageViewer', module)
  .addParameters({
    inspectComponents: [ImageViewer, ZoomControls, RotateControls],
  })
  .add('ImageViewer', () => <ImageViewerDemo />)
  .add('With set width and height, landscape.', () => (
    <ImageViewerDemo height="200px" width="400px" />
  ))
  .add('With set width and height, portrait.', () => (
    <ImageViewerDemo height="300px" width="250px" />
  ));
