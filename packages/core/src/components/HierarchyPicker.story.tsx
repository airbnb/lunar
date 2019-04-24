import React from 'react';
import { storiesOf } from '@storybook/react';
import HierarchyPicker, { Props } from './HierarchyPicker';

const demoItems = [
  {
    name: 'Account',
    label: 'Compte',
    readonly: true,
    items: [
      {
        name: 'Access',
        readonly: true,
        items: [
          {
            name: 'General',
          },
          {
            name: 'Suspension',
            label: 'Why was I suspended? Whats going on???',
            description:
              'testingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflow',
          },
          {
            name: 'Cancelation',
            description: 'Annuled reservation',
          },
        ],
      },
      {
        name: 'Airlock',
        readonly: true,
        items: [
          {
            name: 'General',
          },
        ],
      },
      {
        name: 'Other',
        label: 'Autre Chose',
        description:
          'Something that does not fit in the other categories in this taxonomy, like an apple, a pear, a plum, or maybe the distant call of a long lost friend.',
        keywords: 'bonjour Bonsoir',
      },
      {
        name: 'Funtastic Testing',
        label: 'Amazing Testing',
        description: 'Something something testing',
        keywords: 'Specific thing testing',
      },
    ],
  },
  {
    name: 'Admin',
    items: [
      {
        name: "Couldn't authenticate",
      },
      {
        name: 'Feature request',
      },
      {
        name: 'Other',
      },
      {
        name: 'Clickable submenu',
        items: [
          {
            name: 'Submenu of overflow',
            description: 'Description of the item',
          },
        ],
      },
      {
        name: 'Unclickable submenu',
        readonly: true,
        items: [
          {
            name: 'Submenu of overflow',
            description: 'Description of the item',
          },
        ],
      },
    ],
  },
  { name: 'No sub-items' },
  {
    name: 'Should not show',
    readonly: true,
    items: [
      {
        name: 'foo',
        readonly: true,
        items: [
          {
            name: 'nested',
            readonly: true,
          },
        ],
      },
      {
        name: 'bar',
        readonly: true,
      },
      {
        name: 'baz',
        readonly: true,
      },
    ],
  },
];

const demoItems2 = [
  {
    section: 'Top-level teams',
    name: 'Team 1',
    readonly: true,
    items: [
      {
        section: 'Sub-teams',
        name: 'Team 1a',
        readonly: true,
        items: [
          {
            section: 'Sub-sub-teams',
            name: 'Team 1a i',
          },
          {
            name: 'Team 1a ii',
          },
          {
            name: 'Team 1a iii',
          },
        ],
      },
      {
        name: 'Team 1b',
      },
      {
        name: 'Team 1c',
        readonly: true,
        items: [
          {
            section: 'Sub-sub-teams',
            name: 'Team 1c i',
          },
          {
            name: 'Team 1c ii',
          },
          {
            name: 'Team 1c iii',
          },
        ],
      },
    ],
  },
  {
    name: 'Team 2',
    readonly: true,
    items: [
      {
        section: 'Sub-teams',
        name: 'Team 2a',
      },
      {
        name: 'Team 2b',
      },
      {
        name: 'Team 2c',
        readonly: true,
        items: [
          {
            section: 'Sub-sub-teams',
            name: 'Team 2c i',
          },
          {
            name: 'Team 2c ii',
          },
          {
            name: 'Team 2c iii',
          },
        ],
      },
    ],
  },
  {
    name: 'Team 3',
    readonly: true,
    items: [
      {
        section: 'Sub-teams',
        name: 'Team 3a',
      },
      {
        name: 'Team 3b',
        readonly: true,
        items: [
          {
            section: 'Sub-sub-teams',
            name: 'Team 3b i',
          },
          {
            name: 'Team 3b ii',
          },
          {
            name: 'Team 3b iii',
          },
        ],
      },
      {
        name: 'Team 3c',
      },
    ],
  },
  {
    name: 'Team no-sub-teams',
  },
  {
    name: 'Overflown sub-teams',
    readonly: true,
    items: [
      {
        section: 'Sub-teams',
        name: 'Team 4a',
      },
      {
        name: 'Team 4b',
      },
      {
        name: 'Team 4c',
        readonly: true,
        items: [
          {
            section: 'Sub-sub-teams',
            name: 'Team 4c i',
          },
        ],
      },
      {
        name: 'Team 4d',
      },
      {
        name: 'Team 4e',
      },
      {
        name: 'Team 4f',
      },
      {
        name: 'Team 4g',
      },
      {
        name: 'Team 4h',
      },
    ],
  },
];

class PickerDemo extends React.Component<Partial<Props>, { chosen: Props['chosen'] }> {
  state = { chosen: undefined };

  render() {
    const { items = [], chosen: initChosen, ...passThroughProps } = this.props;
    const { chosen = initChosen } = this.state;

    return (
      <HierarchyPicker
        items={items}
        chosen={chosen}
        onItemPicked={nextChosen => {
          console.log(nextChosen);
          this.setState({ chosen: nextChosen || undefined });
        }}
        searchPlaceholder="Search all the things"
        noResultsLabel="No results match your query."
        {...passThroughProps}
      />
    );
  }
}

storiesOf('Core/HierarchyPicker', module)
  .addParameters({
    inspectComponents: [HierarchyPicker],
  })
  .add('Vertically offset menu', () => <PickerDemo items={demoItems} />)
  .add('Vertically aligned menu', () => <PickerDemo items={demoItems} verticallyAlign />)
  .add('With sub-sections and max height', () => (
    <PickerDemo items={demoItems2} verticallyAlign hierarchyMaxHeight={234} />
  ))
  .add('With chosen value', () => <PickerDemo items={demoItems} chosen={['Account', 'Access']} />)
  .add('Disabled', () => <PickerDemo items={demoItems} disabled />)
  .add('Invalid', () => <PickerDemo items={demoItems} invalid />);
