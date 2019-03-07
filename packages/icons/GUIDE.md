```jsx
import iconData from '../../guide/icons';
import Text from ':core/components/Text';
import Select from ':core/components/Select';

class IconGrid extends React.Component {
  constructor() {
    super();

    this.state = {
      icon: 'IconName',
    };

    this.handleSetName = this.handleSetName.bind(this);
  }

  handleSetName(icon) {
    this.setState({
      icon,
    });
  }

  render() {
    const { children, category, title, icons, color, size } = this.props;
    const { icon } = this.state;

    return (
      <div>
        <Text bold large>
          {title}
        </Text>

        <div className="rsg--pathline-49" style={{ marginTop: 8, marginBottom: 16 }}>
          {`import ${icon} from '@airbnb/lunar-icons/lib/${category}/${icon}'`}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 16 }}>
          {icons.map(Icon => (
            <button
              key={Icon.displayName}
              title={Icon.displayName}
              onClick={() => {
                log(Icon.displayName);
                this.handleSetName(Icon.displayName);
              }}
              style={{
                fontSize: 15,
                padding: '1rem .5rem',
                margin: 0,
                border: 0,
                background: 'none',
                cursor: 'pointer',
                color: '#484848',
                textAlign: 'center',
                width: 90,
              }}
            >
              <Icon inline decorative size={size} color={color || undefined} />

              <div style={{ fontSize: 11, marginTop: 4 }}>{Icon.displayName.slice(4)}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

class IconList extends React.Component {
  constructor() {
    super();

    this.state = {
      color: '',
      size: '2em',
    };

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handeSizeChange = this.handeSizeChange.bind(this);
  }

  handleColorChange(color) {
    this.setState({
      color,
    });
  }

  handeSizeChange(size) {
    this.setState({
      size,
    });
  }

  render() {
    const { color, size } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <div style={{ width: '50%', marginRight: 16 }}>
            <Select label="Color" name="color" value={color} onChange={this.handleColorChange}>
              <option value="">None</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </Select>
          </div>

          <div style={{ width: '50%' }}>
            <Select label="Size" name="size" value={size} onChange={this.handeSizeChange}>
              <option value="1em">1x</option>
              <option value="2em">2x</option>
              <option value="3em">3x</option>
            </Select>
          </div>
        </div>

        {Object.keys(iconData).map(category => (
          <IconGrid
            key={category}
            category={category}
            title={iconData[category].label}
            icons={iconData[category].icons}
            color={color}
            size={size}
          />
        ))}
      </div>
    );
  }
}

<IconList />;
```
