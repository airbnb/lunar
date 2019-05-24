import React from 'react';
import { AutoSizer, SortDirection, SortDirectionType, Table } from 'react-virtualized';
import sortList from './helpers/sortList';
import expandDataList from './helpers/expandDataList';
import indexDataList from './helpers/indexDataList';
import {
  ChangeLog,
  DataTableProps,
  DefaultDataTableProps,
  ExpandedRow,
  IndexedParentRow,
  ParentRow,
  RowStyles,
  TableRow,
  SelectedRows,
  IndexedChildRow,
} from './types';
import ColumnLabels from './ColumnLabels';
import renderDataColumns from './columns/DataColumns';
import renderExpandableColumn from './columns/ExpandableColumn';
import renderSelectableColumn from './columns/SelectableColumn';
import TableHeader from './TableHeader';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import { getRowColor, getHeight } from './helpers';
import { HEIGHT_TO_PX, SELECTION_OPTIONS } from './constants';

export type State = {
  changeLog: ChangeLog;
  preEditSortedDataList: IndexedParentRow[];
  sortedDataList: IndexedParentRow[];
  expandedRows: Set<number>;
  selectedRows: SelectedRows;
  sortBy: string;
  sortDirection: SortDirectionType;
  editMode: boolean;
};

/** A dynamic and responsive table for displaying tabular data. */
export class DataTable extends React.Component<DataTableProps & WithStylesProps, State> {
  state = {
    changeLog: {},
    preEditSortedDataList: [],
    sortedDataList: indexDataList(this.props.data!),
    expandedRows: new Set(),
    selectedRows: {},
    sortBy: this.props.sortByOverride || '',
    sortDirection: this.props.sortDirectionOverride!,
    editMode: false,
  };

  static defaultProps: Pick<DataTableProps, DefaultDataTableProps> = {
    columnHeaderHeight: undefined,
    columnLabelCase: '',
    columnMetadata: {},
    columnToLabel: {},
    data: [],
    defaultEditCallback: () => {},
    editable: false,
    editCallbacks: {},
    enactEditsCallback: () => {},
    expandable: false,
    extraHeaderButtons: [],
    height: 400,
    instantEdit: true,
    keys: [],
    renderers: {},
    rowHeight: 'regular',
    selectable: false,
    selectOnRowClick: false,
    showAllRows: false,
    showColumnDividers: false,
    showRowDividers: false,
    sortByOverride: '',
    sortCallback: () => {},
    sortDirectionOverride: SortDirection.ASC,
    sortOverride: false,
    tableHeaderHeight: undefined,
    tableHeaderLabel: '',
    width: 0,
    zebra: false,
  };

  // Infers keys from data if they aren't explicitely defined
  keys =
    this.props.keys && this.props.keys.length > 0
      ? this.props.keys
      : Array.from(
          this.props.data!.reduce((keySet: Set<string>, row: ParentRow) => {
            Object.keys(row.data).forEach(key => {
              if (row.metadata === undefined || row.metadata.colSpanKey !== key) {
                keySet.add(key);
              }
            });

            return keySet;
          }, new Set()),
        );

  rowStyles = (expandedDataList: ExpandedRow[]) => ({ index }: { index: number }): RowStyles => ({
    background: getRowColor(
      expandedDataList[index],
      index,
      this.props.zebra || false,
      this.props.theme,
    ),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: this.props.showRowDividers ? '1px solid' : '',
    borderColor: this.props.theme!.color.core.neutral[1],
    outline: 'none',
  });

  private getTableHeight = (expandedDataList: ExpandedRow[]) => {
    const { height, rowHeight, showAllRows } = this.props;

    return showAllRows
      ? expandedDataList.length * getHeight(rowHeight) + this.getColumnHeaderHeight()
      : height || 0;
  };

  private getColumnHeaderHeight = () => {
    const { columnHeaderHeight, rowHeight } = this.props;

    return getHeight(rowHeight, columnHeaderHeight);
  };

  private shouldRenderTableHeader = () => {
    const { editable, extraHeaderButtons, tableHeaderLabel } = this.props;

    return editable || extraHeaderButtons!.length > 0 || !!tableHeaderLabel;
  };

  private sort = ({
    sortBy,
    sortDirection,
  }: {
    sortBy: string;
    sortDirection: SortDirectionType;
  }): void => {
    const { sortOverride, sortCallback } = this.props;
    if (sortOverride && sortCallback) {
      sortCallback(sortBy, sortDirection);
    } else {
      const { sortedDataList } = this.state;

      this.setState({
        sortedDataList: sortList(sortedDataList, this.keys, sortBy, sortDirection),
        sortBy,
        sortDirection,
      });
    }
  };

