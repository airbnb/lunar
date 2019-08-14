import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

const objectFitPropType = mutuallyExclusiveTrueProps('contain', 'cover');

const styleSheet: StyleSheet = ({ ui }) => ({
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

    animationDuration: ui.transitionTime,
    animationTimingFunction: 'ease-out',
  },

  image: {
    position: 'absolute',
  },

  borderRadius: {
    borderRadius: ui.borderRadius,
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
});

export type Props = {
  /** Alternate text if image cannot be displayed */
  alt: string;
  /** Specified when image is not directly a part of the content */
  background?: boolean;
  /** Sets top or bottom background position */
  backgroundPositionY?: string;
  /** Fit inside content box */
  contain?: boolean;
  /** Fill entire content box */
  cover?: boolean;
  /** For cross-origin resources */
  crossOrigin?: boolean;
  /** Overrride default theme border radius */
  borderRadius?: number;
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
function Image({
  alt,
  background = false,
  backgroundPositionY = '',
  contain = false,
  cover = false,
  crossOrigin = false,
  borderRadius,
  height = 'auto',
  src,
  title,
  width = '100%',
  srcset,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  let backgroundAriaLabel = {};

  if (alt) {
    backgroundAriaLabel = {
      role: 'img',
      'aria-label': alt,
    };
  }

  return (
    <div
      className={cx(contain && styles.fitContainer, styles.container, {
        width,
        height,
      })}
    >
      {background ? (
        <div
          className={cx(
            styles.image,
            styles.background,
            styles.fadeIn,
            cover && styles.backgroundSize_cover,
            contain && styles.backgroundSize_contain,
            backgroundPositionY === 'top' && styles.backgroundPosition_top,
            backgroundPositionY === 'bottom' && styles.backgroundPosition_bottom,
            { width, height, backgroundImage: `url(${src})` },
          )}
          {...backgroundAriaLabel}
        />
      ) : (
        <img
          className={cx(
            contain && styles.fitImage,
            styles.image,
            styles.fadeIn,
            borderRadius === undefined ? styles.borderRadius : { borderRadius },
          )}
          crossOrigin={crossOrigin ? 'anonymous' : undefined}
          src={src}
          srcSet={srcset}
          width={width}
          height={height}
          alt={alt}
          title={title}
        />
      )}
    </div>
  );
}

Image.propTypes = {
  contain: objectFitPropType,
  cover: objectFitPropType,
};

export default Image;
