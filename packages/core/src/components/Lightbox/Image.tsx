import React from 'react';
import useStyles from '../../hooks/useStyles';
import ResponsiveImage from '../ResponsiveImage';
import Loader from '../Loader';
import ImageViewer from '../ImageViewer';
import { styleSheetImage as styleSheet } from './styles';

export type Props = {
  /** Image alt text */
  alt: string;
  /** React node for sidebar. */
  aside?: React.ReactNode;
  /** Hide sidebar. */
  hideAside?: boolean;
  /** Image rotation value. */
  rotation?: number;
  /** Image scale value. */
  scale?: number;
  /** Show rotate controls. */
  showRotateControls?: boolean;
  /** Show zoom controls. */
  showZoomControls?: boolean;
  /** Image src */
  src: string;
};

export default function Image({
  alt,
  aside,
  hideAside,
  src,
  showZoomControls,
  showRotateControls,
  scale,
  rotation,
}: Props) {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.wrapper)}>
      <div className={cx(styles.layout)}>
        <figure className={cx(styles.figure)}>
          {showZoomControls || showRotateControls ? (
            <ImageViewer
              alt={alt}
              src={src}
              scale={scale}
              rotation={rotation}
              width="100%"
              height="100%"
            />
          ) : (
            <ResponsiveImage
              contain
              noShadow
              alt={alt}
              borderRadius={0}
              src={src}
              maxWidth="100%"
              maxHeight="100%"
              shimmer={<Loader />}
            />
          )}
        </figure>

        {aside && !hideAside && <aside className={cx(styles.aside)}>{aside}</aside>}
      </div>
    </div>
  );
}
