Display a Modal.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Spacing from '../Spacing';
import Tooltip from '../Tooltip';
import Text from '../Text';

class ModalDemo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.handleToggle = () => this.setState({ visible: !this.state.visible });
    this.handleClose = () => this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleToggle}>Open standard modal</Button>

        {visible && (
          <Modal
            footer={
              <ButtonGroup>
                <Button onClick={this.handleToggle}>OK</Button>
                <Button inverted onClick={this.handleToggle}>
                  Cancel
                </Button>
              </ButtonGroup>
            }
            onClose={this.handleClose}
            title="Modal Header"
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>

              <Spacing top={2}>
                <Tooltip
                  zIndex={3003}
                  content="Tooltips are an anti-pattern! Please think carefully about accessibility before using them. Do not use tooltips for content that cannot be discovered by other means."
                  remainOnMouseDown
                >
                  <Button>Hover Me</Button>
                </Tooltip>
              </Spacing>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

<ModalDemo />;
```

Display a Modal with no title.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Spacing from '../Spacing';
import Tooltip from '../Tooltip';
import Text from '../Text';

class ModalDemo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.handleToggle = () => this.setState({ visible: !this.state.visible });
    this.handleClose = () => this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleToggle}>Open modal with no title</Button>

        {visible && (
          <Modal
            footer={<Button onClick={this.handleToggle}>OK</Button>}
            onClose={this.handleClose}
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

<ModalDemo />;
```

Display a Large Modal.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Spacing from '../Spacing';
import Tooltip from '../Tooltip';
import Text from '../Text';

class ModalDemo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.handleToggle = () => this.setState({ visible: !this.state.visible });
    this.handleClose = () => this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleToggle}>Open large modal</Button>

        {visible && (
          <Modal
            large
            footer={
              <ButtonGroup>
                <Button onClick={this.handleToggle}>OK</Button>
                <Button inverted onClick={this.handleToggle}>
                  Cancel
                </Button>
              </ButtonGroup>
            }
            onClose={this.handleClose}
            title="Modal Header"
            visible={this.state.visible}
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

<ModalDemo />;
```

Display a compact Modal.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Spacing from '../Spacing';
import Tooltip from '../Tooltip';
import Text from '../Text';

class ModalDemo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.handleToggle = () => this.setState({ visible: !this.state.visible });
    this.handleClose = () => this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleToggle}>Open a compact modal</Button>

        {visible && (
          <Modal
            compact
            footer={
              <ButtonGroup>
                <Button onClick={this.handleToggle}>OK</Button>
                <Button inverted onClick={this.handleToggle}>
                  Cancel
                </Button>
              </ButtonGroup>
            }
            onClose={this.handleClose}
            title="Modal Header"
            visible={this.state.visible}
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

<ModalDemo />;
```

Display a Modal with a centered image.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Spacing from '../Spacing';
import Tooltip from '../Tooltip';
import Text from '../Text';

const imageConfig = {
  type: 'center',
  url: window.images.moon,
};

class ModalDemo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.handleToggle = () => this.setState({ visible: !this.state.visible });
    this.handleClose = () => this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleToggle}>Open image modal</Button>

        {visible && (
          <Modal
            footer={
              <ButtonGroup>
                <Button onClick={this.handleToggle}>OK</Button>
                <Button inverted onClick={this.handleToggle}>
                  Cancel
                </Button>
              </ButtonGroup>
            }
            image={imageConfig}
            onClose={this.handleClose}
            title="Modal Header"
            visible={this.state.visible}
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

<ModalDemo />;
```

Display a Modal with an image that covers the right half.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Spacing from '../Spacing';
import Tooltip from '../Tooltip';
import Text from '../Text';

const imageConfig = {
  type: 'cover',
  url: window.images.moon,
};

class ModalDemo extends React.Component {
  constructor() {
    super();
    this.state = { visible: false };
    this.handleToggle = () => this.setState({ visible: !this.state.visible });
    this.handleClose = () => this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleToggle}>Open covered image modal</Button>

        {visible && (
          <Modal
            footer={
              <ButtonGroup>
                <Button onClick={this.handleToggle}>OK</Button>
                <Button inverted onClick={this.handleToggle}>
                  Cancel
                </Button>
              </ButtonGroup>
            }
            image={imageConfig}
            onClose={this.handleClose}
            title="Modal Header"
            visible={this.state.visible}
          >
            <div>
              <Text>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec
                  porttitor sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed
                  feugiat lorem vitae augue blandit, sed mollis mi laoreet. Donec auctor, enim eget
                  tempus auctor, est lorem laoreet nisi, a rutrum dolor quam eget mi. Integer nibh
                  orci, faucibus in dolor ut, maximus euismod erat. Nam efficitur vulputate augue
                  non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat. Curabitur rutrum
                  id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum. Fusce
                  at fermentum velit. Phasellus malesuada dapibus tincidunt.
                </div>
              </Text>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

<ModalDemo />;
```
