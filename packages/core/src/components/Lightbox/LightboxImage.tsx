import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import ResponsiveImage from '../ResponsiveImage';
import Loader from '../Loader';
import ImageViewer from '../ImageViewer';

export type LightboxImageProps = {
  alt: string;
  src: string;
  aside?: React.ReactNode;
  hideAside?: boolean;
  showZoomControls?: boolean;
  showRotateControls?: boolean;
  scale?: number;
  rotation?: number;
};

export class LightboxImage extends React.PureComponent<LightboxImageProps & WithStylesProps> {
  render() {
    const {
      cx,
      alt,
      aside,
      hideAside,
      src,
      styles,
      showZoomControls,
      showRotateControls,
      scale,
      rotation,
    } = this.props;

    return (
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.layout)}>
          <figure className={cx(styles.figure)}>
            {showZoomControls || showRotateControls ? (
              <ImageViewer
                alt={alt}
                src={src}
                scale={scale}
                rotation={rotation}
                width="100%"
                height="100%"
              />
            ) : (
              <ResponsiveImage
                contain
                noShadow
                alt={alt}
                borderRadius={0}
                src={src}
                maxWidth="100%"
                maxHeight="100%"
                shimmer={<Loader />}
              />
            )}
          </figure>

          {aside && !hideAside && <aside className={cx(styles.aside)}>{aside}</aside>}
        </div>
      </div>
    );
  }
}

export default withStyles(({ color, unit }) => ({
  wrapper: {
    position: 'relative',
    height: '100%',
  },

  layout: {
    display: 'flex',
    position: 'absolute',
    top: -unit * 3,
    right: -unit,
    left: -unit,
    bottom: -unit,
  },

  figure: {
    background: color.accent.bgHover,
    flexGrow: 1,
    margin: 0,
    position: 'relative',
  },

  aside: {
    width: 300,
    flexGrow: 0,
    flexShrink: 0,
    padding: unit * 3,
  },
}))(LightboxImage);
