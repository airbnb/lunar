import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

const backgroundAlignPropType = mutuallyExclusiveTrueProps('alignBottom', 'alignTop');
const objectFitPropType = mutuallyExclusiveTrueProps('contain', 'cover');

const styleSheet: StyleSheet = ({ ui }) => ({
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

  borderRadius: {
    borderRadius: ui.borderRadius,
  },

  container: {
    position: 'relative',
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

  image: {
    position: 'absolute',
  },
});

export type Props = {
  /** Sets background to bottom of image */
  alignBottom?: boolean;
  /** Sets background to top of image */
  alignTop?: boolean;
  /** Alternate text if image cannot be displayed */
  alt: string;
  /** Specified when image is not directly a part of the content */
  background?: boolean;
  /** Override default theme border radius */
  borderRadius?: number;
  /** Fit inside content box */
  contain?: boolean;
  /** Fill entire content box */
  cover?: boolean;
  /** For cross-origin resources */
  crossOrigin?: boolean;
  /** Height of content */
  height?: number | string;
  /** Source for image */
  src: string;
  /** Srcset for img tag */
  srcSet?: string;
  /** Img title */
  title?: string;
  /** Width of content */
  width?: number | string;
};

/** Component that displays an image */
function Image({
  alignBottom = false,
  alignTop = false,
  alt,
  background = false,
  borderRadius,
  contain = false,
  cover = false,
  crossOrigin = false,
  height = 'auto',
  src,
  srcSet,
  title,
  width = '100%',
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
        height,
        width,
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
            alignTop && styles.backgroundPosition_top,
            alignBottom && styles.backgroundPosition_bottom,
            { width, height, backgroundImage: `url(${src})` },
          )}
          {...backgroundAriaLabel}
        />
      ) : (
        <img
          className={cx(
            borderRadius === undefined ? styles.borderRadius : { borderRadius },
            contain && styles.fitImage,
            styles.fadeIn,
            styles.image,
          )}
          alt={alt}
          crossOrigin={crossOrigin ? 'anonymous' : undefined}
          height={height}
          src={src}
          srcSet={srcSet}
          title={title}
          width={width}
        />
      )}
    </div>
  );
}

Image.propTypes = {
  alignBottom: backgroundAlignPropType,
  alignTop: backgroundAlignPropType,
  contain: objectFitPropType,
  cover: objectFitPropType,
};

export default Image;
