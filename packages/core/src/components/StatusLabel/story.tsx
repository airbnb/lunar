import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Text from '../Text';
import StatusLabel from '.';

export default {
  title: 'Core/StatusLabel',
  parameters: {
    inspectComponents: [StatusLabel],
  },
};

export function defaultAndStatusLabels() {
  return (
    <>
      <StatusLabel>Default</StatusLabel>
      <StatusLabel notice>Notice</StatusLabel>
      <StatusLabel info>Info</StatusLabel>
      <StatusLabel success>Success</StatusLabel>
      <StatusLabel warning>Warning</StatusLabel>
      <StatusLabel danger>Danger</StatusLabel>
      <StatusLabel muted>Muted</StatusLabel>
    </>
  );
}

defaultAndStatusLabels.story = {
  name: 'Default and status labels.',
};

export function brandedStatusLabels() {
  return (
    <>
      <StatusLabel luxury>Luxury</StatusLabel>
      <StatusLabel plus>Plus</StatusLabel>
    </>
  );
}

brandedStatusLabels.story = {
  name: 'Branded status labels.',
};

export function colorInvertedAndUppercasedLabels() {
  return (
    <>
      <StatusLabel inverted uppercased>
        Default
      </StatusLabel>
      <StatusLabel inverted uppercased notice>
        Notice
      </StatusLabel>
      <StatusLabel inverted uppercased info>
        Info
      </StatusLabel>
      <StatusLabel inverted uppercased success>
        Success
      </StatusLabel>
      <StatusLabel inverted uppercased warning>
        Warning
      </StatusLabel>
      <StatusLabel inverted uppercased danger>
        Danger
      </StatusLabel>
      <StatusLabel inverted uppercased muted>
        Muted
      </StatusLabel>
      <StatusLabel inverted uppercased luxury>
        Luxury
      </StatusLabel>
      <StatusLabel inverted uppercased plus>
        Plus
      </StatusLabel>
    </>
  );
}

colorInvertedAndUppercasedLabels.story = {
  name: 'Color inverted and uppercased labels.',
};

export function withABorderApplied() {
  return (
    <StatusLabel inverted bordered>
      Default
    </StatusLabel>
  );
}

withABorderApplied.story = {
  name: 'With a border applied.',
};

export function withinABlockOfText() {
  return (
    <Text>
      Content before the label. <StatusLabel>Default</StatusLabel> Content after the label.
    </Text>
  );
}

withinABlockOfText.story = {
  name: 'Within a block of text.',
};

export function withBeforeAndOrAfterIcons() {
  return (
    <>
      <div>
        <StatusLabel success beforeIcon={<IconAddAlt decorative />}>
          Before icon
        </StatusLabel>
        <StatusLabel notice afterIcon={<IconAddAlt decorative />}>
          After icon
        </StatusLabel>
      </div>
    </>
  );
}

withBeforeAndOrAfterIcons.story = {
  name: 'With before and or after icons.',
};

export function withCompactPadding() {
  return (
    <>
      <StatusLabel compact uppercased>
        Compact
      </StatusLabel>
      <StatusLabel info compact uppercased>
        Info
      </StatusLabel>
      <StatusLabel compact info inverted bordered uppercased>
        Info Inverted
      </StatusLabel>
    </>
  );
}

withCompactPadding.story = {
  name: 'With compact padding.',
};

export function sameHeightWithOrWithoutBorderApplied() {
  return (
    <>
      <StatusLabel>Default</StatusLabel>
      <StatusLabel inverted bordered>
        Default
      </StatusLabel>
    </>
  );
}

sameHeightWithOrWithoutBorderApplied.story = {
  name: 'Same height with or without border applied',
};
