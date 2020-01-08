import React from 'react';
import HierarchyPicker, { Props } from '.';
import Button from '../Button';

const demoItems = [
  {
    name: 'Item 1',
    label: 'Custom label',
    readonly: true,
    items: [
      {
        name: 'Item 1a',
        readonly: true,
        items: [
          {
            name: 'Item 1a i',
          },
          {
            name: 'Item 1a ii (description)',
            description: 'A little bit of info.',
          },
        ],
      },
      {
        name: 'Item 1b',
        readonly: true,
        items: [
          {
            name: 'Item 1b i',
          },
        ],
      },
      {
        name: 'Item 1c',
        label: 'Item 1c (description)',
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
    name: 'Item 2 (clickable)',
    items: [
      {
        name: 'Item 2a',
      },
      {
        name: 'Item 2b',
      },
      {
        name: 'Item 2c',
      },
      {
        name: 'Item 2d (clickable)',
        items: [
          {
            name: 'Item 2d i (description)',
            description: 'Description of the item',
          },
        ],
      },
      {
        name: 'Item 2e (not clickable)',
        readonly: true,
        items: [
          {
            name: 'Item 2e i (description)',
            description: 'Description of the item',
          },
        ],
      },
    ],
  },
  {
    name: 'Item 3 (not clickable)',
    readonly: true,
    items: [
      {
        name: 'Should not see me',
        readonly: true,
        items: [
          {
            name: 'nested',
            readonly: true,
          },
        ],
      },
      {
        name: 'Item 3b (others filtered)',
      },
      {
        name: 'Should not see me 2',
        readonly: true,
      },
    ],
  },
  {
    name: 'Item 4 (description)',
    section: 'Section label',
    description:
      'Description of the item. It is clickable and searchable. It can be long and will wrap.',
  },
  {
    name: 'Item 5',
    label: 'Item with long label & overflown description',
    description:
      'testingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflowtestingoverflow',
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
    name: 'Team 2 (clickable)',
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
    name: 'Team 3 (not clickable)',
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
    name: 'Team (description)',
    description:
      'Description of the item. It is clickable and searchable. It can be long and will wrap.',
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
      {
        name: 'Team 4i',
      },
      {
        name: 'Team 4j',
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
      <>
        <HierarchyPicker
          items={items}
          chosen={chosen}
          searchWidth={400}
          searchPlaceholder="Search all the things"
          noResultsLabel="No results match your query."
          onItemPicked={(nextChosen: string[] | null, item: object | null, details?: object) => {
            action('onItemPicked')(nextChosen, item, details);
            this.setState({ chosen: nextChosen || undefined });
          }}
          {...passThroughProps}
        />
        <br />
        <Button>Padding test</Button>
      </>
    );
  }
}

export default {
  title: 'Core/HierarchyPicker',
  parameters: {
    inspectComponents: [HierarchyPicker],
  },
};

export function verticallyOffsetMenu() {
  return <PickerDemo items={demoItems} />;
}

verticallyOffsetMenu.story = {
  name: 'Vertically offset menu',
};

export function verticallyAlignedMenu() {
  return <PickerDemo verticallyAlign items={demoItems} />;
}

verticallyAlignedMenu.story = {
  name: 'Vertically aligned menu',
};

export function withSubSectionsAndHierarchyDimensions() {
  return (
    <PickerDemo verticallyAlign items={demoItems2} hierarchyMaxHeight={272} hierarchyWidth={260} />
  );
}

withSubSectionsAndHierarchyDimensions.story = {
  name: 'With sub-sections and hierarchy dimensions',
};

export function withChosenValue() {
  return <PickerDemo items={demoItems} chosen={['Item 1', 'Funtastic Testing']} />;
}

withChosenValue.story = {
  name: 'With chosen value',
};

export function customHierarchyWidth() {
  return (
    <PickerDemo
      hierarchyWidth={150}
      items={demoItems2}
      chosen={[demoItems2[1].name, demoItems2[1].items![2].name]}
    />
  );
}

customHierarchyWidth.story = {
  name: 'Custom hierarchy width',
};

export function customSearchDimensions() {
  return (
    <PickerDemo
      searchWidth={500}
      searchMaxHeight={150}
      items={demoItems2}
      chosen={[
        demoItems2[1].name,
        demoItems2[1].items![2].name,
        demoItems2[1].items![2].items![1].name,
      ]}
    />
  );
}

customSearchDimensions.story = {
  name: 'Custom search dimensions',
};

export function disabledStory() {
  return <PickerDemo disabled items={demoItems} />;
}

disabledStory.story = {
  name: 'Disabled',
};

export function invalidStory() {
  return <PickerDemo invalid items={demoItems} />;
}

invalidStory.story = {
  name: 'Invalid',
};
