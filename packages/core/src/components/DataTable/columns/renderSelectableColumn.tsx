import React from 'react';
import { Column } from 'react-virtualized';
import CheckBox from '../../CheckBox';
import Spacing from '../../Spacing';
import { ExpandedRow, SelectedRows, VirtualRow } from '../types';
import {
  SELECTION_OPTIONS,
  SELECTABLE_COLUMN_WIDTH,
  SELECTABLE_COLUMN_WIDTH_EXPANDABLE,
} from '../constants';

export default function renderSelectableColumn(
  selectedRows: SelectedRows,
  handleSelection: (rowData: ExpandedRow) => () => void,
  expandable?: boolean,
) {
  const width = expandable ? SELECTABLE_COLUMN_WIDTH_EXPANDABLE : SELECTABLE_COLUMN_WIDTH;

  const selectableCellRenderer = (row: VirtualRow) => {
    const { metadata } = row.rowData;
    const { originalIndex, parentOriginalIndex, isChild } = metadata;

    let isSelected;
    if (isChild && parentOriginalIndex !== undefined) {
      isSelected =
        Object.prototype.hasOwnProperty.call(selectedRows, parentOriginalIndex) &&
        selectedRows[parentOriginalIndex].selectedChildren.has(originalIndex);
    } else {
      isSelected =
        Object.prototype.hasOwnProperty.call(selectedRows, originalIndex) &&
        selectedRows[originalIndex].status === SELECTION_OPTIONS.ACTIVE;
    }

    const isNeutral =
      !isChild &&
      Object.prototype.hasOwnProperty.call(selectedRows, originalIndex) &&
      selectedRows[originalIndex].status === SELECTION_OPTIONS.HAS_ACTIVE_CHILD;

    const indentSize = expandable ? 2.5 : 2;
    const spacing = isChild || !expandable ? indentSize : 0;

    return (
      <Spacing left={spacing}>
        <CheckBox
          label=""
          name=""
          indeterminate={isNeutral}
          checked={isSelected}
          onChange={handleSelection(row.rowData)}
        />
      </Spacing>
    );
  };

  return <Column dataKey="selected" cellRenderer={selectableCellRenderer} width={width} />;
}
