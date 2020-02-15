import React from 'react';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { styleSheet } from './styles';

export const DEFAULT_BORDER_RADIUS = 6;
const objectFitPropType = mutuallyExclusiveTrueProps('contain', 'cover');

export type Props = {
  /** An accessible label. */
  alt: string;
  /** The css border-radius value. Defaults to 6 pixels. */
  borderRadius?: number;
  /** Hide the box-shadow. */
  noShadow?: boolean;
  /** Whether to have the image maintain its aspect ratio while contained in its dimentions or not. */
  contain?: boolean;
  /** Whether to have the image cover its dimensions or not. */
  cover?: boolean;
  /**
   * The maximum width of the image (and the component). Unconstrained (css value 'none') by
   * default. If the image is wider than the value given for maxWidth, it will be scaled
   * proportionally to be at most maxWidth wide. The image width will be less than maxWidth
   * if either its native size is smaller than this value or its height exceeds maxHeight and
   * proportionally scaling to fit maxHeight produces a width less than maxWidth.
   */
  maxWidth?: string | number;
  /**
   * The maximum height of the image (and the component). Unconstrained (css value 'none') by
   * default. If the image is taller than the value given for maxHeight, it will be scaled
   * proportionally to be at most maxHeight high. The image height will be less than maxHeight
   * if either its native size is smaller than this value or its width exceeds maxWidth and
   * proportionally scaling to fit maxWidth produces a height less than maxHeight.
   */
  maxHeight?: string | number;
  /** The source of the image. Typically a URL. */
  src: string;
  /** A component to be displayed while the the image is loading. Typically a Shimmer. */
  shimmer?: React.ReactNode;
};

export type State = {
  imageLoaded: boolean;
};

/** An image that is constrained proportionally in one or both dimensions. */
export class ResponsiveImage extends React.Component<Props & WithStylesProps, State> {
  static defaultProps = {
    borderRadius: DEFAULT_BORDER_RADIUS,
    contain: false,
    cover: false,
    maxHeight: 'none',
    maxWidth: 'none',
    noShadow: false,
    shimmer: null,
  };

  static propTypes = {
    contain: objectFitPropType,
    cover: objectFitPropType,
  };

  image?: HTMLImageElement;

  state = { imageLoaded: false };

  componentDidMount() {
    this.createAsyncImage();
  }

  componentDidUpdate({ src: previousSrc }: Props) {
    const { src: currentSrc } = this.props;

    if (currentSrc !== previousSrc) {
      this.removeImage();
      this.setState({ imageLoaded: false });
      this.createAsyncImage();
    }
  }

  componentWillUnmount() {
    this.removeImage();
  }

  createAsyncImage() {
    this.image = new Image();
    this.image.addEventListener('load', () => {
      this.handleAsyncImageLoad();
    });
    this.image.addEventListener('error', () => {
      this.handleAsyncImageLoad();
    });
    this.image.src = this.props.src;
  }

  removeImage() {
    if (this.image) {
      // Prevent these callbacks from being fired if they haven't fired yet.
      delete this.image.onload;
      delete this.image.onerror;
    }
  }

  private handleAsyncImageLoad() {
    // We no longer need the Image object, so let's remove it so it can be
    // garbage collected.
    delete this.image;

    this.setState({ imageLoaded: true });
  }

  render() {
    const {
      cx,
      alt,
      contain,
      cover,
      noShadow,
      maxWidth,
      maxHeight,
      src,
      borderRadius,
      shimmer,
      styles,
    } = this.props;
    const { imageLoaded } = this.state;

    if (!imageLoaded && shimmer) {
      return shimmer;
    }

    return (
      <img
        className={cx(
          styles.image,
          contain && styles.image_contain,
          cover && styles.image_cover,
          noShadow && styles.image_noShadow,
          {
            borderRadius,
            maxWidth,
            maxHeight,
          },
        )}
        src={src}
        width="100%"
        height="auto"
        alt={alt}
      />
    );
  }
}

export default withStyles(styleSheet)(ResponsiveImage);
