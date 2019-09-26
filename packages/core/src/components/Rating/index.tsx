import React from 'react';
import IconStar from '@airbnb/lunar-icons/lib/interface/IconStar';
import IconStarFull from '@airbnb/lunar-icons/lib/interface/IconStarFull';
import IconStarHalf from '@airbnb/lunar-icons/lib/interface/IconStarHalf';
import useTheme from '../../hooks/useTheme';
import Row from '../Row';
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
export default function Rating({ large, micro, rating = 0, reviews, small }: Props) {
  const theme = useTheme();

  return (
    <Text large={large} micro={micro} small={small}>
      <Row inline middleAlign after={reviews}>
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

          return <Star key={key} decorative color={color} size="1.15em" />;
        })}
      </Row>
    </Text>
  );
}
