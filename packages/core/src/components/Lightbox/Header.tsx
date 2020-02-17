import React, { useEffect } from 'react';
import Button from '../Button';
import Pagination from '../Pagination';
import T from '../Translate';
import { ARROW_RIGHT, ARROW_LEFT } from '../../keys';
import { ZoomControls, RotateControls } from '../ImageViewer';
import Spacing from '../Spacing';
import { styleSheetHeader } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export type LightboxHeaderProps = {
  /** Currently active image index. */
  activeIndex: number;
  /** Number of images. */
  imageCount: number;
  /** Has sidebar. */
  hasAside?: boolean;
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
  /** Callback fired when the slide changes. */
  onChangeSlide: (index: number) => void;
  /** Callback fired when the rotation changes. */
  onRotateImage?: (rotation: number) => void;
  /** Callback fired when the sidebar is toggled. */
  onToggleAside: () => void;
  /** Callback fired when the zoom changes. */
  onZoomImage?: (scale: number) => void;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

export default function LightboxHeader({
  activeIndex,
  hasAside,
  imageCount,
  hideAside,
  showZoomControls,
  showRotateControls,
  scale,
  rotation,
  onChangeSlide,
  onRotateImage,
  onToggleAside,
  onZoomImage,
  styleSheet,
}: LightboxHeaderProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetHeader);

  const handleNext = () => {
    onChangeSlide(activeIndex + 1);
  };

  const handlePrev = () => {
    onChangeSlide(activeIndex - 1);
  };

  const handleFirst = () => {
    onChangeSlide(0);
  };

  const handleLast = () => {
    onChangeSlide(imageCount - 1);
  };

  const handleZoom = (s: number) => {
    if (onZoomImage) {
      onZoomImage(s);
    }
  };

  const handleRotate = (r: number) => {
    if (onRotateImage) {
      onRotateImage(r);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ARROW_LEFT && activeIndex > 0) {
      if (event.shiftKey) {
        handleFirst();
      } else {
        handlePrev();
      }
    }

    if (event.key === ARROW_RIGHT && activeIndex < imageCount - 1) {
      if (event.shiftKey) {
        handleLast();
      } else {
        handleNext();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className={cx(styles.header)}>
      <div className={cx(styles.pagination)}>
        <Pagination
          centerAlign
          showBookends
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < imageCount - 1}
          page={activeIndex + 1}
          pageLabel={T.phrase('lunar.image.photoLabel', 'Photo')}
          pageCount={imageCount}
          onNext={handleNext}
          onPrevious={handlePrev}
          onFirst={handleFirst}
          onLast={handleLast}
        />
      </div>

      {showRotateControls && (
        <Spacing right={2}>
          <RotateControls rotation={rotation} onRotation={handleRotate} />
        </Spacing>
      )}

      {showZoomControls && (
        <Spacing right={2}>
          <ZoomControls scale={scale} onScale={handleZoom} />
        </Spacing>
      )}

      {hasAside && (
        <div className={cx(styles.infoButton)}>
          <Button small onClick={onToggleAside}>
            {hideAside
              ? T.phrase('lunar.image.showInfo', 'Show info')
              : T.phrase('lunar.image.hideInfo', 'Hide info')}
          </Button>
        </div>
      )}
    </div>
  );
}
