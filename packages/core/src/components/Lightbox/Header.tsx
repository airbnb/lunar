import React from 'react';
import Button from '../Button';
import Pagination from '../Pagination';
import T from '../Translate';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { ARROW_RIGHT, ARROW_LEFT } from '../../keys';
import { ZoomControls, RotateControls } from '../ImageViewer';
import Spacing from '../Spacing';
import { styleSheetHeader as styleSheet } from './styles';

export type Props = {
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
};

export class Header extends React.PureComponent<Props & WithStylesProps> {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleNext = () => {
    const { activeIndex, onChangeSlide } = this.props;
    onChangeSlide(activeIndex + 1);
  };

  private handlePrev = () => {
    const { activeIndex, onChangeSlide } = this.props;
    onChangeSlide(activeIndex - 1);
  };

  private handleFirst = () => {
    const { onChangeSlide } = this.props;
    onChangeSlide(0);
  };

  private handleLast = () => {
    const { imageCount, onChangeSlide } = this.props;
    onChangeSlide(imageCount - 1);
  };

  private handleZoom = (scale: number) => {
    if (this.props.onZoomImage) {
      this.props.onZoomImage(scale);
    }
  };

  private handleRotate = (rotation: number) => {
    if (this.props.onRotateImage) {
      this.props.onRotateImage(rotation);
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const { activeIndex, imageCount } = this.props;

    if (event.key === ARROW_LEFT && activeIndex > 0) {
      if (event.shiftKey) {
        this.handleFirst();
      } else {
        this.handlePrev();
      }
    }

    if (event.key === ARROW_RIGHT && activeIndex < imageCount - 1) {
      if (event.shiftKey) {
        this.handleLast();
      } else {
        this.handleNext();
      }
    }
  };

  render() {
    const {
      cx,
      activeIndex,
      hasAside,
      imageCount,
      hideAside,
      styles,
      showZoomControls,
      showRotateControls,
      scale,
      rotation,
    } = this.props;

    return (
      <div className={cx(styles.header)}>
        <div className={cx(styles.pagination)}>
          <Pagination
            centerAlign
            showBookends
            hasPrev={activeIndex > 0}
            hasNext={activeIndex < imageCount - 1}
            page={activeIndex + 1}
            pageLabel={T.phrase(
              'Photo',
              {},
              { key: 'lunar.image.photoLabel', context: 'Label for photo pagination' },
            )}
            pageCount={imageCount}
            onNext={this.handleNext}
            onPrevious={this.handlePrev}
            onFirst={this.handleFirst}
            onLast={this.handleLast}
          />
        </div>

        {showRotateControls && (
          <Spacing right={2}>
            <RotateControls rotation={rotation} onRotation={this.handleRotate} />
          </Spacing>
        )}

        {showZoomControls && (
          <Spacing right={2}>
            <ZoomControls scale={scale} onScale={this.handleZoom} />
          </Spacing>
        )}

        {hasAside && (
          <div className={cx(styles.infoButton)}>
            <Button small onClick={this.props.onToggleAside}>
              {hideAside
                ? T.phrase(
                    'Show info',
                    {},
                    {
                      key: 'lunar.image.showInfo',
                      context: 'Shows sidebar information in the Lightbox',
                    },
                  )
                : T.phrase(
                    'Hide info',
                    {},
                    {
                      key: 'lunar.image.hideInfo',
                      context: 'Hides sidebar information in the Lightbox',
                    },
                  )}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styleSheet)(Header);
