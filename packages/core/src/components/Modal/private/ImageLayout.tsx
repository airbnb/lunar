import React from 'react';
import useStyles from '../../../hooks/useStyles';
import { styleSheetImageLayout as styleSheet } from '../styles';

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

export type ModalImageLayoutProps = ModalImageConfig & {
  /** Left pane content. */
  children: NonNullable<React.ReactNode>;
};

export default function ModalImageLayout({
  children,
  sizes,
  srcSet,
  type,
  url,
}: ModalImageLayoutProps) {
  const [styles, cx] = useStyles(styleSheet);

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
