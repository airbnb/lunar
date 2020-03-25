import React, { useState, useEffect } from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import ZoomControls from './ZoomControls';
import RotateControls from './RotateControls';
import ResponsiveImage from '../ResponsiveImage';
import { styleSheetImageViewer } from './styles';

export type ImageViewerProps = {
  /** An accessible label. */
  alt: string;
  /** Render as borderless. */
  borderless?: boolean;
  /** Render height. Unconstrained (css value 'none') by default. */
  height?: number | string;
  /** The current rotation. 0 by default. */
  rotation?: number;
  /** The source of the image. Typically a URL. */
  src: string;
  /** The current scale / zoom level. 1 by default. */
  scale?: number;
  /** Render width. Unconstrained (css value 'none') by default. */
  width?: number | string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export type Position = {
  x: number;
  y: number;
};

/** An image viewer that can zoom, drag, and rotate an image. */
export default function ImageViewer({
  alt,
  borderless,
  height = 'none',
  rotation = 0,
  scale = 1,
  src,
  width,
  styleSheet,
}: ImageViewerProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetImageViewer);
  const [dragging, setDragging] = useState(false);
  const [imageLocation, setImageLocation] = useState<Position>({ x: 0, y: 0 });
  const [lastMouseLocation, setMouseLocation] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = (event: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    setDragging(true);
    setMouseLocation({
      x: event.pageX,
      y: event.pageY,
    });
  };

  const handleMouseUp = (event: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    setDragging(false);
    setMouseLocation({
      x: 0,
      y: 0,
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();

    if (!dragging) {
      return;
    }

    const xDiff = lastMouseLocation.x - event.pageX;
    const yDiff = lastMouseLocation.y - event.pageY;

    setImageLocation((prev) => ({
      x: prev.x - xDiff,
      y: prev.y - yDiff,
    }));

    setMouseLocation({
      x: event.pageX,
      y: event.pageY,
    });
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, false);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
    };
  });

  const { x, y } = imageLocation;
  const radian = (rotation / 180) * Math.PI;
  const sinRotation = Math.sin(radian);
  const cosRotation = Math.cos(radian);
  const translateX = (y * sinRotation + x * cosRotation) / scale;
  const translateY = (y * cosRotation - x * sinRotation) / scale;
  const transform = `scale(${scale}) rotate(${rotation}deg) translateY(${translateY}px) translateX(${translateX}px)`;

  return (
    <div
      className={cx(styles.container, borderless && styles.container_borderless)}
      role="presentation"
      style={{ width, height }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={cx(styles.image)} style={{ transform }}>
        <ResponsiveImage
          contain
          noShadow
          alt={alt}
          borderRadius={0}
          maxWidth={width}
          maxHeight={height}
          src={src}
        />
      </div>
    </div>
  );
}

export { ZoomControls, RotateControls };