  private expandRow = (newExpandedRowIndex: number) => (
    event: React.SyntheticEvent<EventTarget>,
  ) => {
    event.stopPropagation();
    this.setState(({ expandedRows }) => {
      const newExpandedRows = new Set(expandedRows);
      if (expandedRows.has(newExpandedRowIndex)) {
        newExpandedRows.delete(newExpandedRowIndex);
      } else {
        newExpandedRows.add(newExpandedRowIndex);
      }

      return {
        expandedRows: newExpandedRows,
      };
    });
  };

  private updateCellData(row: TableRow, key: string, newVal: any) {
    const { metadata } = row.rowData;
    const { preExpandedIndex, parentIndex, originalIndex } = metadata;

    this.setState(({ sortedDataList }) => {
      const newDataList = sortedDataList;
      if (parentIndex) {
        newDataList[parentIndex].metadata.children[originalIndex].data[key] = newVal;
      } else if (typeof preExpandedIndex !== 'undefined') {
        newDataList[preExpandedIndex].data[key] = newVal;
      }

      return {
        sortedDataList: newDataList,
      };
    });
  }

  private onEdit = (row: TableRow, key: string) => (
    newVal: any,
    event: React.SyntheticEvent<EventTarget>,
  ) => {
    const { defaultEditCallback, editCallbacks, instantEdit } = this.props;
    this.updateCellData(row, key, newVal);
    if (defaultEditCallback) {
      defaultEditCallback(row, key, newVal, event);
    }

    if (editCallbacks && editCallbacks[key]) {
      editCallbacks[key](row, key, newVal, event);
    }

    if (!instantEdit) {
      const { changeLog }: { changeLog: ChangeLog } = this.state;
      const { originalIndex } = row.rowData.metadata;
      if (Object.prototype.hasOwnProperty.call(changeLog, originalIndex)) {
        changeLog[originalIndex][key] = newVal;
      } else {
        changeLog[originalIndex] = { [key]: newVal };
      }
      // TODO: Maybe try to batch this with the update cell data setState
      this.setState({
        changeLog,
      });
    }
  };

  private handleDisableEditMode = () => {
    this.setState({
      editMode: false,
    });
  };

  private handleEnableEditMode = () => {
    const { sortedDataList } = this.state;

    this.setState({
      editMode: true,
      preEditSortedDataList: JSON.parse(JSON.stringify(sortedDataList)),
    });
  };

  private handleCancelEditMode = () => {
    this.setState(prevState => ({
      sortedDataList: prevState.preEditSortedDataList,
      editMode: false,
    }));
  };

  private handleEnactEdits = () => {
    const { changeLog } = this.state;
    const { enactEditsCallback } = this.props;
    this.setState({
      editMode: false,
      changeLog: {},
    });
    if (enactEditsCallback) {
      enactEditsCallback(changeLog);
    }
  };

  private handleChildSelection = (row: ExpandedRow) => {
    const {
      sortedDataList,
      selectedRows,
    }: { sortedDataList: IndexedParentRow[]; selectedRows: SelectedRows } = this.state;

    const { parentOriginalIndex, parentIndex, originalIndex } = row.metadata;

    // If parent is already selected
    if (Object.prototype.hasOwnProperty.call(selectedRows, parentOriginalIndex!)) {
      const { selectedChildren } = selectedRows[parentOriginalIndex!];
      // If child is already selected
      if (selectedChildren.has(originalIndex)) {
        selectedChildren.delete(originalIndex);
        // If there are now 0 selected children
        if (selectedChildren.size === 0) {
          delete selectedRows[parentOriginalIndex!];
          // If there is still at least one selected child
        } else {
          selectedRows[parentOriginalIndex!].status = SELECTION_OPTIONS.HAS_ACTIVE_CHILD;
        }
        // If child is not already selected
      } else {
        selectedChildren.add(originalIndex);
        // If all children are now selected
        if (sortedDataList[parentIndex!].metadata.children.length === selectedChildren.size) {
          selectedRows[parentOriginalIndex!].status = SELECTION_OPTIONS.ACTIVE;
          // If not all children are now selected
        } else {
          selectedRows[parentOriginalIndex!].status = SELECTION_OPTIONS.HAS_ACTIVE_CHILD;
        }
      }
      // If parent is not already selected
    } else {
      selectedRows[parentOriginalIndex!] = {
        status: SELECTION_OPTIONS.HAS_ACTIVE_CHILD,
        selectedChildren: new Set([originalIndex]),
      };
    }

    this.setState({
      sortedDataList,
    });
  };

