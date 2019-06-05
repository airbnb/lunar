import React from 'react';
import { between } from 'airbnb-prop-types';
import IconStar from '@airbnb/lunar-icons/lib/interface/IconStar';
import IconStarFull from '@airbnb/lunar-icons/lib/interface/IconStarFull';
import IconStarHalf from '@airbnb/lunar-icons/lib/interface/IconStarHalf';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import Spacing from '../Spacing';
import Text from '../Text';

const NUMBER_OF_STARS = 5;
const STARS = new Array(NUMBER_OF_STARS).fill(null);

export type Props = {
  /** Increase font size to large. */
  large?: boolean;
  /** Decrease font size to small. */
  micro?: boolean;
  /** Star rating number. */
  rating?: number;
  /** Review display number. */
  reviews?: string | number;
  /** Decrease font size to small. */
  small?: boolean;
};

/** Display a star rating and review count. */
export class Rating extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    rating: between({ gte: 0, lte: NUMBER_OF_STARS }),
  };

  static defaultProps = {
    large: false,
    micro: false,
    rating: 0,
    reviews: '',
    small: false,
  };

  render() {
    const { large, micro, rating = 0, reviews, small, styles, theme } = this.props;

    return (
      <Text large={large} micro={micro} small={small}>
        <div
          {...css(
            styles.ratingContainer,
            large && styles.ratingContainer_large,
            micro && styles.ratingContainer_micro,
            small && styles.ratingContainer_small,
          )}
        >
          {STARS.map((star, index) => {
            const key = `star-${index}`;
            const color =
              rating > index || (rating > index && rating < index + 1)
                ? theme!.color.core.primary[3]
                : theme!.color.core.neutral[3];
            let Star = IconStar;

            if (rating > index && rating < index + 1) {
              Star = IconStarHalf;
            } else if (rating > index) {
              Star = IconStarFull;
            }

            return <Star key={key} color={color} size="1.15em" decorative />;
          })}

          {reviews && <Spacing left={reviews ? 0.5 : 0}>{reviews}</Spacing>}
        </div>
      </Text>
    );
  }
}

export default withStyles(
  ({ font }) => ({
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      height: font.textRegular.lineHeight,
    },

    ratingContainer_large: {
      height: font.textLarge.lineHeight,
    },

    ratingContainer_micro: {
      height: font.textMicro.lineHeight,
    },

    ratingContainer_small: {
      height: font.textSmall.lineHeight,
    },
  }),
  {
    passThemeProp: true,
  },
)(Rating);
