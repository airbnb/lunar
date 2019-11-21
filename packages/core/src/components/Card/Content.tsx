import React from 'react';
import PropTypes from 'prop-types';
import { mutuallyExclusiveProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import Image from '../Image';
import Row from '../Row';
import Spacing from '../Spacing';
import { styleSheetContent as styleSheet } from './styles';
import ButtonOrLink from '../private/ButtonOrLink';

function getSideImageWidth({ large, small }: { large?: boolean; small?: boolean }): number {
  if (small) {
    return 80;
  }

  if (large) {
    return 195;
  }

  return 152;
}

export type Props = {
  /** Content to display following the primary content. Takes priority over `afterImageSrc`. */
  after?: React.ReactNode;
  /** Right image URL. */
  afterImageSrc?: string;
  /** Content to display before the primary content. Takes priority over `beforeImageSrc`. */
  before?: React.ReactNode;
  /** Left image URL. */
  beforeImageSrc?: string;
  /** Content to display. */
  children: NonNullable<React.ReactNode>;
  /** Decrease padding. */
  compact?: boolean;
  /** Whether the image content is large. */
  large?: boolean;
  /** Max height of content. */
  maxHeight?: number | string;
  /** Align contents in the middle vertically. */
  middleAlign?: boolean;
  /** Min height of content. */
  minHeight?: number | string;
  /** Whether the image content is small. */
  small?: boolean;
  /** Top image URL. */
  topImageSrc?: string;
  /** To use with text truncation; overflow is hidden. */
  truncated?: boolean;
  /** If provided, makes the after image clickable, firing this callback. */
  onAfterImageClick?: () => void;
  /** If provided, makes the before image clickable, firing this callback. */
  onBeforeImageClick?: () => void;
  /** If provided, makes the entire content clickable, firing this callback. */
  onClick?: () => void;
};

/** Content block within a card. */
function CardContent({
  after,
  afterImageSrc,
  before,
  beforeImageSrc,
  children,
  compact,
  large,
  maxHeight,
  middleAlign,
  minHeight,
  onClick,
  small,
  topImageSrc,
  truncated,
  onAfterImageClick,
  onBeforeImageClick,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  const ContainerTag = onClick ? 'button' : 'div';
  const props = onClick ? { type: 'button', onClick } : {};
  const spacing = compact ? 1.5 : 3;
  const horizontalSpacing = compact ? 0 : 1;

  let afterContent = after ? (
    <div
      className={cx(
        styles.side,
        compact && styles.side_compact,
        styles.after,
        compact && styles.after_compact,
      )}
    >
      {after}
    </div>
  ) : null;

  if (!afterContent && afterImageSrc) {
    afterContent = (
      <Image
        background
        cover
        alt=""
        height="100%"
        width={getSideImageWidth({ large, small })}
        src={afterImageSrc}
      />
    );

    if (onAfterImageClick) {
      afterContent = (
        <ButtonOrLink className={cx(styles.sideButton)} onClick={onAfterImageClick}>
          {afterContent}
        </ButtonOrLink>
      );
    }
  }

  let beforeContent = before ? (
    <div
      className={cx(
        styles.side,
        compact && styles.side_compact,
        styles.before,
        compact && styles.before_compact,
      )}
    >
      {before}
    </div>
  ) : null;

  if (!beforeContent && beforeImageSrc) {
    beforeContent = (
      <Image
        background
        cover
        alt=""
        height="100%"
        width={getSideImageWidth({ large, small })}
        src={beforeImageSrc}
      />
    );

    if (onBeforeImageClick) {
      beforeContent = (
        <ButtonOrLink className={cx(styles.sideButton)} onClick={onBeforeImageClick}>
          {beforeContent}
        </ButtonOrLink>
      );
    }
  }

  return (
    // @ts-ignore [ts] JSX element type 'ContainerTag' does not have any construct or call signatures. [2604]
    <ContainerTag {...props} className={cx(styles.container, onClick && styles.container_button)}>
      {topImageSrc && (
        <div className={cx(styles.topImage, large && styles.topImage_large)}>
          <img className={cx(styles.image)} alt="" height="100%" src={topImageSrc} width="100%" />
        </div>
      )}

      <Row
        after={afterContent}
        before={beforeContent}
        maxHeight={maxHeight}
        middleAlign={middleAlign}
        minHeight={minHeight}
        truncated={truncated}
      >
        <Spacing
          inner
          left={beforeContent ? horizontalSpacing : spacing}
          right={afterContent ? horizontalSpacing : spacing}
          vertical={spacing}
        >
          {children}
        </Spacing>
      </Row>
    </ContainerTag>
  );
}

const imageUrlTypePropType = mutuallyExclusiveProps(
  PropTypes.string,
  'beforeImageSrc',
  'afterImageSrc',
  'topImageSrc',
);

const afterPropType = mutuallyExclusiveProps(
  PropTypes.oneOfType([PropTypes.node, imageUrlTypePropType]),
  'after',
  'afterImageSrc',
);

const beforePropType = mutuallyExclusiveProps(
  PropTypes.oneOfType([PropTypes.node, imageUrlTypePropType]),
  'before',
  'beforeImageSrc',
);

const imageSizePropType = mutuallyExclusiveProps(PropTypes.bool, 'small', 'large');

CardContent.propTypes = {
  after: afterPropType,
  afterImageSrc: imageUrlTypePropType,
  before: beforePropType,
  beforeImageSrc: imageUrlTypePropType,
  large: imageSizePropType,
  small: imageSizePropType,
  topImageSrc: imageUrlTypePropType,
};

export default CardContent;