  private handleParentSelection(row: ExpandedRow) {
    const { selectedRows }: { selectedRows: SelectedRows } = this.state;
    const { originalIndex } = row.metadata;

    // If parent is already selected
    if (Object.prototype.hasOwnProperty.call(selectedRows, originalIndex)) {
      delete selectedRows[originalIndex];
      // If parent is not already selected
    } else {
      // Is there are children, select them all
      const children = row.metadata.children
        ? row.metadata.children.map((child: IndexedChildRow) => child.metadata.originalIndex)
        : [];
      selectedRows[originalIndex] = {
        status: SELECTION_OPTIONS.ACTIVE,
        selectedChildren: new Set(children),
      };
    }

    this.setState({ selectedRows });
  }

  private handleSelection = (rowData: ExpandedRow) => () => {
    if (rowData.metadata.isChild) {
      this.handleChildSelection(rowData);
    } else {
      this.handleParentSelection(rowData);
    }
  };

  // Have to use any to match react-virutalized's specified callback signature
  private handleRowClick = ({ rowData }: { rowData: any }) =>
    this.props.selectOnRowClick && this.handleSelection(rowData)();

  renderTableHeader(parentWidth: number) {
    const {
      editable,
      instantEdit,
      extraHeaderButtons,
      rowHeight,
      tableHeaderLabel,
      tableHeaderHeight,
    } = this.props;

    const { editMode, selectedRows } = this.state;

    return (
      <TableHeader
        editable={editable}
        editMode={editMode}
        instantEdit={instantEdit}
        onEnableEditMode={this.handleEnableEditMode}
        onDisableEditMode={this.handleDisableEditMode}
        onCancelEditMode={this.handleCancelEditMode}
        onEnactEdits={this.handleEnactEdits}
        extraHeaderButtons={extraHeaderButtons}
        height={getHeight(rowHeight, tableHeaderHeight)}
        selectedRows={selectedRows}
        tableHeaderLabel={tableHeaderLabel}
        width={this.props.width ? Math.min(this.props.width, parentWidth) : parentWidth}
      />
    );
  }

  rowGetter = (expandedDataList: ExpandedRow[]) => ({ index }: { index: number }) =>
    expandedDataList[index];

  render() {
    const { expandable, propagateRef, rowHeight, selectable, styles } = this.props;

    const {
      sortedDataList,
      expandedRows,
      sortBy,
      sortDirection,
      editMode,
      selectedRows,
    } = this.state;

    const expandedDataList = expandDataList(
      sortedDataList,
      expandedRows,
      sortBy,
      this.keys,
      sortDirection,
    );

    return (
      <div>
        {this.shouldRenderTableHeader() && (
          <AutoSizer disableHeight>
            {({ width }: { width: number }) => this.renderTableHeader(width)}
          </AutoSizer>
        )}
        <div {...css(styles.table_container)}>
          <AutoSizer disableHeight>
            {({ width }: { width: number }) => (
              <Table
                height={this.getTableHeight(expandedDataList)}
                width={this.props.width || width}
                headerHeight={this.getColumnHeaderHeight()}
                ref={propagateRef}
                rowCount={expandedDataList.length}
                rowHeight={HEIGHT_TO_PX[rowHeight!]}
                rowGetter={this.rowGetter(expandedDataList)}
                rowStyle={this.rowStyles(expandedDataList)}
                sort={this.sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                headerRowRenderer={ColumnLabels(this.props)}
                onRowClick={this.handleRowClick}
              >
                {expandable && renderExpandableColumn(styles, expandedRows, this.expandRow)}
                {selectable &&
                  renderSelectableColumn(selectedRows, this.handleSelection, expandable)}
                {renderDataColumns(this.keys, editMode, this.onEdit, this.props)}
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default withStyles(
  (theme: WithStylesProps['theme']) => ({
    table_container: {
      overflowX: 'auto',
    },
    column_header: {
      borderTop: '1px solid',
      borderBottom: '1px solid',
      borderColor: theme!.color.core.neutral[1],
      cursor: 'pointer',
    },
    column: {
      height: 'inherit',
    },
    column_divider: {
      borderRight: '1px solid',
      borderColor: theme!.color.core.neutral[1],
    },
    row: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    row_inner: {
      width: '100%',
    },
    expand_caret: {
      cursor: 'pointer',
    },
  }),
  {
    passThemeProp: true,
  },
)(DataTable);
