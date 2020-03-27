import React from 'react';
import IconCloseAlt from '@airbnb/lunar-icons/src/interface/IconCloseAlt';
import Text from '../Text';
import Multicomplete from '.';
import IconButton from '../IconButton';
import Row from '../Row';
import StatusText from '../StatusText';

export default {
  title: 'Core/Multicomplete',
  parameters: {
    inspectComponents: [Multicomplete],
  },
};

export function anAutocompleteThatSupportsSelectingMultipleItems() {
  return (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

anAutocompleteThatSupportsSelectingMultipleItems.story = {
  name: 'An autocomplete that supports selecting multiple items.',
};

export function supportsPrePopulatingMultipleItems() {
  return (
    <Multicomplete
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      value={['red', 'green']}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

supportsPrePopulatingMultipleItems.story = {
  name: 'Supports pre-populating multiple items.',
};

export function loadItemsOnFocusStory() {
  return (
    <Multicomplete
      loadItemsOnFocus
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      value={['red', 'green']}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => !value || item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

loadItemsOnFocusStory.story = {
  name: 'Load items on focus.',
};

export function canSelectUnknownValueWhenHittingEnter() {
  return (
    <Multicomplete
      selectUnknownOnEnter
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

canSelectUnknownValueWhenHittingEnter.story = {
  name: 'Can select unknown value when hitting enter.',
};

export function renderACustomChip() {
  return (
    <Multicomplete
      selectUnknownOnEnter
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderChip={(value, onRemove) => (
        <Row
          compact
          middleAlign
          after={
            <IconButton onClick={(event) => onRemove(value, event)}>
              <IconCloseAlt accessibilityLabel="Remove" />
            </IconButton>
          }
        >
          <StatusText
            uppercased
            danger={value === 'red'}
            success={value === 'green'}
            notice={value === 'blue'}
          >
            {value}
          </StatusText>
        </Row>
      )}
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

renderACustomChip.story = {
  name: 'Render a custom selected value instead of a Chip.',
};

export function asSmall() {
  return (
    <Multicomplete
      small
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

asSmall.story = {
  name: 'As small.',
};

export function asLarge() {
  return (
    <Multicomplete
      large
      accessibilityLabel="Favorite color?"
      label="Favorite color?"
      name="autocomplete"
      renderItem={(item, highlighted, selected) => (
        <Text bold={selected} muted={highlighted}>
          {item.name}
        </Text>
      )}
      onChange={() => console.log('onChange')}
      onSelectItem={() => console.log('onSelectItem')}
      onLoadItems={(value) =>
        Promise.resolve(
          [
            { value: 'red', name: 'Red' },
            { value: 'black', name: 'Black' },
            { value: 'blue', name: 'Blue' },
            { value: 'green', name: 'Green' },
          ].filter((item) => item.name.toLowerCase().match(value.toLowerCase())),
        )
      }
    />
  );
}

asLarge.story = {
  name: 'As large.',
};
