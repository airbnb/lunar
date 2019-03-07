import React from 'react';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';

export const MAX_HEIGHT_IMAGE = 720;
export const MAX_HEIGHT_IMAGE_SMALL = 420;

export type ModalImageConfig = {
  /** Responsive image sizes. Corresponds to `imageSrcSet`. */
  sizes?: string[];
  /** Responsive image source set. Corresponds to `imageSizes`. */
  srcSet?: string[];
  /** Should the image be centered, or should it cover its container? */
  type: 'center' | 'cover';
  /** Source of the image. */
  url: string;
};

export type Props = ModalImageConfig & {
  /** Left pane content. */
  children: NonNullable<React.ReactNode>;
};

class ModalImageLayout extends React.Component<Props & WithStylesProps> {
  render() {
    const { children, sizes, srcSet, type, url, styles } = this.props;

    return (
      <div {...css(styles.splitContent)}>
        <div {...css(styles.splitContentPane)}>{children}</div>
        <div {...css(styles.splitContentPane, styles.splitContentImagePane)}>
          {type === 'center' && (
            <img
              {...css(styles.image, styles.imageMaxHeight, styles.imageCentered)}
              src={url}
              srcSet={srcSet && srcSet.join(',')}
              sizes={sizes && sizes.join(',')}
              alt=""
            />
          )}
          {type === 'cover' && (
            <img
              {...css(styles.image, styles.imageCover)}
              src={url}
              srcSet={srcSet && srcSet.join(',')}
              alt=""
            />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(({ responsive }) => ({
  splitContent: {
    display: 'flex',
  },

  splitContentPane: {
    flex: '1',
  },

  splitContentImagePane: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',

    '@media': {
      [responsive.small]: {
        display: 'none',
      },
    },
  },

  image: {
    display: 'block',
    maxWidth: '100%',

    '@media': {
      [responsive.small]: {
        maxHeight: MAX_HEIGHT_IMAGE_SMALL,
      },
    },
  },

  imageMaxHeight: {
    maxHeight: MAX_HEIGHT_IMAGE,
  },

  imageCentered: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  imageCover: {
    height: '100%',
    minWidth: '100%',
    width: 'auto',
    maxWidth: 'none',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
}))(ModalImageLayout);
