import React from 'react';
import { AutoSizer } from 'react-virtualized';
import DataTable from './DataTable';
import { DataTableProps } from './types';

export * from './types';

function DataTableWithDimensions(props: DataTableProps) {
  return (
    <AutoSizer disableHeight={!props.autoHeight}>
      {({ height, width }) => (
        <DataTable width={width} height={props.autoHeight ? height : undefined} {...props} />
      )}
    </AutoSizer>
  );
}

export default DataTableWithDimensions;
