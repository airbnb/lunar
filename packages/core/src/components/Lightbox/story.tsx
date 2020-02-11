import React from 'react';
import moon from ':storybook/images/moon.png';
import space from ':storybook/images/space.jpg';
import stars from ':storybook/images/stars.jpg';
import Button from '../Button';
import Text from '../Text';
import Lightbox, { LightboxProps } from '.';

type AsideDemoProps = {
  title: string;
};

function AsideDemo({ title }: AsideDemoProps) {
  return (
    <>
      <Text bold>Title:</Text>
      <Text>{title}</Text>
    </>
  );
}

const mockImages = [
  { src: moon, alt: 'moon' },
  { src: space, alt: 'space' },
  { src: stars, alt: 'stars' },
];

const mockImagesWithAside = [
  { src: moon, alt: 'moon', aside: <AsideDemo title="Moon" /> },
  { src: space, alt: 'space', aside: <AsideDemo title="Space" /> },
  { src: stars, alt: 'stars', aside: <AsideDemo title="Stars" /> },
];

class LightboxDemo extends React.Component<Omit<LightboxProps, 'onClose'>, { visible: boolean }> {
  state = { visible: true };

  handleToggle = () => this.setState(prevState => ({ visible: !prevState.visible }));

  handleClose = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const { images, startIndex, showZoomControls, showRotateControls } = this.props;

    return (
      <div>
        <Button onClick={this.handleToggle}>Open lightbox</Button>

        <br />
        <br />

        {visible && (
          <Lightbox
            images={images}
            startIndex={startIndex}
            showZoomControls={showZoomControls}
            showRotateControls={showRotateControls}
            onClose={this.handleToggle}
          />
        )}
      </div>
    );
  }
}

export default {
  title: 'Core/Lightbox',

  parameters: {
    inspectComponents: [Lightbox],
  },
};

export function defaultLightbox() {
  return <LightboxDemo images={mockImages} />;
}

defaultLightbox.story = {
  name: 'Default lightbox',
};

export function withSetStartIndex() {
  return <LightboxDemo images={mockImages} startIndex={1} />;
}

withSetStartIndex.story = {
  name: 'With set start index',
};

export function withSidebarComponents() {
  return <LightboxDemo images={mockImagesWithAside} />;
}

withSidebarComponents.story = {
  name: 'With sidebar components',
};

export function withZoomControls() {
  return <LightboxDemo showZoomControls images={mockImages} />;
}

withZoomControls.story = {
  name: 'With zoom controls',
};

export function withRotateControls() {
  return <LightboxDemo showRotateControls images={mockImages} />;
}

withRotateControls.story = {
  name: 'With rotate controls',
};

export function withZoomAndRotateControls() {
  return <LightboxDemo showZoomControls showRotateControls images={mockImages} startIndex={1} />;
}

withZoomAndRotateControls.story = {
  name: 'With zoom and rotate controls',
};

export function withAllOptions() {
  return <LightboxDemo showZoomControls showRotateControls images={mockImagesWithAside} />;
}

withAllOptions.story = {
  name: 'With all options',
};
