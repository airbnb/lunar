import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// @ts-ignore
import IconStar from '@airbnb/lunar-icons/lib/interface/IconStar';
import getData, { generateRandomData } from ':storybook/components/DataTable/DataTableData';
import TenureRenderer from ':storybook/components/DataTable/DataTableRenderers/TenureRenderer';
import ColSpanRenderer from ':storybook/components/DataTable/DataTableRenderers/ColSpanRenderer';
import CatRenderer from ':storybook/components/DataTable/DataTableRenderers/CatRenderer';
import MenuRenderer from ':storybook/components/DataTable/DataTableRenderers/MenuRenderer';
import EditableTextRenderer from ':storybook/components/DataTable/DataTableRenderers/EditableTextRenderer';

import DataTable from './DataTable';
import Input from './Input';
import { SelectedRows, TableRow, IndexedParentRow } from './DataTable/types';

const renderers = {
  name: EditableTextRenderer,
  colSpan: ColSpanRenderer,
  cats: CatRenderer,
  tenureDays: TenureRenderer,
  menu: MenuRenderer,
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
  action('this callback has access to the selected rows');
};

const headerButtons = [
  {
    label: 'Always Displayed',
    display: true,
    displayEditMode: true,
    onClick: headerButtonClick,
  },
  {
    label: 'Extra Non Edit Button',
    display: true,
    displayEditMode: false,
    onClick: headerButtonClick,
  },
  {
    label: 'Extra Edit Mode Button',
    display: false,
    displayEditMode: true,
    onClick: headerButtonClick,
  },
];

const columnToLabel = {
  tenureDays: (
    <span>
      ICON IN HEADER
      <IconStar inline />
    </span>
  ),
};

const catsCallback = () => {
  action('meow');
};

const editCallbacks = {
  cats: catsCallback,
};

const filterData = (data: IndexedParentRow[]) => {
  return data.filter(row => row.data.jobTitle === 'Engineer');
};

const defaultEditCallback = (
  row: TableRow,
  key: string,
  newVal: any,
  event: React.SyntheticEvent<EventTarget>,
) => {
  action('this callback has access to row, key, newVal and event');
};

export interface SearchDemoProps {
  data: IndexedParentRow[];
}

export class SearchDemo extends React.Component<SearchDemoProps> {
  state = {
    search: '',
  };

  onChange = (value: string) => {
    this.setState({
      search: value,
    });
  };

  filter = (search: string) => (data: IndexedParentRow[]): IndexedParentRow[] => {
    return data.filter((row: IndexedParentRow) => row.data.number.toString().includes(search));
  };

  render() {
    const { search } = this.state;
    const { data } = this.props;

    return (
      <>
        <Input label="" name="" hideLabel value={search} onChange={this.onChange} />
        <DataTable data={data} filterData={this.filter(search)} />
      </>
    );
  }
}

storiesOf('Core/DataTable', module)
  .addParameters({
    inspectComponents: [DataTable],
  })
  .add('A standard table.', () => <DataTable data={getData()} keys={['name', 'jobTitle']} />)
  .add('A table with selectable and exandable rows.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      expandable
      selectable
    />
  ))
  .add('A table with filtered data.', () => (
    <DataTable
      tableHeaderLabel="My Engineer Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      expandable
      selectable
      filterData={filterData}
    />
  ))
  .add('A table with a search box.', () => <SearchDemo data={generateRandomData()} />)
  .add('A table that shows all rows.', () => (
    // This shows the height dynamically change with expanded rows
    <div style={{ background: '#835EFE', padding: 8 }}>
      <DataTable
        tableHeaderLabel="Auto height table"
        data={getData()}
        keys={['name', 'jobTitle']}
        expandable
        selectable
        showAllRows
        showRowDividers
      />
    </div>
  ))
  .add('An editable table.', () => (
    <DataTable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      selectable
      expandable
      editable
      defaultEditCallback={defaultEditCallback}
      renderers={renderers}
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
      defaultEditCallback={defaultEditCallback}
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
      height={300}
      width={1000}
      tableHeaderLabel="My Great Table"
      rowHeight="regular"
      columnHeaderHeight="micro"
      tableHeaderHeight="large"
      defaultEditCallback={defaultEditCallback}
      editCallbacks={editCallbacks}
      keys={['name', 'cats', 'tenureDays']}
      editable
    />
  ));
