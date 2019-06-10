import React from 'react';
import PropTypes from 'prop-types';
import { and, mutuallyExclusiveProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';

const mutuallyExclusiveSizePropType = mutuallyExclusiveProps(
  PropTypes.any,
  'small',
  'large',
  'macro',
  'size',
);
const namedSizePropType = and([PropTypes.bool, mutuallyExclusiveSizePropType]);
const unitSizePropType = and([PropTypes.number, mutuallyExclusiveSizePropType]);

export type Props = {
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

/** Display a profile photo. */
export class ProfilePhoto extends React.Component<Props & WithStylesProps> {
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

  render() {
    const {
      cx,
      imageSrc,
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
          src={imageSrc}
          alt={title}
          title={title}
        />
      </div>
    );
  }
}

export default withStyles(
  ({ color }) => ({
    inline: {
      display: 'inline-block',
    },
    image: {
      display: 'block',
      background: color.core.neutral[6],
      color: color.base,
      objectFit: 'cover',
      overflow: 'hidden',
    },
    roundedImage: {
      borderRadius: '50%',
    },
    small: {
      height: 24,
      width: 24,
      maxHeight: 24,
      maxWidth: 24,
    },
    regular: {
      height: 48,
      width: 48,
      maxHeight: 48,
      maxWidth: 48,
    },
    large: {
      height: 96,
      width: 96,
      maxHeight: 96,
      maxWidth: 96,
    },
    macro: {
      height: 160,
      width: 160,
      maxHeight: 160,
      maxWidth: 160,
    },
  }),
  {
    passThemeProp: true,
  },
)(ProfilePhoto);
