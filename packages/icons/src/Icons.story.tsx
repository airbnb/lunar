import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Grid, { Col } from '@airbnb/lunar/lib/components/Grid';
import Spacing from '@airbnb/lunar/lib/components/Spacing';
import Select from '@airbnb/lunar/lib/components/Select';
import Text from '@airbnb/lunar/lib/components/Text';
import Copy from '@airbnb/lunar/lib/components/Copy';
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
    const importPath = `import ${icon} from '@airbnb/lunar-icons/lib/${category}/${icon}';`;

    return (
      <Spacing top={2}>
        <Text bold large>
          {title}
        </Text>

        <Spacing bottom={2}>
          <Text muted>
            {importPath} <Copy text={importPath} />
          </Text>
        </Spacing>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 16 }}>
          {icons.map(Icon => (
            <button
              type="button"
              key={Icon.displayName}
              title={Icon.displayName}
              onClick={() => {
                action(Icon.displayName!)(importPath);
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
      </Spacing>
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
        <Grid>
          <Col span={6}>
            <Select label="Color" name="color" value={color} onChange={this.handleColorChange}>
              <option value="">None</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
            </Select>
          </Col>

          <Col span={6}>
            <Select label="Size" name="size" value={size} onChange={this.handleSizeChange}>
              <option value="1em">1x</option>
              <option value="2em">2x</option>
              <option value="3em">3x</option>
            </Select>
          </Col>
        </Grid>

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

storiesOf('Icons', module).add('Gallery', () => <IconList />);
