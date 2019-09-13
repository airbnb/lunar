import React from 'react';
import Button from '../Button';
import Pagination from '../Pagination';
import T from '../Translate';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { ARROW_RIGHT, ARROW_LEFT } from '../../keys';
import { ZoomControls, RotateControls } from '../ImageViewer';

export type LightboxHeaderProps = {
  activeIndex: number;
  hasAside?: boolean;
  imageCount: number;
  hideAside?: boolean;
  showZoomControls?: boolean;
  showRotateControls?: boolean;
  onChangeSlide: (index: number) => void;
  onToggleAside: () => void;
  onZoomImage?: (scale: number) => void;
  onRotateImage?: (rotation: number) => void;
  scale?: number;
  rotation?: number;
};

export class LightboxHeader extends React.PureComponent<LightboxHeaderProps & WithStylesProps> {
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
            pageLabel={T.phrase('Photo', {}, 'Label for photo pagination')}
            pageCount={imageCount}
            onNext={this.handleNext}
            onPrevious={this.handlePrev}
            onFirst={this.handleFirst}
            onLast={this.handleLast}
          />
        </div>
        {showZoomControls && (
          <div>
            <ZoomControls onScale={this.handleZoom} scale={scale} />
          </div>
        )}
        {showRotateControls && (
          <div>
            <RotateControls onRotation={this.handleRotate} rotation={rotation} />
          </div>
        )}

        {hasAside && (
          <div className={cx(styles.infoButton)}>
            <Button small onClick={this.props.onToggleAside}>
              {hideAside
                ? T.phrase('Show Info', {}, 'Shows sidebar information in the Lightbox')
                : T.phrase('Hide Info', {}, 'Hides sidebar information in the Lightbox')}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(({ unit }) => ({
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  pagination: {
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: unit,
  },

  infoButton: {
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: unit,
    textAlign: 'right',
  },
}))(LightboxHeader);
