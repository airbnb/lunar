A tooltip that renders with a spiffy animation when children are hovered. For adult use only. Please
tooltip with moderation.

```jsx
import Button from '../Button';
import Text from '../Text';

<div>
  <Tooltip content="Tooltips are an anti-pattern! Please think carefully about accessibility before using them. Do not use tooltips for content that cannot be discovered by other means.">
    <Button>Hover Me</Button>
  </Tooltip>

  <Text inline>{` ← has a tooltip`}</Text>

  <Text>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
      sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
      blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi,
      a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
      Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat.
      Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum.
      Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
    </div>
  </Text>

  <div style={{ textAlign: 'right' }}>
    <Text inline>{`also has a tooltip → `}</Text>
    <Tooltip content="This uncomfortably wide tooltip should probably be right-aligned" width={100}>
      <Button>Hover Me</Button>
    </Tooltip>
  </div>

  <Text>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
      sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
      blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi,
      a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod erat.
      Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat volutpat.
      Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh aliquam bibendum.
      Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
    </div>
  </Text>

  <div style={{ textAlign: 'center' }}>
    <Tooltip content="This tooltip should most definitely be centered" width={20}>
      <Button>
        Hover Me too
        <br />
        please
      </Button>
    </Tooltip>
  </div>
</div>;
```

Supress dismissal on mouse down

```jsx
import Button from '../Button';
import Text from '../Text';

class TooltipDemo extends React.Component {
  constructor() {
    super();

    this.state = { text: 'click it!', clicked: false };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseLeave() {
    if (this.state.clicked) {
      this.setState({
        text: 'try again',
        clicked: false,
      });
    }
  }

  handleClick() {
    this.setState({
      text: `clicked at ${Date.now()}`,
      clicked: true,
    });
  }

  render() {
    return (
      <Tooltip content={this.state.text} width={20} remainOnMouseDown>
        <Button onClick={this.handleClick} onMouseLeave={this.handleMouseLeave}>
          Hover over here
        </Button>
      </Tooltip>
    );
  }
}

<TooltipDemo />;
```

Add an underline to the trigger

```jsx
import Text from '../Text';

<Text>
  <Tooltip underlined content="Hello">
    I have a tooltip
  </Tooltip>
  ...
  <Tooltip content="Goodbye">and I have a tooltip too</Tooltip>
</Text>;
```

Use light background with dark text

```jsx
import Text from '../Text';

<Text>
  <Tooltip inverted content="Hello">
    I have a light background tooltip
  </Tooltip>
  ...
  <Tooltip content="Goodbye">and I have the default dark background tooltip</Tooltip>
</Text>;
```

Callback fired when the tooltip is shown.

```jsx
import Button from '../Button';
import Text from '../Text';

class TooltipOnShowDemo extends React.Component {
  constructor() {
    super();
    this.handleOnShow = this.handleOnShow.bind(this);
    this.state = { text: 'Hovered 0 times', count: 0 };
  }

  handleOnShow() {
    let { count } = this.state;
    count++;
    this.setState({
      text: `Hovered ${count} times`,
      count: count,
    });
  }

  render() {
    return (
      <Tooltip content={this.state.text} onShow={this.handleOnShow}>
        <Button>Hover over here</Button>
      </Tooltip>
    );
  }
}

<TooltipOnShowDemo />;
```
