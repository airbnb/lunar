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
import DataColumns from './columns/DataColumns';
import ExpandableColumn from './columns/ExpandableColumn';
import SelectableColumn from './columns/SelectableColumn';
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
    sortedDataList: indexDataList(this.props.data),
    expandedRows: new Set(),
    selectedRows: {},
    sortBy: this.props.sortByOverride || '',
    sortDirection: this.props.sortDirectionOverride || SortDirection.ASC,
    editMode: false,
  };

  static defaultProps: Pick<DataTableProps, DefaultDataTableProps> = {
    columnHeaderHeight: undefined,
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
    this.props.keys.length > 0
      ? this.props.keys
      : Array.from(
          this.props.data.reduce((keySet: Set<string>, row: ParentRow) => {
            Object.keys(row.data).forEach(key => {
              if (row.metadata == undefined || row.metadata.colspanKey !== key) {
                keySet.add(key);
              }
            });
            return keySet;
          }, new Set()),
        );

  rowStyles = (expandedDataList: ExpandedRow[]) => ({ index }: { index: number }): RowStyles => ({
    background: getRowColor(expandedDataList[index], index, this.props.zebra, this.props.theme),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: this.props.showRowDividers ? '1px solid' : '',
    borderColor: this.props.theme ? this.props.theme.color.core.neutral[1] : '',
  });

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
        sortedDataList: sortList(sortedDataList, sortDirection, this.keys, sortBy),
        sortBy,
        sortDirection,
      });
    }
  };

  private expandRow = (newExpandedRowIndex: number) => (event: any) => {
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
      if (parentIndex && !isNaN(parentIndex)) {
        newDataList[parentIndex].metadata.children[originalIndex].data[key] = newVal;
      } else if (typeof preExpandedIndex !== 'undefined') {
        newDataList[preExpandedIndex].data[key] = newVal;
      }

      return {
        sortedDataList: newDataList,
      };
    });
  }

  private handleEdit = (row: TableRow, key: string) => (
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

  private disableEditMode = () => {
    this.setState({
      editMode: false,
    });
  };

  private enableEditMode = () => {
    const { sortedDataList } = this.state;

    this.setState({
      editMode: true,
      preEditSortedDataList: JSON.parse(JSON.stringify(sortedDataList)),
    });
  };

  private cancelEditMode = () => {
    this.setState(prevState => ({
      sortedDataList: prevState.preEditSortedDataList,
      editMode: false,
    }));
  };

  private enactEdits = () => {
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

    if (parentOriginalIndex !== undefined && parentIndex !== undefined) {
      if (Object.prototype.hasOwnProperty.call(selectedRows, parentOriginalIndex)) {
        const { selectedChildren } = selectedRows[parentOriginalIndex];
        if (selectedChildren.has(originalIndex)) {
          selectedChildren.delete(originalIndex);
          if (selectedChildren.size === 0) {
            delete selectedRows[parentOriginalIndex];
          } else {
            selectedRows[parentOriginalIndex].status = SELECTION_OPTIONS.HAS_ACTIVE_CHILD;
          }
        } else {
          selectedChildren.add(originalIndex);
          if (sortedDataList[parentIndex].metadata.children.length === selectedChildren.size) {
            selectedRows[parentOriginalIndex].status = SELECTION_OPTIONS.ACTIVE;
          } else {
            selectedRows[parentOriginalIndex].status = SELECTION_OPTIONS.HAS_ACTIVE_CHILD;
          }
        }
      } else {
        selectedRows[parentOriginalIndex] = {
          status: SELECTION_OPTIONS.HAS_ACTIVE_CHILD,
          selectedChildren: new Set([originalIndex]),
        };
      }
    }

    this.setState({
      sortedDataList,
    });
  };

  private handleParentSelection(row: ExpandedRow) {
    const { selectedRows }: { selectedRows: SelectedRows } = this.state;
    const { preExpandedIndex, originalIndex } = row.metadata;

    if (typeof preExpandedIndex !== 'undefined') {
      if (Object.prototype.hasOwnProperty.call(selectedRows, originalIndex)) {
        delete selectedRows[originalIndex];
      } else {
        const children = row.metadata.children
          ? row.metadata.children.map((child: IndexedChildRow) =>
              child.metadata ? child.metadata.originalIndex : -1,
            )
          : [];
        selectedRows[originalIndex] = {
          status: SELECTION_OPTIONS.ACTIVE,
          selectedChildren: row.metadata && row.metadata.children ? new Set(children) : new Set(),
        };
      }
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
  private handleRowClick = ({ rowData }: { rowData: any }): void => {
    this.props.selectOnRowClick && this.handleSelection(rowData)();
  };

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
        handleEnableEditMode={this.enableEditMode}
        handleDisableEditMode={this.disableEditMode}
        handleCancelEditMode={this.cancelEditMode}
        handleEnactEdits={this.enactEdits}
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
    const { columnHeaderHeight, expandable, rowHeight, selectable, styles } = this.props;

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
      sortDirection,
      this.keys,
    );

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => this.renderTableHeader(width)}
        </AutoSizer>
        <div {...css(styles.table_container)}>
          <AutoSizer disableHeight>
            {({ width }) => (
              <Table
                height={this.props.height}
                width={this.props.width || width}
                headerHeight={getHeight(rowHeight, columnHeaderHeight)}
                rowCount={expandedDataList.length}
                rowHeight={HEIGHT_TO_PX[rowHeight]}
                rowGetter={this.rowGetter(expandedDataList)}
                rowStyle={this.rowStyles(expandedDataList)}
                sort={this.sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                headerRowRenderer={ColumnLabels(this.props)}
                onRowClick={this.handleRowClick}
              >
                {expandable && ExpandableColumn(styles, expandedRows, this.expandRow)}
                {selectable && SelectableColumn(selectedRows, this.handleSelection, expandable)}
                {DataColumns(this.keys, editMode, this.handleEdit, this.props)}
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default withStyles(
  theme => ({
    table_container: {
      overflowX: 'scroll',
    },
    column_header: {
      borderTop: '1px solid',
      borderBottom: '1px solid',
      borderColor: theme.color.core.neutral[1],
    },
    column: {
      height: 'inherit',
    },
    column_divider: {
      borderRight: '1px solid',
      borderColor: theme.color.core.neutral[1],
    },
    row: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    row_inner: {
      width: '100%',
    },
  }),
  {
    passThemeProp: true,
  },
)(DataTable);
