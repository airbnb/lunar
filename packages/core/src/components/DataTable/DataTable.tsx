import React from 'react';
import { CellMeasurerCache, SortDirection, SortDirectionType, Table } from 'react-virtualized';
import memoize from 'lodash/memoize';
import { styleSheetDataTable as styleSheet } from './styles';
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
    autoHeight: false,
    columnHeaderHeight: undefined,
    columnLabelCase: '',
    columnMetadata: {},
    columnToLabel: {},
    data: [],
    defaultDynamicRowHeight: 16,
    defaultEditCallback: () => {},
    dynamicRowHeight: false,
    editable: false,
    editCallbacks: {},
    enactEditsCallback: () => {},
    expandable: false,
    extraHeaderButtons: [],
    filterData: (data: IndexedParentRow[]) => data,
    height: 400,
    instantEdit: true,
    keys: [],
    minimumDynamicRowHeight: undefined,
    renderers: {},
    rowHeight: 'regular',
    selectable: false,
    // eslint-disable-next-line unicorn/consistent-function-scoping
    selectCallback: () => () => {},
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

  constructor(props: DataTableProps & WithStylesProps) {
    super(props);
    if (this.props.dataTableRef) {
      this.props.dataTableRef(this);
    }
  }

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
      sortByCacheKey?: string, // used only in the memoize cache key below
    ): IndexedParentRow[] => {
      const { selectedRowsFirst, sortByValue } = this.props;
      const indexedData = indexData(data);
      const sortedData = sortData(
        indexedData,
        this.keys,
        selectedRows,
        selectedRowsFirst!,
        sortBy,
        sortDirection,
        sortByValue,
      );

      return sortedData;
    },
    (...args) => JSON.stringify(args),
  );

  componentDidUpdate(prevProps: DataTableProps, prevState: State) {
    const { dynamicRowHeight, data, filterData, width, height, sortByCacheKey } = this.props;
    const { sortBy, sortDirection, selectedRows } = this.state;
    const dimensionsChanged = width !== prevProps.width || height !== prevProps.height;
    const sortChanged =
      sortBy !== prevState.sortBy ||
      sortDirection !== prevState.sortDirection ||
      sortByCacheKey !== prevProps.sortByCacheKey;
    const sortedData: IndexedParentRow[] = this.getData(
      data!,
      sortBy,
      sortDirection,
      selectedRows,
      sortByCacheKey,
    );
    const filteredData = filterData!(sortedData);
    const oldFilteredData = prevProps.filterData!(sortedData);
    const filteredDataChanged =
      filteredData.length > 0 &&
      (filteredData.length !== oldFilteredData.length ||
        filteredData.some(
          (x: IndexedParentRow, i: number) =>
            x.metadata.originalIndex !== oldFilteredData[i].metadata.originalIndex,
        ));

    if (dynamicRowHeight && (filteredDataChanged || dimensionsChanged || sortChanged)) {
      // We need to make sure the cache is cleared before React tries to re-render.
      setTimeout(() => {
        this.cache.clearAll();
        this.forceUpdate();
      }, 0);
    }

    if (this.props.data !== prevProps.data) {
      this.keys = getKeys(this.props.keys!, this.props.data!);

      this.setState({
        selectedRows: {},
        expandedRows: new Set(),
      });
    }
  }

  private getTableHeight = (expandedDataList: ExpandedRow[]): number => {
    const { height, rowHeight, showAllRows, dynamicRowHeight } = this.props;
    // @ts-ignore _rowHeightCache is missing from DataTable types
    // eslint-disable-next-line no-underscore-dangle
    const rowHeights: { [key: number]: number } = this.cache._rowHeightCache;

    if (showAllRows) {
      if (dynamicRowHeight) {
        if (Object.values(rowHeights).length > 0) {
          const totalHeight = Object.values(rowHeights).reduce(
            (sum: number, measuredRowHeight: number) => sum + measuredRowHeight,
            0,
          );
          return totalHeight + this.getColumnHeaderHeight();
        }
        this.forceUpdate();
      } else {
        return expandedDataList.length * getHeight(rowHeight) + this.getColumnHeaderHeight();
      }
    }

    return height || 0;
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
    this.cache.clearAll();
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

  private expandRow = (newExpandedRowOriginalIndex: number) => (
    event: React.SyntheticEvent<EventTarget>,
  ) => {
    const { dynamicRowHeight } = this.props;
    event.stopPropagation();
    this.setState(({ expandedRows }) => {
      const newExpandedRows = new Set(expandedRows);
      if (expandedRows.has(newExpandedRowOriginalIndex)) {
        newExpandedRows.delete(newExpandedRowOriginalIndex);
      } else {
        newExpandedRows.add(newExpandedRowOriginalIndex);
      }

      return {
        expandedRows: newExpandedRows,
      };
    });
    if (dynamicRowHeight) {
      // We need to make sure the cache is cleared before React tries to re-render.
      setTimeout(() => {
        this.cache.clearAll();
        this.forceUpdate();
      }, 0);
    }
  };

  private onEdit = (
    row: VirtualRow,
    key: string | number,
    newVal: string,
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

      if (changeLog[originalIndex] && changeLog[originalIndex][key]) {
        changeLog[originalIndex][key] = { newVal };
      } else {
        changeLog[originalIndex] = { [key]: { newVal } };
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
    const { data, selectCallback, sortByCacheKey } = this.props;
    const {
      selectedRows,
      sortBy,
      sortDirection,
    }: {
      selectedRows: SelectedRows;
      sortBy: string;
      sortDirection: SortDirectionType;
    } = this.state;

    const sortedData: IndexedParentRow[] = this.getData(
      data!,
      sortBy,
      sortDirection,
      selectedRows,
      sortByCacheKey,
    );

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
  private handleRowClick = ({ rowData }: { rowData: ExpandedRow }) =>
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
        extraHeaderButtons={extraHeaderButtons}
        editable={editable}
        tableHeaderLabel={tableHeaderLabel}
        selectedRows={selectedRows}
        instantEdit={instantEdit!}
        editMode={editMode}
        height={getHeight(rowHeight, tableHeaderHeight)}
        width={this.props.width ? Math.min(this.props.width, parentWidth) : parentWidth}
        onDisableEditMode={this.handleDisableEditMode}
        onEnableEditMode={this.handleEnableEditMode}
        onEnactEdits={this.handleEnactEdits}
      />
    );
  }

  rowGetter = (expandedDataList: ExpandedRow[]) => ({ index }: { index: number }) =>
    expandedDataList[index];

  public cache = new CellMeasurerCache({
    fixedHeight: false,
    fixedWidth: true,
    defaultHeight: this.props.defaultDynamicRowHeight,
    minHeight: this.props.minimumDynamicRowHeight,
  });

  render() {
    const {
      autoHeight,
      data,
      dynamicRowHeight,
      expandable,
      filterData,
      propagateRef,
      rowHeight,
      selectable,
      styles,
      selectedRowsFirst,
      tableHeaderHeight,
      cx,
      showAllRows,
      width,
      height,
      sortByCacheKey,
    } = this.props;

    const { expandedRows, sortBy, sortDirection, editMode, selectedRows } = this.state;

    const sortedData: IndexedParentRow[] = this.getData(
      data!,
      sortBy,
      sortDirection,
      selectedRows,
      sortByCacheKey,
    );

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

    const tableHeight = autoHeight
      ? (height || 0) -
        (this.shouldRenderTableHeader() ? getHeight(rowHeight, tableHeaderHeight) : 0)
      : this.getTableHeight(expandedData);

    return (
      <>
        {this.shouldRenderTableHeader() && this.renderTableHeader(width!)}
        <div className={cx(styles.table_container, { width })}>
          <Table
            ref={propagateRef}
            height={tableHeight}
            width={width!}
            rowCount={expandedData.length}
            rowGetter={this.rowGetter(expandedData)}
            sort={this.sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            headerHeight={this.getColumnHeaderHeight()}
            headerRowRenderer={ColumnLabels(this.props)}
            rowHeight={dynamicRowHeight ? this.cache.rowHeight : HEIGHT_TO_PX[rowHeight!]}
            rowStyle={this.getRowStyle(expandedData)}
            overscanRowCount={dynamicRowHeight && showAllRows ? expandedData.length : 2}
            onRowClick={this.handleRowClick}
          >
            {expandable && renderExpandableColumn(cx, styles, expandedRows, this.expandRow)}
            {selectable && renderSelectableColumn(selectedRows, this.handleSelection, expandable)}
            {renderDataColumns(this.keys, editMode, this.onEdit, this.cache, this.props)}
          </Table>
        </div>
      </>
    );
  }
}

export default withStyles(styleSheet, {
  passThemeProp: true,
})(DataTable);
