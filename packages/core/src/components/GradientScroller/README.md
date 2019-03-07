Display a scrollable area, with a potential horizontal scrollbar, and appropriate transparent
gradients on the edges.

```jsx
import Text from '../Text';

<GradientScroller>
  <Text>
    <span style={{ whiteSpace: 'nowrap' }}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
    </span>
  </Text>
</GradientScroller>;
```

With left and right arrows.

```jsx
import Text from '../Text';

<GradientScroller showArrows hideScrollbar>
  <Text>
    <span style={{ whiteSpace: 'nowrap' }}>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
        sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
        blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet
        nisi, a rutrum dolor quam eget mi. Integer nibh orci, faucibus in dolor ut, maximus euismod
        erat. Nam efficitur vulputate augue non pretium. Suspendisse vitae dui elit. Aliquam erat
        volutpat. Curabitur rutrum id elit ut hendrerit. Pellentesque ullamcorper quam a nibh
        aliquam bibendum. Fusce at fermentum velit. Phasellus malesuada dapibus tincidunt.
      </div>
    </span>
  </Text>
</GradientScroller>;
```

With no scrollbar and variable width children.

```jsx
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';

class ButtonGroupDemo extends React.Component {
  constructor() {
    super();

    this.state = { buttons: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      buttons: [...prevState.buttons, prevState.buttons.length],
    }));
  }

  render() {
    return (
      <div style={{ borderBottom: '2px solid #DBDBDB', paddingBottom: 4 }}>
        <ButtonGroup>
          <Button onClick={this.handleClick}>Add</Button>

          {this.state.buttons.map(count => (
            <Button key={count}>{count}</Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }
}

<GradientScroller hideScrollbar>
  <ButtonGroupDemo />
</GradientScroller>;
```
