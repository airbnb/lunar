import React from 'react';
import PropTypes from 'prop-types';
import { and, mutuallyExclusiveProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheet } from './styles';

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
};

type ProfilePhotoState = {
  src: string;
};

/** Display a profile photo. */
export class ProfilePhoto extends React.Component<
  ProfilePhotoProps & WithStylesProps,
  ProfilePhotoState
> {
  static propTypes = {
    large: namedSizePropType,
    macro: namedSizePropType,
    size: unitSizePropType,
    small: namedSizePropType,
  };

  // Do not supply defaults for the mutually exclusive props,
  // doing so will cause validation errors.
  static defaultProps = {
    inline: false,
    square: false,
  };

  state = {
    src: this.props.imageSrc || '',
  };

  componentDidUpdate(prevProps: ProfilePhotoProps & WithStylesProps) {
    const { imageSrc } = this.props;

    if (imageSrc !== prevProps.imageSrc) {
      this.setState({
        src: imageSrc,
      });
    }
  }

  private handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { fallbackImageSrc } = this.props;

    if (fallbackImageSrc) {
      this.setState({
        src: fallbackImageSrc,
      });
    }
  };

  render() {
    const { src } = this.state;
    const {
      cx,
      fallbackImageSrc,
      inline,
      macro,
      large,
      small,
      size,
      square,
      styles,
      title,
      theme,
    } = this.props;
    const { unit } = theme!;

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
          onError={fallbackImageSrc ? this.handleError : undefined}
        />
      </div>
    );
  }
}

export default withStyles(styleSheet, {
  passThemeProp: true,
})(ProfilePhoto);
