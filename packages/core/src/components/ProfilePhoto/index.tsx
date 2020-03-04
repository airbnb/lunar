import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { and, mutuallyExclusiveProps } from 'airbnb-prop-types';
import { styleSheetProfilePhoto } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';

const mutuallyExclusiveSizePropType = mutuallyExclusiveProps(
  PropTypes.any,
  'small',
  'large',
  'macro',
  'size',
);
const namedSizePropType = and([PropTypes.bool, mutuallyExclusiveSizePropType]);
const unitSizePropType = and([PropTypes.number, mutuallyExclusiveSizePropType]);

export type ProfilePhotoProps = {
  /** Fallback image if the image is broken. */
  fallbackImageSrc?: string;
  /** URL of the image to display. */
  imageSrc: string;
  /** Whether the component should be inline. */
  inline?: boolean;
  /** Large size (96px). */
  large?: boolean;
  /** Macro size (160px). */
  macro?: boolean;
  /** Size in units to multiply by. */
  size?: number;
  /** Small size (24px). */
  small?: boolean;
  /** Whether the image should be square (it is rounded by default). */
  square?: boolean;
  /** Accessibility text for the Photo. */
  title: string;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Display a profile photo. */
function ProfilePhoto({
  fallbackImageSrc,
  inline,
  macro,
  large,
  small,
  size,
  square,
  title,
  imageSrc,
  styleSheet,
}: ProfilePhotoProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetProfilePhoto);
  const { unit } = useTheme();
  const [src, setSrc] = useState(imageSrc);

  useEffect(() => {
    setSrc(imageSrc);
  }, [imageSrc]);

  const handleError = () => {
    setSrc(fallbackImageSrc!);
  };

  return (
    <div
      className={cx(
        inline && styles.inline,
        styles.regular,
        macro && styles.macro,
        large && styles.large,
        small && styles.small,
        !!size &&
          size > 0 && {
            height: size * unit,
            maxHeight: size * unit,
            maxWidth: size * unit,
            width: size * unit,
          },
      )}
    >
      <img
        className={cx(
          styles.image,
          styles.regular,
          !square && styles.roundedImage,
          macro && styles.macro,
          large && styles.large,
          small && styles.small,
          !!size &&
            size > 0 && {
              height: size * unit,
              maxHeight: size * unit,
              maxWidth: size * unit,
              width: size * unit,
            },
        )}
        src={src}
        alt={title}
        title={title}
        onError={fallbackImageSrc ? handleError : undefined}
      />
    </div>
  );
}

ProfilePhoto.propTypes = {
  large: namedSizePropType,
  macro: namedSizePropType,
  size: unitSizePropType,
  small: namedSizePropType,
};

export default ProfilePhoto;
