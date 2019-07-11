import React from 'react';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';

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
    const { cx, children, sizes, srcSet, type, url, styles } = this.props;

    return (
      <div className={cx(styles.splitContent)}>
        <div className={cx(styles.splitContentPane)}>{children}</div>
        <div className={cx(styles.splitContentPane, styles.splitContentImagePane)}>
          {type === 'center' && (
            <img
              className={cx(styles.image)}
              src={url}
              srcSet={srcSet && srcSet.join(',')}
              sizes={sizes && sizes.join(',')}
              alt=""
            />
          )}

          {type === 'cover' && (
            <img
              className={cx(styles.image, styles.imageCover)}
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

export default withStyles(({ responsive, ui, unit }) => ({
  splitContent: {
    display: 'flex',
  },

  splitContentPane: {
    flex: '1',
  },

  splitContentImagePane: {
    borderLeft: ui.border,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',

    '@media': {
      [responsive.xsmall]: {
        display: 'none',
      },
    },
  },

  image: {
    display: 'block',
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: unit * 3,
  },

  imageCover: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    margin: 0,
  },
}))(ModalImageLayout);
