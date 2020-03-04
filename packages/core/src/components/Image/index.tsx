import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

const backgroundAlignPropType = mutuallyExclusiveTrueProps('alignBottom', 'alignTop');
const objectFitPropType = mutuallyExclusiveTrueProps('contain', 'cover');

export const styleSheetImage: StyleSheet = ({ color, ui }) => ({
  backdrop: {
    backgroundColor: color.core.neutral[0],
  },

  background: {
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
  },

  backgroundSize_cover: {
    backgroundColor: color.accent.bgHover,
    backgroundSize: 'cover',
  },

  backgroundSize_contain: {
    backgroundColor: color.accent.bg,
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
        opacity: 0.1,
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

export type ImageProps = {
  /** Sets background to bottom of image */
  alignBottom?: boolean;
  /** Sets background to top of image */
  alignTop?: boolean;
  /** Alternate text if image cannot be displayed */
  alt: string;
  /** Sets a neutral background color */
  backdrop?: boolean;
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
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Component that displays an image */
function Image({
  alignBottom = false,
  alignTop = false,
  alt,
  backdrop = false,
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
  styleSheet,
}: ImageProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetImage);

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
            backdrop && styles.backdrop,
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
