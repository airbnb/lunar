import React from 'react';
import SortCarets from '.';

export default {
  title: 'Core/SortCarets',
  parameters: {
    inspectComponents: [SortCarets],
  },
};

export function withUpAndDownCarets() {
  return <SortCarets down up />;
}

withUpAndDownCarets.story = {
  name: 'With up and down carets.',
};

export function withOnlyUp() {
  return <SortCarets up />;
}

withOnlyUp.story = {
  name: 'With only up.',
};

export function withOnlyDown() {
  return <SortCarets down />;
}

withOnlyDown.story = {
  name: 'With only down.',
};

export function activeUpCaret() {
  return <SortCarets down up enableUp />;
}

activeUpCaret.story = {
  name: 'Active up caret.',
};

export function activeDownCaret() {
  return <SortCarets down up enableDown />;
}

activeDownCaret.story = {
  name: 'Active down caret.',
};
