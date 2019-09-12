import React from 'react';
import Sheet from '../Sheet';
import LightboxImage, { LightboxImageProps } from './LightboxImage';
import LightboxHeader from './LightboxHeader';

export type LightboxProps = {
  images: LightboxImageProps[];
  startIndex?: number;
  onClose: () => void;
};

export type LightboxState = {
  activeIndex: number;
  hideAside: boolean;
};

export default class Lightbox extends React.PureComponent<LightboxProps, LightboxState> {
  static defaultProps = {
    startIndex: 0,
  };

  state = {
    activeIndex: 0,
    hideAside: false,
  };

  preloadedUrls: Map<string, boolean | HTMLImageElement>;

  constructor(props: LightboxProps) {
    super(props);

    this.preloadedUrls = new Map();
  }

  componentDidMount() {
    const { startIndex = 0, images } = this.props;
    const { activeIndex } = this.state;
    const index = startIndex < images.length ? startIndex : activeIndex;

    const totalImages = images.length;
    if (totalImages > 0) {
      this.preloadedUrls.set(images[index].src, true);

      if (totalImages > 1) {
        this.preloadAfterTII();
      }
    }

    if (index && activeIndex !== index) {
      this.handleChangeSlide(index);
    }
  }

  componentDidUpdate() {
    if (this.props.images.length > 1) {
      // prefetch the next image when `images` or `activeIndex` changes
      this.preloadImages();
    }
  }

  componentWillUnmount() {
    // We no longer need these images, so let's remove them so they can be garbage collected.
    delete this.preloadedUrls;
  }

  preloadAfterTII() {
    // this ensures image preload is delayed after TTI
    if ('requestIdleCallback' in window) {
      // eslint-disable-next-line
      window.requestIdleCallback(() => this.preloadImages());
    } else {
      // Fallback for Safari & Edge
      setTimeout(() => {
        this.preloadImages();
      }, 1);
    }
  }

  preloadImages() {
    const { images } = this.props;
    const { activeIndex } = this.state;
    const totalImages = images.length;
    const startIndex = activeIndex + 1; // start direction is going forward (+1)
    const endIndex = activeIndex + 2;
    const indices = Array.from({ length: endIndex - startIndex }, (_, i) => i + startIndex);

    let preloadUrls = indices.map(preloadIndex => {
      const index = (preloadIndex + totalImages) % totalImages;

      return images[index] && images[index].src;
    });

    // Filter out already preloaded images.
    preloadUrls = preloadUrls.filter(
      preloadUrl => preloadUrl && !this.preloadedUrls.has(preloadUrl),
    );

    // Preload each of the remaining images.
    preloadUrls.forEach(preloadUrl => {
      const img = new Image();
      img.src = preloadUrl;

      // The img object is stored as the value in an attempt to keep the object in memory and prevent garbage collection.
      this.preloadedUrls.set(preloadUrl, img);
    });
  }

  private handleChangeSlide = (index: number) => {
    this.setState({ activeIndex: index });
  };

  private handleToggleAside = () => {
    this.setState(({ hideAside }) => {
      return { hideAside: !hideAside };
    });
  };

  render() {
    const { onClose, images } = this.props;
    const { activeIndex, hideAside } = this.state;
    const image = images[activeIndex];
    const { alt, aside, src } = image;
    const hasAside = images.some(img => !!img.aside);

    const header = (
      <LightboxHeader
        activeIndex={activeIndex}
        imageCount={images.length}
        hideAside={hideAside}
        hasAside={hasAside}
        onChangeSlide={this.handleChangeSlide}
        onToggleAside={this.handleToggleAside}
      />
    );

    return (
      <Sheet compact headerShadow noAnimation portal visible header={header} onClose={onClose}>
        <LightboxImage aside={aside} alt={alt} src={src} hideAside={hideAside} />
      </Sheet>
    );
  }
}
