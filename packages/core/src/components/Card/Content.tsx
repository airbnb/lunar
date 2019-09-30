import React from 'react';
import PropTypes from 'prop-types';
import { mutuallyExclusiveProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Image from '../Image';
import Row from '../Row';
import Spacing from '../Spacing';

function getSideImageWidth({ large, small }: { large?: boolean; small?: boolean }): number {
  if (small) {
    return 80;
  }

  if (large) {
    return 195;
  }

  return 152;
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
  /** If provided, makes the entire content clickable, firing this callback. */
  onClick?: () => void;
};

/** Content block within a card. */
export class CardContent extends React.Component<Props & WithStylesProps> {
  static propTypes = {
    after: afterPropType,
    afterImageSrc: imageUrlTypePropType,
    before: beforePropType,
    beforeImageSrc: imageUrlTypePropType,
    large: imageSizePropType,
    small: imageSizePropType,
    topImageSrc: imageUrlTypePropType,
  };

  render() {
    const {
      after,
      afterImageSrc,
      before,
      beforeImageSrc,
      children,
      compact,
      cx,
      large,
      maxHeight,
      middleAlign,
      minHeight,
      onClick,
      small,
      styles,
      topImageSrc,
      truncated,
    } = this.props;

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
}

export default withStyles(({ color, pattern, ui, unit }) => ({
  container: {
    borderBottom: ui.border,

    ':last-child': {
      borderBottom: 0,
    },
  },

  container_button: {
    ...pattern.resetButton,
    borderBottom: ui.border,
    display: 'block',
    textAlign: 'left',
    width: '100%',

    '@selectors': {
      ':hover, :focus': {
        backgroundColor: color.accent.bgHover,
        outline: 'none',
      },
    },
  },

  side: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingTop: unit * 3,
    paddingBottom: unit * 3,
  },

  side_compact: {
    paddingTop: unit * 1.5,
    paddingBottom: unit * 1.5,
  },

  after: {
    paddingRight: unit * 3,
  },

  after_compact: {
    paddingRight: unit * 1.5,
  },

  before: {
    paddingLeft: unit * 3,
  },

  before_compact: {
    paddingLeft: unit * 1.5,
  },

  image: {
    display: 'block',
    objectFit: 'cover',
  },

  topImage: {
    height: 105,
  },

  topImage_large: {
    height: 195,
  },
}))(CardContent);
