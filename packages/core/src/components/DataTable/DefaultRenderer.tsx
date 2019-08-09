import React from 'react';
import Text from '../Text';
import { RendererProps } from './types';

export default function DefaultRenderer({ row, keyName }: RendererProps) {
  const content = row.rowData.data[keyName];

  return <Text>{typeof content === 'string' || typeof content === 'number' ? content : null}</Text>;
}
