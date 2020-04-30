import React from 'react';
import { SortDirectionType, Table } from 'react-virtualized';
import { WithStylesProps } from '../../composers/withStyles';
import { DataTable } from './DataTable';

export type DataTableRef = (instance: DataTable) => void;
export type TableRef = React.RefObject<Table>;
export type RowHeightOptions = 'micro' | 'small' | 'regular' | 'large' | 'xLarge' | 'jumbo';
export type HeightOptions = RowHeightOptions | undefined;
export type ColumnLabelCase = 'sentence' | 'title' | 'uppercase' | '';

export type DefaultDataTableProps = keyof DataTableProps;

export type SortByValueAccessor<T extends GenericRow = GenericRow> = (
  row: T,
  columnKey: string,
) => unknown;

export interface DataTableProps {
  /** If enabled height will be inferred from parent. */
  autoHeight?: boolean;
  /** Height of the column header. */
  columnHeaderHeight?: HeightOptions;
  /** Change all column label keys to UPPERCASE or Title Case or Sentence case */
  columnLabelCase?: ColumnLabelCase;
  /** Keys mapped onto custom column label names. */
  columnToLabel?: ColumnToLabel;
  /** Override default width for specific a column's properties. */
  columnMetadata?: ColumnMetadata;
  /** Array of data rows. */
  data?: ParentRow[];
  /** Ref to the underlying DataTable instance. */
  dataTableRef?: DataTableRef;
  /** If dynamicRowHeight is enabled, this sets the default value for measured row height. */
  defaultDynamicRowHeight?: number;
  /** When enabled, row height is set dynamically to accomodate content. */
  dynamicRowHeight?: boolean;
  /** If enabled, a special column is rendered that allows row to be expanded. */
  expandable?: boolean;
  /** Filter function to handle searching and filtering.. */
  filterData?: (data: IndexedParentRow[]) => IndexedParentRow[];
  /** Function that gets called on row click. */
  onRowClick?: (rowData: ExpandedRow) => void;
  /** Height of the entire table. */
  height?: number;
  /** References row fields to render as columns, infered from data if not specified. */
  keys?: string[];
  /** If dynamicRowHeight is enabled, this sets the maximum value for measured row height. */
  maximumDynamicRowHeight?: number;
  /** If dynamicRowHeight is enabled, this sets the minimum value for measured row height. */
  minimumDynamicRowHeight?: number;
  /**
   * Specify number of additional rows react-virtualized renders in the direction the user is scrolling.
   * The higher the value, the more work react-virtualized needs to do in reaction to each scroll event.
   * Not respected when both dynamicRowHeight and showAllRows are true.
   */
  overscanRowCount?: number;
  /** Propagated as the 'ref' prop to the underlying react-virtualized Table instance. */
  propagateRef?: TableRef;
  /** Custom renderers mapped to column keys. */
  // Any so that consumers can pass any types they want.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderers?: Renderers<any>;
  /** Height of table rows, default for table header and column header height. */
  rowHeight?: RowHeightOptions;
  /**
   * If true, will set Table height to accomodate showing _all_ rows.
   * This effectively _disables_ virtualized row rendering and may have detrimental
   * performance implications for rendering many rows.
   */
  showAllRows?: boolean;
  /** If enabled, renders a border between each column. */
  showColumnDividers?: boolean;
  /** If enabled, renders a border between each row. */
  showRowDividers?: boolean;
  /** Overrides sort and hands control to the parent component. */
  sortOverride?: boolean;
  /** sortBy value if override is enabled. */
  sortByOverride?: string;
  /** Key used as part of the sort cache key, can be used to force re-sorting without a full sortOverride. */
  sortByCacheKey?: string;
  /** Given rowData and a column key, returns the value used for sorting rows. Defaults to rowData.data[columnKey]. */
  sortByValue?: SortByValueAccessor;
  /** sortDirection value if override is enabled. */
  sortDirectionOverride?: SortDirectionType;
  /** sortCallback if override is enabled. */
  sortCallback?: (sortBy: string, sortDirection: SortDirectionType) => void;
  /** Label for the table header. */
  tableHeaderLabel?: string;
  /** Height of the table header. */
  tableHeaderHeight?: HeightOptions;
  /** Width of the entire table. */
  width?: number;
  /** If enabled, every other row will appear in grey. */
  zebra?: boolean;
}

export interface GenericRow {
  data: {
    [key: string]: unknown;
  };
  metadata: {
    [key: string]: unknown;
  };
}

/** The row used by React Virtualized. */
export interface VirtualRow<T = RowData> {
  cellData?: unknown;
  columnData?: unknown;
  columnIndex: number;
  dataKey: string;
  isScrolling?: boolean;
  parent?: React.ReactNode;
  rowData: ExpandedRow<T>;
  rowIndex: number;
}

export type Status = string;

type ParentMetadata = {
  colSpanKey?: string;
  children?: ChildRow[];
  status?: string;
};

type ChildMetadata = {
  colSpanKey?: string;
  status?: Status;
};

type IndexedParentMetadata = ParentMetadata & {
  originalIndex: number;
  isChild: boolean;
  children: IndexedChildRow[];
};

type IndexedChildMetadata = ChildMetadata & {
  originalIndex: number;
  children?: undefined;
  isChild: boolean;
};

type ExpandedParentMetadata = IndexedParentMetadata & {
  preExpandedIndex: number;
  parentIndex?: undefined;
  parentOriginalIndex?: undefined;
};

type ExpandedChildMetadata = IndexedChildMetadata & {
  preExpandedIndex?: undefined;
  parentIndex: number;
  parentOriginalIndex: number;
};

export interface RowData {
  [key: string]: unknown;
}

export interface Row<T = RowData> {
  data: T;
}

export interface ChildRow<T = RowData> extends Row<T> {
  metadata?: ChildMetadata;
}

export interface ParentRow<T = RowData> extends Row<T> {
  metadata?: ParentMetadata;
}

export interface IndexedParentRow<T = RowData> extends Row<T> {
  metadata: IndexedParentMetadata;
}

export interface IndexedChildRow<T = RowData> extends Row<T> {
  metadata: IndexedChildMetadata;
}

export interface ExpandedParentRow<T = RowData> extends Row<T> {
  metadata: ExpandedParentMetadata;
}

export interface ExpandedChildRow<T = RowData> extends Row<T> {
  metadata: ExpandedChildMetadata;
}

export type IndexedRow<T = RowData> = IndexedChildRow<T> | IndexedParentRow<T>;
export type ExpandedRow<T = RowData> = ExpandedParentRow<T> | ExpandedChildRow<T>;

export type RowStyles = {
  [key: string]: string;
};

export type ColumnMetadata = {
  [key: string]: {
    [key: string]: number;
  };
};

export type ColumnToLabel = {
  [key: string]: React.ReactNode;
};

export type RendererProps<T = RowData> = {
  /** Row including row data and metadata. */
  row: VirtualRow<T>;
  /** Key being rendered. */
  keyName: keyof T;
  /** Whether or not zebra mode is enabled. */
  zebra: boolean;
  /** Theme from Lunar. */
  theme: WithStylesProps['theme'];
};

export type Renderer<T = RowData> = React.ComponentType<RendererProps<T>>;

export type Renderers<T = RowData> = {
  [key: string]: Renderer<T>;
};

export type WidthProperties = {
  [property: string]: number;
};
