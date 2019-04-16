/* eslint-disable jsx-a11y/no-onchange */

import React, { ChangeEvent } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { WithIconWrapperProps } from './withIcon';
import FakeIcon from './FakeIcon';

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

class IconGrid extends React.Component<{
  category: string;
  title: string;
  icons: IconSet['icons'];
  color: string;
  size: string;
}> {
  render() {
    const { category, title, icons, color, size } = this.props;

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
                const icon = Icon.displayName!;

                action(icon)(`import ${icon} from '@airbnb/lunar-icons/lib/${category}/${icon}';`);
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

  handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      color: event.currentTarget.value,
    });
  };

  handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      size: event.currentTarget.value,
    });
  };

  render() {
    const { color, size } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', position: 'absolute', top: 0, right: 0 }}>
          <select name="color" value={color} onChange={this.handleColorChange}>
            <option value="">No Color</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>

          <select
            name="size"
            value={size}
            onChange={this.handleSizeChange}
            style={{ marginLeft: 8 }}
          >
            <option value="1em">1x</option>
            <option value="2em">2x</option>
            <option value="3em">3x</option>
          </select>
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

storiesOf('Icons', module)
  .addParameters({
    inspectComponents: [FakeIcon],
  })
  .add('Icon gallery.', () => <IconList />);
