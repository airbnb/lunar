import React from 'react';
import { AutoSizer, SortDirection, SortDirectionType, Table } from 'react-virtualized';
import memoize from 'lodash/memoize';
import sortData from './helpers/sortData';
import expandData from './helpers/expandData';
import { indexData } from './helpers/indexData';
import {
  ChangeLog,
  DataTableProps,
  DefaultDataTableProps,
  ExpandedRow,
  IndexedParentRow,
  ParentRow,
  RowStyles,
  VirtualRow,
  SelectedRows,
  IndexedChildRow,
} from './types';
import ColumnLabels from './ColumnLabels';
import TableHeader from './TableHeader';
import renderDataColumns from './columns/renderDataColumns';
import renderExpandableColumn from './columns/renderExpandableColumn';
import renderSelectableColumn from './columns/renderSelectableColumn';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { getRowColor, getHeight, getKeys } from './helpers';
import { HEIGHT_TO_PX, SELECTION_OPTIONS } from './constants';

export * from './types';

export type State = {
  changeLog: ChangeLog;
  expandedRows: Set<number>;
  selectedRows: SelectedRows;
  sortBy: string;
  sortDirection: SortDirectionType;
  editMode: boolean;
};

/** A dynamic and responsive table for displaying tabular data. */
export class DataTable extends React.Component<DataTableProps & WithStylesProps, State> {
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
    filterData: (data: IndexedParentRow[]) => data,
    height: 400,
    instantEdit: true,
    keys: [],
    renderers: {},
    rowHeight: 'regular',
    selectable: false,
    selectCallback: (rowData: ExpandedRow, selectedRows: SelectedRows) => () => {},
    selectedRowsFirst: false,
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

  state: State = {
    changeLog: {},
    expandedRows: new Set(),
    selectedRows: {},
    sortBy: this.props.sortByOverride || '',
    sortDirection: this.props.sortDirectionOverride!,
    editMode: false,
  };

  keys = getKeys(this.props.keys!, this.props.data!);

  private getRowStyle = (expandedDataList: ExpandedRow[]) => ({
    index,
  }: {
    index: number;
  }): RowStyles => ({
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

  private getData = memoize(
    (
      data: ParentRow[],
      sortBy: string,
      sortDirection: SortDirectionType,
      selectedRows: SelectedRows,
    ): IndexedParentRow[] => {
      const { selectedRowsFirst } = this.props;
      const indexedData = indexData(data);
      const sortedData = sortData(
        indexedData,
        this.keys,
        selectedRows,
        selectedRowsFirst!,
        sortBy,
        sortDirection,
      );

      return sortedData;
    },
    (...args) => JSON.stringify(args),
  );

  componentDidUpdate(prevProps: DataTableProps) {
    if (this.props.data !== prevProps.data) {
      this.keys = getKeys(this.props.keys!, this.props.data!);

      this.setState({
        selectedRows: {},
        expandedRows: new Set(),
      });
    }
  }

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
      this.setState({
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

  private onEdit = (
    row: VirtualRow,
    key: string,
    newVal: any,
    event: React.SyntheticEvent<EventTarget>,
  ) => {
    const { defaultEditCallback, editCallbacks, instantEdit } = this.props;
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

  private handleEnactEdits = () => {
    const { enactEditsCallback } = this.props;
    const { changeLog } = this.state;
    this.setState({
      editMode: false,
    });
    if (enactEditsCallback) {
      enactEditsCallback(changeLog);
    }
  };

  private handleEnableEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  private handleChildSelection = (row: ExpandedRow) => {
    const { data, selectCallback } = this.props;
    const {
      selectedRows,
      sortBy,
      sortDirection,
    }: {
      selectedRows: SelectedRows;
      sortBy: string;
      sortDirection: SortDirectionType;
    } = this.state;

    const sortedData: IndexedParentRow[] = this.getData(data!, sortBy, sortDirection, selectedRows);

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
        if (sortedData[parentIndex!].metadata.children.length === selectedChildren.size) {
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

    this.setState({ selectedRows }, selectCallback!(row, selectedRows));
  };

  private handleParentSelection(row: ExpandedRow) {
    const { selectedRows } = this.state;
    const { selectCallback } = this.props;
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

    this.setState({ selectedRows }, selectCallback!(row, selectedRows));
  }

  private handleSelection = (rowData: ExpandedRow) => () => {
    if (rowData.metadata.isChild) {
      this.handleChildSelection(rowData);
    } else {
      this.handleParentSelection(rowData);
    }
  };

  // Have to use `any` to match react-virutalized's specified callback signature.
  private handleRowClick = ({ rowData }: { rowData: any }) =>
    this.props.selectOnRowClick && this.handleSelection(rowData)();

  renderTableHeader(parentWidth: number) {
    const {
      editable,
      extraHeaderButtons,
      instantEdit,
      rowHeight,
      tableHeaderLabel,
      tableHeaderHeight,
    } = this.props;

    const { editMode, selectedRows } = this.state;

    return (
      <TableHeader
        editable={editable}
        editMode={editMode}
        onEnactEdits={this.handleEnactEdits}
        onEnableEditMode={this.handleEnableEditMode}
        onDisableEditMode={this.handleDisableEditMode}
        extraHeaderButtons={extraHeaderButtons}
        height={getHeight(rowHeight, tableHeaderHeight)}
        instantEdit={instantEdit!}
        selectedRows={selectedRows}
        tableHeaderLabel={tableHeaderLabel}
        width={this.props.width ? Math.min(this.props.width, parentWidth) : parentWidth}
      />
    );
  }

  rowGetter = (expandedDataList: ExpandedRow[]) => ({ index }: { index: number }) =>
    expandedDataList[index];

  render() {
    const {
      cx,
      data,
      expandable,
      filterData,
      propagateRef,
      rowHeight,
      selectable,
      styles,
      selectedRowsFirst,
    } = this.props;

    const { expandedRows, sortBy, sortDirection, editMode, selectedRows } = this.state;

    const sortedData: IndexedParentRow[] = this.getData(data!, sortBy, sortDirection, selectedRows);

    const filteredData = filterData!(sortedData);

    const expandedData = expandData(
      filteredData,
      expandedRows,
      selectedRows,
      selectedRowsFirst!,
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
        <div className={cx(styles.table_container)}>
          <AutoSizer disableHeight>
            {({ width }: { width: number }) => (
              <Table
                height={this.getTableHeight(expandedData)}
                width={this.props.width || width}
                headerHeight={this.getColumnHeaderHeight()}
                ref={propagateRef}
                rowCount={expandedData.length}
                rowHeight={HEIGHT_TO_PX[rowHeight!]}
                rowGetter={this.rowGetter(expandedData)}
                rowStyle={this.getRowStyle(expandedData)}
                sort={this.sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                headerRowRenderer={ColumnLabels(this.props)}
                onRowClick={this.handleRowClick}
              >
                {expandable && renderExpandableColumn(cx, styles, expandedRows, this.expandRow)}

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
  ({ ui }) => ({
    table_container: {
      overflowX: 'auto',
    },
    column_header: {
      borderBottom: ui.border,
      cursor: 'pointer',
    },
    column: {
      height: 'inherit',
    },
    column_divider: {
      borderRight: ui.border,
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
