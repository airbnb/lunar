import React from 'react';

import Text from '../../packages/core/src/components/Text';
import Spacing from '../../packages/core/src/components/Spacing';
import { RendererProps } from '../../packages/core/src/components/DataTable/types';
import { getRowColor } from '../../packages/core/src/components/DataTable/helpers';

export default function ColspanRenderer({
  row,
  key,
  editMode,
  handleEdit,
  zebra,
  theme,
}: RendererProps) {
  const { rowData, rowIndex } = row;
  const { data, metadata } = rowData;
  const color = getRowColor(rowData, rowIndex, zebra, theme);

  const colspanStyle: React.CSSProperties = {
    width: '100%',
    background: color,
    zIndex: 100,
    position: 'absolute',
    height: '100%',
    left: 0,
    top: 0,
    alignItems: 'center',
    display: 'flex',
  };

  return (
    <div style={colspanStyle}>
      <Spacing left={2}>
        <Text>{data[metadata.colspanKey]}</Text>
      </Spacing>
    </div>
  );
}
