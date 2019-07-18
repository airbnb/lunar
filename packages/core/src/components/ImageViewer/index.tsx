import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ZoomControls from './ZoomControls';
import RotateControls from './RotateControls';
import ResponsiveImage from '../ResponsiveImage';

const SCALE = 1;
const ROTATION = 0;

export type Props = {
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
};

export type State = {
  dragging: boolean;
  imageLocation: Position;
  lastMouseLocation: Position;
};

type Position = {
  x: number;
  y: number;
};

/** An image viewer that can zoom, drag, and rotate an image. */
export class ImageViewer extends React.Component<Props & WithStylesProps, State> {
  static defaultProps = {
    height: 'none',
    rotation: ROTATION,
    scale: SCALE,
    width: 'none',
  };

  state = {
    dragging: false,
    imageLocation: { x: 0, y: 0 },
    lastMouseLocation: { x: 0, y: 0 },
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseDown = (event: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({
      dragging: true,
      lastMouseLocation: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  };

  handleMouseUp = (event: MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({
      dragging: false,
      lastMouseLocation: { x: 0, y: 0 },
    });
  };

  handleMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    this.setState(({ dragging, imageLocation, lastMouseLocation }) => {
      if (dragging) {
        const xDiff = lastMouseLocation.x - event.pageX;
        const yDiff = lastMouseLocation.y - event.pageY;

        return {
          imageLocation: {
            x: imageLocation.x - xDiff,
            y: imageLocation.y - yDiff,
          },
          lastMouseLocation: {
            x: event.pageX,
            y: event.pageY,
          },
        };
      }

      return null;
    });
  };

  getTransformation() {
    const {
      imageLocation: { x, y },
    } = this.state;
    const { scale = SCALE, rotation = ROTATION } = this.props;

    const radian = (rotation / 180) * Math.PI;
    const sinRotation = Math.sin(radian);
    const cosRotation = Math.cos(radian);
    const translateX = (y * sinRotation + x * cosRotation) / scale;
    const translateY = (y * cosRotation - x * sinRotation) / scale;

    return {
      transform: `scale(${scale}) rotate(${rotation}deg) translateY(${translateY}px) translateX(${translateX}px)`,
    };
  }

  render() {
    const { alt, borderless, height, src, width, cx, styles } = this.props;

    return (
      <div
        className={cx(styles.container, borderless && styles.container_borderless)}
        role="presentation"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        style={{ width, height }}
      >
        <div className={cx(styles.image)} style={this.getTransformation()}>
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
}

export { ZoomControls, RotateControls };

export default withStyles(({ color, font }) => ({
  container: {
    border: `1px solid ${color.core.neutral[2]}`,
    cursor: 'move',
    display: 'flex',
    align: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  container_borderless: {
    borderColor: 'transparent',
  },

  image: {
    display: 'inline-block',
  }
}))(ImageViewer);
