import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WithIconWrapperProps } from './withIcon';

type IconSet = {
  label: string;
  icons: React.ComponentType<WithIconWrapperProps>[];
};

const context = require.context('.', true, /Icon[A-Z]+\.tsx/i);
const iconData: { [key: string]: IconSet } = {
  general: {
    label: 'General Objects',
    icons: [],
  },
  interface: {
    label: 'User Interface',
    icons: [],
  },
  social: {
    label: 'Social Media',
    icons: [],
  },
};

context.keys().forEach(file => {
  const Icon = context(file).default;
  const [category] = file.slice(2).split('/Icon');

  iconData[category].icons.push(Icon);
});

class IconGrid extends React.Component<
  { category: string; title: string; icons: IconSet['icons']; color: string; size: string },
  { icon: string }
> {
  state = {
    icon: 'IconName',
  };

  handleSetName = (icon: string) => {
    this.setState({
      icon,
    });
  };

  render() {
    const { category, title, icons, color, size } = this.props;
    const { icon } = this.state;

    return (
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 16 }}>
          {icons.map(Icon => (
            <button
              type="button"
              key={Icon.displayName}
              title={Icon.displayName}
              onClick={() => {
                action(Icon.displayName!)(
                  `import ${icon} from '@airbnb/lunar-icons/lib/${category}/${icon}';`,
                );

                this.handleSetName(Icon.displayName!);
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

              <div style={{ fontSize: 11, marginTop: 4 }}>{Icon.displayName!.slice(4)}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

class IconList extends React.Component<{}, { color: string; size: string }> {
  state = {
    color: '',
    size: '2em',
  };

  handleColorChange = (color: string) => {
    this.setState({
      color,
    });
  };

  handleSizeChange = (size: string) => {
    this.setState({
      size,
    });
  };

  render() {
    const { color, size } = this.state;

    return (
      <div>
        {/* <div stlye={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <select label="Color" name="color" value={color} onChange={this.handleColorChange}>
              <option value="">None</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div style={{ width: '50%' }}>
            <select label="Size" name="size" value={size} onChange={this.handleSizeChange}>
              <option value="1em">1x</option>
              <option value="2em">2x</option>
              <option value="3em">3x</option>
            </select>
          </div>
        </div> */}

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

storiesOf('Icons', module).add('Icon gallery.', () => <IconList />);
