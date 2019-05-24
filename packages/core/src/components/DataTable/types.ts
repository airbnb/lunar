import React from 'react';
import { SortDirectionType, Table } from 'react-virtualized';
import { WithStylesProps } from '../../composers/withStyles';

export type TableRef = React.RefObject<Table>;

export type RowHeightOptions = string;
export type HeightOptions = RowHeightOptions | undefined;
export type ColumnLabelCase = 'sentence' | 'title' | 'uppercase' | '';

export type SelectedRows = {
  [key: number]: {
    status: string;
    selectedChildren: Set<number>;
  };
};

export type ChangeLog = {
  [key: number]: {
    [key: string]: {
      newVal: any;
    };
  };
};

type EditCallback = (
  row: TableRow,
  key: string,
  newVal: any,
  event: React.SyntheticEvent<EventTarget>,
) => void;

export type OnEdit = (
  row: TableRow,
  key: string,
) => (newVal: any, event: React.SyntheticEvent<EventTarget>) => void;

export type HeaderButton = {
  label: string;
  onClick: (selectedRows: SelectedRows) => () => void;
  display?: boolean;
  displayEditMode?: boolean;
};

export type DefaultDataTableProps = keyof DataTableProps;

export interface DataTableProps {
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
  /** Default callback on all edits. */
  defaultEditCallback?: EditCallback;
  /** Specifies whether or not editMode can be enabled. */
  editable?: boolean;
  /** Callback for any specific key, called on all edits. */
  editCallbacks?: { [key: string]: EditCallback };
  /** When instant edit is disabled, callback that gets trigged on edit application. */
  enactEditsCallback?: (changeLog: ChangeLog) => void;
  /** If enabled, a special column is rendered that allows row to be expanded. */
  expandable?: boolean;
  /** Extra buttons to render in the header during non-edit mode. */
  extraHeaderButtons?: HeaderButton[];
  /** Height of the entire table. */
  height?: number;
  /** If enabled, every edit immediately triggers a parent callback, see docs for details. */
  instantEdit?: boolean;
  /** References row fields to render as columns, infered from data if not specified. */
  keys?: string[];
  /** Propagated as the 'ref' prop to the underlying react-virtualized Table instance. */
  propagateRef?: TableRef;
  /** Custom renderers mapped to column keys. */
  renderers?: Renderers;
  /** Height of table rows, default for table header and column header height. */
  rowHeight?: RowHeightOptions;
  /** If enabled, a special column is rendered to allows rows to be selected. */
  selectable?: boolean;
  /** If enabled, clicking the row triggers the same function as click the selection checkbox. */
  selectOnRowClick?: boolean;
  /**
   * If true, will set Table height to accomodate showing _all_ rows.
   * This effectively _disables_ virtualized row rendering and may have detrimental
+  * performance implications for rendering many rows.
   * */
  showAllRows?: boolean;
  /** If enabled, renders a border between each column. */
  showColumnDividers?: boolean;
  /** If enabled, renders a border between each row. */
  showRowDividers?: boolean;
  /** Overrides sort and hands control to the parent component. */
  sortOverride?: boolean;
  /** sortBy value if override is enabled. */
  sortByOverride?: string;
  /** sortDirection value if override is enabled. */
  sortDirectionOverride?: SortDirectionType;
  /** sortCallback in override is enabled. */
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
    [key: string]: any;
  };
}

/** The row used by React Virtualized. */
export interface TableRow {
  cellData?: void;
  columnData?: void;
  columnIndex: number;
  dataKey: string;
  isScrolling?: boolean;
  parent?: React.ReactNode;
  rowData: ExpandedRow;
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

interface Row {
  data: {
    [key: string]: any;
  };
}

export interface ChildRow extends Row {
  metadata?: ChildMetadata;
}

export interface ParentRow extends Row {
  metadata?: ParentMetadata;
}

export interface IndexedParentRow extends Row {
  metadata: IndexedParentMetadata;
}
export interface IndexedChildRow extends Row {
  metadata: IndexedChildMetadata;
}

export interface ExpandedParentRow extends Row {
  metadata: ExpandedParentMetadata;
}
export interface ExpandedChildRow extends Row {
  metadata: ExpandedChildMetadata;
}

export type IndexedRow = IndexedChildRow | IndexedParentRow;
export type ExpandedRow = ExpandedParentRow | ExpandedChildRow;

export type RowStyles = {
  [key: string]: string;
};

export type ColumnMetadata = {
  [key: string]: {
    [key: string]: number;
  };
};

export type ColumnToLabel = {
  [key: string]: any;
};

export type RendererProps = {
  /** Row including row data and metadata. */
  row: TableRow;
  /** Key being rendered. */
  key: string;
  /** Whether or not edit mode is enabled. */
  editMode: boolean;
  /** Callback to trigger on cell edit. */
  onEdit: OnEdit;
  /** Whether or not zebra mode is enabled. */
  zebra: boolean;
  /** Theme from Lunar. */
  theme: WithStylesProps['theme'];
};

type Renderer = (props: RendererProps) => NonNullable<React.ReactNode>;

export type Renderers = {
  [key: string]: Renderer;
};

export type WidthProperties = {
  [property: string]: number;
};
