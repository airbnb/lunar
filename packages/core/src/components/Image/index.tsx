import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

const ANIMATION_DURATION_MS = 300;
const IMAGE_BORDER_RADIUS = 3;

const bottomBorderPropType = mutuallyExclusiveTrueProps('hasBorderBottomRadius', 'hasBorderRadius');
const topBorderPropType = mutuallyExclusiveTrueProps('hasBorderTopRadius', 'hasBorderRadius');
const fitPropType = mutuallyExclusiveTrueProps('fit', 'background');

export type Props = {
  /** Alternate text if image cannot be displayed */
  alt: string;
  /** Specified when image is not directly a part of the content */
  background?: boolean;
  /** Sets top or bottom background position */
  backgroundPositionY?: string;
  /** Contain vs Cover for background image */
  backgroundSize?: string;
  /** For cross-origin resources */
  crossOrigin?: boolean;
  /** Align item inside container when `background` is not specified */
  fit?: boolean;
  /** Has rounded bottom corners */
  hasBorderBottomRadius?: boolean;
  /** All corners rounded. If specified, using `hasBorderBottomRadius` or `hasBorderTopRadius` is redundant */
  hasBorderRadius?: boolean;
  /** Has rounded top corners */
  hasBorderTopRadius?: boolean;
  /** Height of content */
  height?: number | string;
  /** Source for image */
  src: string;
  /** Img title */
  title?: string;
  /** Width of content */
  width?: number | string;
  /** Srcset for img tag */
  srcset?: string;
};

/** Component that displays an image */
class Image extends React.Component<Props & WithStylesProps> {
  static defaultProps = {
    background: false,
    backgroundPositionY: '',
    backgroundSize: 'cover',
    crossOrigin: false,
    hasBorderBottomRadius: false,
    hasBorderRadius: false,
    hasBorderTopRadius: false,
    height: 'auto',
    width: '100%',
  };

  static propTypes = {
    hasBorderBottomRadius: bottomBorderPropType,
    hasBorderTopRadius: topBorderPropType,
    fit: fitPropType,
  };

  render() {
    const {
      cx,
      alt,
      background,
      backgroundPositionY,
      backgroundSize,
      crossOrigin,
      hasBorderBottomRadius,
      hasBorderRadius,
      hasBorderTopRadius,
      height,
      src,
      styles,
      title,
      width,
      fit,
      srcset,
    } = this.props;

    let backgroundAriaLabel = {};

    if (alt) {
      backgroundAriaLabel = {
        role: 'img',
        'aria-label': alt,
      };
    }

    return (
      <div className={cx(fit && styles.fitContainer, styles.container, { width, height })}>
        {background && (
          <div
            className={cx(
              styles.image,
              styles.background,
              styles.fadeIn,
              (hasBorderRadius || hasBorderBottomRadius) && styles.borderBottomRadius,
              (hasBorderRadius || hasBorderTopRadius) && styles.borderTopRadius,
              backgroundSize === 'cover' && styles.backgroundSize_cover,
              backgroundSize === 'contain' && styles.backgroundSize_contain,
              backgroundPositionY === 'top' && styles.backgroundPosition_top,
              backgroundPositionY === 'bottom' && styles.backgroundPosition_bottom,
              { width, height, backgroundImage: `url(${src})` },
            )}
            {...backgroundAriaLabel}
          />
        )}
        {!background && (
          <img
            className={cx(
              fit && styles.fitImage,
              styles.image,
              styles.fadeIn,
              (hasBorderRadius || hasBorderBottomRadius) && styles.borderBottomRadius,
              (hasBorderRadius || hasBorderTopRadius) && styles.borderTopRadius,
            )}
            crossOrigin={crossOrigin ? 'anonymous' : undefined}
            src={src != null ? src : undefined}
            srcSet={srcset != null ? srcset : undefined}
            width={width != null ? width : undefined}
            height={height != null ? height : undefined}
            alt={alt != null ? alt : undefined}
            title={title != null ? title : undefined}
          />
        )}
      </div>
    );
  }
}

export default withStyles(() => ({
  container: {
    position: 'relative',
  },

  fitContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fitImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
  },

  fadeIn: {
    animationName: {
      from: {
        opacity: 0,
      },

      to: {
        opacity: 1,
      },
    },

    animationDuration: `${ANIMATION_DURATION_MS}ms`,
    animationTimingFunction: 'ease-out',
  },

  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  shimmer_fadeOut: {
    animationName: {
      from: {
        opacity: 1,
      },

      to: {
        opacity: 0,
      },
    },

    animationDuration: `${ANIMATION_DURATION_MS}ms`,
    animationTimingFunction: 'ease-out',
  },

  image: {
    position: 'absolute',
  },

  borderBottomRadius: {
    borderBottomLeftRadius: IMAGE_BORDER_RADIUS,
    borderBottomRightRadius: IMAGE_BORDER_RADIUS,
  },

  borderTopRadius: {
    borderTopLeftRadius: IMAGE_BORDER_RADIUS,
    borderTopRightRadius: IMAGE_BORDER_RADIUS,
  },

  background: {
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },

  backgroundSize_cover: {
    backgroundSize: 'cover',
  },

  backgroundSize_contain: {
    backgroundSize: 'contain',
  },

  backgroundPosition_top: {
    backgroundPosition: 'top',
  },

  backgroundPosition_bottom: {
    backgroundPosition: 'bottom',
  },
}))(Image);
