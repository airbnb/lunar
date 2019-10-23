import React from 'react';
import { Column } from 'react-virtualized';
import T from '../../Translate';
import CheckBox from '../../CheckBox';
import Spacing from '../../Spacing';
import { ExpandedRow, SelectedRows, VirtualRow } from '../types';
import { SELECTION_OPTIONS, SELECTABLE_COLUMN_WIDTH } from '../constants';

export default function renderSelectableColumn(
  selectedRows: SelectedRows,
  handleSelection: (rowData: ExpandedRow) => () => void,
  expandable?: boolean,
) {
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

    const indentSize = expandable ? 3.5 : 2;
    const spacing = isChild || !expandable ? indentSize : 0.5;

    return (
      <Spacing vertical={0.5} right={0.5} left={spacing}>
        <CheckBox
          hideLabel
          label={T.phrase(
            'Select row',
            {},
            {
              context: 'Selecting a row from the data table',
              key: 'lunar.datatable.selectRow',
            },
          )}
          indeterminate={isNeutral}
          checked={isSelected}
          onChange={handleSelection(row.rowData)}
        />
      </Spacing>
    );
  };

  return (
    <Column
      dataKey="selected"
      cellRenderer={selectableCellRenderer}
      width={SELECTABLE_COLUMN_WIDTH}
    />
  );
}
