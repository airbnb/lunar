import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DataTable from './DataTable';
import {
  SelectedRows,
  TableRow,
} from './DataTable/types';

const getData = require('../../../../guide/DataTableData').default;
const tenureRenderer = require('../../../../guide/DataTableRenderers/TenureRenderer').default;
const colspanRenderer = require('../../../../guide/DataTableRenderers/ColspanRenderer').default;
const catRenderer = require('../../../../guide/DataTableRenderers/CatRenderer').default;
const menuRenderer = require('../../../../guide/DataTableRenderers/MenuRenderer').default;

const renderers = {
  colspan: colspanRenderer,
  cats: catRenderer,
  tenureDays: tenureRenderer,
  menu: menuRenderer,
};

const columnMetadata = {
  jobTitle: {
    flexGrow: 0.5,
  },
  log: {
    width: 82,
    flexGrow: 0,
  },
  tenureDays: {
    rightAlign: 1,
  },
};

const headerButtonClick = (selectedRows: SelectedRows) => () => {
  console.log(selectedRows);
}

const headerButtons = [
  {
    label: 'Always Displayed',
    display: true,
    displayEditMode: true,
    onClick: headerButtonClick
  },
  {
    label: 'Extra Non Edit Button',
    display: true,
    displayEditMode: false,
    onClick: headerButtonClick
  },
  {
    label: 'Extra Edit Mode Button',
    display: false,
    displayEditMode: true,
    onClick: headerButtonClick
  },
];

const columnToLabel = {
  tenureDays: 'TENURE',
};

const catsCallback = () => {
  console.log('meow');
}

const editCallbacks = {
  'cats': catsCallback,
};

const defaultEditCallback = (row: TableRow, key: string, newVal: any, event:  React.SyntheticEvent<EventTarget>,) => {
  console.log({
    row,
    key,
    newVal,
    event,
  });
}

storiesOf('Core/DataTable', module)
  .addParameters({
    inspectComponents: [DataTable],
  })
  .add('A standard table.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
    />
  ))
  .add('A table with selectable and exandable rows.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      expandable
    />
  ))
  .add('An editable table.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      selectable
      expandable
      editable
    />
  ))
  .add('An editable table with cancelable edits.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      selectable
      expandable
      editable
      instantEdit={false}
    />
  ))
  .add('An table with zebra coloring, a colspan, infered keys and renderers.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      selectable
      expandable
      editable
      zebra
      renderers={renderers}
    />
  ))
  .add('An table with different row, column header and table header heights.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      selectable
      expandable
      editable
      zebra
      renderers={renderers}
      rowHeight="small"
      columnHeaderHeight="micro"
      tableHeaderHeight="large"
    />
  ))
  .add('An table that logs custom edit callbacks.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      instantEdit={false}
      defaultEditCallback={defaultEditCallback}
      enactEditsCallback={() => console.log('applying edits')}
      editCallbacks={editCallbacks}
    />
  ))
  .add('A complex table with all features enabled.', () => (
    <DataTable
      data={getData()}
      columnToLabel={columnToLabel}
      columnMetadata={columnMetadata}
      renderers={renderers}
      extraHeaderButtons={headerButtons}
      selectable
      expandable
      showColumnDividers
      showRowDividers
      zebra
      selectOnRowClick
      instantEdit={false}
      height={300}
      width={1000}
      tableHeaderLabel="My Great Table"
      rowHeight="regular"
      columnHeaderHeight="micro"
      tableHeaderHeight="large"
      defaultEditCallback={defaultEditCallback}
      enactEditsCallback={() => console.log('applying edits')}
      editCallbacks={editCallbacks}
      keys={['name', 'cats', 'tenureDays']}
    />
  ));
