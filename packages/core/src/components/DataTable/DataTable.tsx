import React from 'react';
import { CellMeasurerCache, SortDirection, SortDirectionType, Table } from 'react-virtualized';
import memoize from 'lodash/memoize';
import { styleSheetDataTable as styleSheet } from './styles';
import sortData from './helpers/sortData';
import expandData from './helpers/expandData';
import { indexData } from './helpers/indexData';
import {
  DataTableProps,
  DefaultDataTableProps,
  ExpandedRow,
  IndexedParentRow,
  ParentRow,
  RowStyles,
} from './types';
import ColumnLabels from './ColumnLabels';
import TableHeader from './TableHeader';
import renderDataColumns from './columns/renderDataColumns';
import renderExpandableColumn from './columns/renderExpandableColumn';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import { getRowColor, getHeight, getKeys } from './helpers';
import { HEIGHT_TO_PX } from './constants';

export type DataTableState = {
  expandedRows: Set<number>;
  sortBy: string;
  sortDirection: SortDirectionType;
};

/** A dynamic and responsive table for displaying tabular data. */
export class DataTable extends React.Component<DataTableProps & WithStylesProps, DataTableState> {
  static defaultProps: Pick<DataTableProps, DefaultDataTableProps> = {
    autoHeight: false,
    columnHeaderHeight: undefined,
    columnLabelCase: '',
    columnMetadata: {},
    columnToLabel: {},
    data: [],
    defaultDynamicRowHeight: 16,
    dynamicRowHeight: false,
    expandable: false,
    filterData: (data: IndexedParentRow[]) => data,
    height: 400,
    keys: [],
    minimumDynamicRowHeight: undefined,
    onRowClick: () => {},
    overscanRowCount: 2,
    renderers: {},
    rowHeight: 'regular',
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

  state: DataTableState = {
    expandedRows: new Set(),
    sortBy: this.props.sortByOverride || '',
    sortDirection: this.props.sortDirectionOverride!,
  };

  timeoutId: number = 0;

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
      sortByCacheKey?: string, // used only in the memoize cache key below
    ): IndexedParentRow[] => {
      const { sortByValue } = this.props;
      const indexedData = indexData(data);
      const sortedData = sortData(indexedData, this.keys, sortBy, sortDirection, sortByValue);

      return sortedData;
    },
    (...args) => JSON.stringify(args),
  );

  componentDidUpdate(prevProps: DataTableProps, prevState: DataTableState) {
    const { dynamicRowHeight, data, filterData, width, height, sortByCacheKey } = this.props;
    const { sortBy, sortDirection } = this.state;
    const dimensionsChanged = width !== prevProps.width || height !== prevProps.height;
    const sortChanged = sortByCacheKey !== prevProps.sortByCacheKey;
    const sortedData: IndexedParentRow[] = this.getData(
      data!,
      sortBy,
      sortDirection,
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

    if (this.props.data !== prevProps.data) {
      this.keys = getKeys(this.props.keys!, this.props.data!);

      this.setState({
        expandedRows: new Set(),
      });
    } else if (dynamicRowHeight && (filteredDataChanged || dimensionsChanged || sortChanged)) {
      // We need to make sure the cache is cleared before React tries to re-render.
      if (!this.timeoutId) {
        this.timeoutId = window.setTimeout(() => {
          this.cache.clearAll();
          this.forceUpdate();
          this.timeoutId = 0;
        });
      }
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) window.clearTimeout(this.timeoutId);
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
    return !!this.props.tableHeaderLabel;
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
      if (!this.timeoutId) {
        this.timeoutId = window.setTimeout(() => {
          this.cache.clearAll();
          this.forceUpdate();
          this.timeoutId = 0;
        });
      }
    }
  };

  private handleRowClick = ({ rowData }: { rowData: ExpandedRow }) =>
    this.props.onRowClick && this.props.onRowClick(rowData);

  renderTableHeader(parentWidth: number) {
    const { rowHeight, tableHeaderLabel, tableHeaderHeight } = this.props;

    return (
      <TableHeader
        tableHeaderLabel={tableHeaderLabel}
        height={getHeight(rowHeight, tableHeaderHeight)}
        width={this.props.width ? Math.min(this.props.width, parentWidth) : parentWidth}
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
      cx,
      data,
      dynamicRowHeight,
      expandable,
      filterData,
      height,
      overscanRowCount,
      propagateRef,
      rowHeight,
      sortByCacheKey,
      styles,
      tableHeaderHeight,
      showAllRows,
      width,
    } = this.props;

    const { expandedRows, sortBy, sortDirection } = this.state;

    const sortedData: IndexedParentRow[] = this.getData(
      data!,
      sortBy,
      sortDirection,
      sortByCacheKey,
    );

    const filteredData = filterData!(sortedData);

    const expandedData = expandData(filteredData, expandedRows, sortBy, this.keys, sortDirection);

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
            overscanRowCount={
              dynamicRowHeight && showAllRows ? expandedData.length : overscanRowCount!
            }
            onRowClick={this.handleRowClick}
          >
            {expandable && renderExpandableColumn(cx, styles, expandedRows, this.expandRow)}
            {renderDataColumns(this.keys, this.cache, this.props)}
          </Table>
        </div>
      </>
    );
  }
}

export default withStyles(styleSheet, {
  passThemeProp: true,
})(DataTable);
