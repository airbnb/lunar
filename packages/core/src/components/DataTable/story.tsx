/* eslint-disable unicorn/consistent-function-scoping */

import React from 'react';
import { action } from '@storybook/addon-actions';
import IconStar from '@airbnb/lunar-icons/lib/interface/IconStar';
import getData, { generateRandomData } from ':storybook/components/DataTable/DataTableData';
import TenureRenderer from ':storybook/components/DataTable/DataTableRenderers/TenureRenderer';
import ColSpanRenderer from ':storybook/components/DataTable/DataTableRenderers/ColSpanRenderer';
import CatRenderer from ':storybook/components/DataTable/DataTableRenderers/CatRenderer';
import MenuRenderer from ':storybook/components/DataTable/DataTableRenderers/MenuRenderer';
import EditableTextRenderer from ':storybook/components/DataTable/DataTableRenderers/EditableTextRenderer';
import DataTable from '.';
import Button from '../Button';
import Input from '../Input';
import Row from '../Row';
import Spacing from '../Spacing';
import { SelectedRows, IndexedParentRow } from './types';

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
      <IconStar decorative inline />
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

const defaultEditCallback = () => {
  action('this callback has access to row, key, newVal and event');
};

const selectCallback = () => () => {
  action('this callback has access to the newly selected row and all selected row');
};

class SearchDemo extends React.Component {
  state = {
    search: '',
    data: generateRandomData(),
  };

  handleChange = (value: string) => {
    this.setState({
      search: value,
    });
  };

  private handleNewData = () => {
    this.setState({
      data: generateRandomData(),
    });
  };

  // Providing this function instead of filtering outside DataTable allows new data to be renderered
  // Without changing the underlying data prop, which lets selectedRows/expandedRows persist.
  filter = (search: string) => (data: IndexedParentRow[]): IndexedParentRow[] => {
    return data.filter((row: IndexedParentRow) => String(row.data.number).includes(search));
  };

  render() {
    const { data, search } = this.state;
    const filteredData = this.filter(search);
    const button = <Button onClick={this.handleNewData}>New Data</Button>;

    return (
      <div style={{ height: 500 }}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Spacing bottom={2}>
            <Row before={button}>
              <Input
                hideLabel
                label="Search"
                name="search"
                value={search}
                onChange={this.handleChange}
              />
            </Row>
          </Spacing>
          <div style={{ flexGrow: 1 }}>
            <DataTable
              autoHeight
              expandable
              tableHeaderLabel="My Great Table"
              data={data}
              filterData={filteredData}
              columnHeaderHeight="micro"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default {
  title: 'Core/DataTable',
  parameters: {
    happo: { delay: 50 },
    inspectComponents: [DataTable],
  },
};

export function aStandardTable() {
  return <DataTable data={getData()} keys={['name', 'jobTitle', 'tenureDays']} />;
}

aStandardTable.story = {
  name: 'A standard table.',
};

export function aStandardTableWithAFlexWrapper() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Spacing bottom={2}>
        <Button>Dummy Button</Button>
      </Spacing>
      <DataTable data={getData()} keys={['name', 'jobTitle', 'tenureDays']} />
    </div>
  );
}

aStandardTableWithAFlexWrapper.story = {
  name: 'A standard table with a flex wrapper.',
};

export function aStandardTableWithInitialSorting() {
  return (
    <DataTable
      data={getData()}
      keys={['name', 'jobTitle']}
      sortByOverride="name"
      sortDirectionOverride="ASC"
    />
  );
}

aStandardTableWithInitialSorting.story = {
  name: 'A standard table with initial sorting.',
};

export function aTableWithSelectableAndExandableRowsThatDisplaysSelectedRowsFirst() {
  return (
    <DataTable
      expandable
      selectable
      selectedRowsFirst
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
    />
  );
}

aTableWithSelectableAndExandableRowsThatDisplaysSelectedRowsFirst.story = {
  name: 'A table with selectable and exandable rows that displays selected rows first.',
};

export function aTableWithFilteredData() {
  return (
    <DataTable
      expandable
      selectable
      tableHeaderLabel="My Engineer Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      filterData={filterData}
    />
  );
}

aTableWithFilteredData.story = {
  name: 'A table with filtered data.',
};

export function aTableWithASearchBoxAndParentHeight() {
  return <SearchDemo />;
}

aTableWithASearchBoxAndParentHeight.story = {
  name: 'A table with a search box and parent height.',
};

export function aTableThatShowsAllRows() {
  return (
    // This shows the height dynamically change with expanded rows
    <div style={{ background: '#835EFE', padding: 8 }}>
      <DataTable
        expandable
        selectable
        showAllRows
        showRowDividers
        tableHeaderLabel="All rows"
        data={getData()}
        keys={['name', 'jobTitle']}
      />
    </div>
  );
}

aTableThatShowsAllRows.story = {
  name: 'A table that shows all rows.',
};

export function anEditableTable() {
  return (
    <DataTable
      selectable
      expandable
      editable
      tableHeaderLabel="My Great Table"
      data={getData()}
      keys={['name', 'jobTitle']}
      defaultEditCallback={defaultEditCallback}
      renderers={renderers}
    />
  );
}

anEditableTable.story = {
  name: 'An editable table.',
};

export function anTableWithZebraColoringAColspanInferredKeysAndRenderers() {
  return (
    <DataTable
      selectable
      expandable
      editable
      zebra
      tableHeaderLabel="My Great Table"
      data={getData()}
      renderers={renderers}
    />
  );
}

anTableWithZebraColoringAColspanInferredKeysAndRenderers.story = {
  name: 'An table with zebra coloring, a colspan, inferred keys and renderers.',
};

export function aTableWithDifferentRowColumnHeaderAndTableHeaderHeights() {
  return (
    <DataTable
      selectable
      expandable
      editable
      zebra
      tableHeaderLabel="My Great Table"
      data={getData()}
      renderers={renderers}
      rowHeight="small"
      columnHeaderHeight="micro"
      tableHeaderHeight="large"
    />
  );
}

aTableWithDifferentRowColumnHeaderAndTableHeaderHeights.story = {
  name: 'A table with different row, column header and table header heights.',
};

export function aTableThatLogsCustomEditCallbacksAndSelectCallback() {
  return (
    <DataTable
      selectable
      expandable
      tableHeaderLabel="My Great Table"
      data={getData()}
      defaultEditCallback={defaultEditCallback}
      editCallbacks={editCallbacks}
      selectCallback={selectCallback}
    />
  );
}

aTableThatLogsCustomEditCallbacksAndSelectCallback.story = {
  name: 'A table that logs custom edit callbacks and select callback.',
};

export function aComplexTableWithAllFeaturesEnabled() {
  return (
    <DataTable
      selectable
      expandable
      showColumnDividers
      showRowDividers
      zebra
      selectOnRowClick
      editable
      data={getData()}
      columnToLabel={columnToLabel}
      columnMetadata={columnMetadata}
      renderers={renderers}
      extraHeaderButtons={headerButtons}
      height={300}
      width={1000}
      tableHeaderLabel="My Great Table"
      rowHeight="regular"
      columnHeaderHeight="micro"
      tableHeaderHeight="large"
      defaultEditCallback={defaultEditCallback}
      editCallbacks={editCallbacks}
      keys={['name', 'cats', 'tenureDays']}
    />
  );
}

aComplexTableWithAllFeaturesEnabled.story = {
  name: 'A complex table with all features enabled.',
};
