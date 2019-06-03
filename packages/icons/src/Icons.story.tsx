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
  color: string;
  flip: boolean;
  flipVertical: boolean;
  icons: IconSet['icons'];
  size: string;
  title: string;
}> {
  render() {
    const { category, title, icons, color, size, flip, flipVertical } = this.props;

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
              <Icon
                inline
                decorative
                size={size}
                color={color || undefined}
                flip={flip}
                flipVertical={flipVertical}
              />

              <div style={{ fontSize: 11, marginTop: 4 }}>{Icon.displayName!.slice(4)}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }
}

class IconList extends React.Component<
  {},
  { color: string; flipX: boolean; flipY: boolean; size: string }
> {
  state = {
    color: '',
    flipX: false,
    flipY: false,
    size: '2em',
  };

  handleColorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      color: event.currentTarget.value,
    });
  };

  handleFlipXChange = () => {
    this.setState(prevState => ({
      flipX: !prevState.flipX,
    }));
  };

  handleFlipYChange = () => {
    this.setState(prevState => ({
      flipY: !prevState.flipY,
    }));
  };

  handleSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      size: event.currentTarget.value,
    });
  };

  render() {
    const { color, flipX, flipY, size } = this.state;

    return (
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', fontSize: '12px', position: 'absolute', top: 0, right: 0 }}>
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

          <div style={{ marginLeft: 16 }}>
            Flip X{' '}
            <input checked={flipX} type="checkbox" name="flipx" onChange={this.handleFlipXChange} />
          </div>

          <div style={{ marginLeft: 8 }}>
            Flip Y{' '}
            <input checked={flipY} type="checkbox" name="flipy" onChange={this.handleFlipYChange} />
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
            flip={flipX}
            flipVertical={flipY}
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
