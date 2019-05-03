import React from 'react';
import Input from '../../Input';
import { RendererProps } from '../types';

const onClick = (e: React.SyntheticEvent<EventTarget>) => e.stopPropagation();

export default function TextInputRenderer({ row, key, onEdit }: RendererProps) {
  const content = row.rowData.data[key];

  return typeof content === 'string' ? (
    <Input
      label=""
      name=""
      onClick={onClick}
      hideLabel
      value={content}
      onChange={onEdit(row, key)}
    />
  ) : null;
}
