import React from 'react';
import { RendererProps } from './types';

export default function DefaultRenderer({ row, keyName }: RendererProps) {
  const content = row.rowData.data[keyName];
  return <div>{typeof content === 'string' || typeof content === 'number' ? content : null}</div>;
}
