import React from 'react';
import { storiesOf } from '@storybook/react';
import moon from ':storybook/images/moon.png';
import space from ':storybook/images/space.jpg';
import stars from ':storybook/images/stars.jpg';
import Button from './Button';
import Text from './Text';
import Lightbox, { LightboxProps } from './Lightbox';
import { LightboxImageProps } from './Lightbox/LightboxImage';

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
]; //: Pick<LightboxImageProps, 'src' | 'alt'>

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
    const { images, startIndex } = this.props;

    return (
      <div>
        <Button onClick={this.handleToggle}>Open lightbox</Button>

        <br />
        <br />

        {visible && (
          <Lightbox images={images} startIndex={startIndex} onClose={this.handleToggle} />
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
  .add('With zoom controls', () => <LightboxDemo images={mockImagesWithAside} showZoomControls />)
  .add('With rotate controls', () => (
    <LightboxDemo images={mockImagesWithAside} showRotateControls />
  ))
  .add('With zoom and rotate controls', () => (
    <LightboxDemo images={mockImagesWithAside} showZoomControls showRotateControls />
  ));
