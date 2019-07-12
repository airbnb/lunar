import React from 'react';
import Text from '../Text';
import { RendererProps } from './types';

export default function renderDefaultContent({ row, key }: RendererProps) {
  const content = row.rowData.data[key];

  return typeof content === 'string' || typeof content === 'number' ? (
    <Text>{row.rowData.data[key]}</Text>
  ) : (
    <Text />
  );
}
