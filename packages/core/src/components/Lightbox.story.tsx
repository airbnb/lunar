import React from 'react';
import { storiesOf } from '@storybook/react';
import moon from ':storybook/images/moon.png';
import space from ':storybook/images/space.jpg';
import stars from ':storybook/images/stars.jpg';
import Button from './Button';
import Text from './Text';
import Lightbox, { Props } from './Lightbox';

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

class LightboxDemo extends React.Component<Omit<Props, 'onClose'>, { visible: boolean }> {
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
            onClose={this.handleToggle}
            showZoomControls={showZoomControls}
            showRotateControls={showRotateControls}
          />
        )}
      </div>
    );
  }
}

storiesOf('Core/Lightbox', module)
  .addParameters({
    inspectComponents: [Lightbox],
  })
  .add('Default lightbox', () => <LightboxDemo images={mockImages} />)
  .add('With set start index', () => <LightboxDemo images={mockImages} startIndex={1} />)
  .add('With sidebar components', () => <LightboxDemo images={mockImagesWithAside} />)
  .add('With zoom controls', () => <LightboxDemo images={mockImages} showZoomControls />)
  .add('With rotate controls', () => <LightboxDemo images={mockImages} showRotateControls />)
  .add('With zoom and rotate controls', () => (
    <LightboxDemo images={mockImages} startIndex={1} showZoomControls showRotateControls />
  ))
  .add('With all options', () => (
    <LightboxDemo images={mockImagesWithAside} showZoomControls showRotateControls />
  ));
