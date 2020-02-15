/* eslint-disable unicorn/consistent-function-scoping */

import React from 'react';
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
import Text from '../Text';
import { RendererProps, SelectedRows, IndexedParentRow } from './types';
import { DataTable as StyledDataTable } from './DataTable';
import Tabs, { Tab } from '../Tabs';

type CustomShape = {
  name: string;
  jobTitle: string;
  tenureDays: number;
  menu: string;
  cats: number;
};

function CustomRenderer({ row, keyName }: RendererProps<CustomShape>) {
  return <span>{String(row.rowData.data[keyName])}</span>;
}

const renderers = {
  name: EditableTextRenderer,
  colSpan: ColSpanRenderer,
  cats: CatRenderer,
  tenureDays: TenureRenderer,
  menu: MenuRenderer,
  custom: CustomRenderer,
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
              dynamicRowHeight
              expandable
              showRowDividers
              showAllRows
              width={400}
              keys={['number']}
              renderers={renderers}
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
    // Causes OOM errors
    happo: false,
    inspectComponents: [DataTable],
  },
};

export function aStandardTable() {
  return (
    <DataTable
      data={getData()}
      keys={['name', 'jobTitle', 'tenureDays']}
      renderers={{
        tenureDays: ({ row }: RendererProps<CustomShape>) => (
          <div style={{ float: 'right', marginRight: -8 }}>{row.rowData.data.tenureDays}</div>
        ),
      }}
      columnMetadata={{
        tenureDays: {
          rightAlign: 1,
        },
      }}
    />
  );
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

const dynamicRowData = [
  {
    data: {
      name: 'regular length name text',
      jobTitle:
        'really super long job title global head of all projects and programs really super long job title global head of all projects and programs really super long job title global head of all projects and programs',
    },
  },
  {
    data: {
      name:
        'here is a very very long input field that needs to break line multiple times here is a very very long input field that needs to break line multiple times here is a very very long input field that needs to break line multiple times here is a very very long input field that needs to break line multiple times',
      jobTitle: 'regular length job title',
    },
    metadata: {
      children: [
        {
          data: {
            name:
              'here is a very very long input field that needs to break line and use dynamic row height',
            jobTitle: 'regular length job title',
          },
        },
        {
          data: {
            name:
              'here is a very very long input field that needs to break line and use dynamic row height here is a very very long input field that needs to break line multiple times here is a very very long input field that needs to break line multiple times',
            jobTitle: 'regular length job title',
          },
        },
      ],
    },
  },
  ...getData(),
];

class ForceUpdateDynamicSize extends React.Component<{}, { extraCount: number }> {
  state = {
    extraCount: 0,
  };

  ref?: StyledDataTable;

  setRef = (ref: StyledDataTable) => {
    this.ref = ref;
  };

  handleAddText = () => {
    this.setState(({ extraCount }) => ({ extraCount: extraCount + 1 }), this.updateTable);
  };

  handleRemoveText = () => {
    this.setState(
      ({ extraCount }) => ({ extraCount: Math.max(0, extraCount - 1) }),
      this.updateTable,
    );
  };

  updateTable = () => {
    if (this.ref) {
      this.ref.cache.clearAll();
      this.ref.forceUpdate();
    }
  };

  renderers = {
    name: ({ row: { rowData } }: RendererProps<{ name: string; jobTitle: string }>) => (
      <>
        {rowData.data.name}{' '}
        {this.state.extraCount > 0 && (
          <span style={{ color: '#6f44ff' }}>
            {new Array(this.state.extraCount).fill('more more').join(' ')}
          </span>
        )}
      </>
    ),
  };

  render() {
    return (
      <>
        <Button block={false} onClick={this.handleAddText}>
          Add text
        </Button>{' '}
        <Button
          block={false}
          disabled={this.state.extraCount === 0}
          onClick={this.handleRemoveText}
        >
          Remove text
        </Button>
        <br />
        <DataTable
          showRowDividers
          expandable
          dynamicRowHeight
          showAllRows
          dataTableRef={this.setRef}
          keys={['name', 'jobTitle']}
          columnLabelCase="sentence"
          renderers={this.renderers}
          columnMetadata={{
            name: {
              flexGrow: 1,
            },
            jobTitle: {
              flexGrow: 1,
            },
          }}
          data={dynamicRowData}
        />
      </>
    );
  }
}

export function ForceUpdateDynamicSizeStory() {
  return <ForceUpdateDynamicSize />;
}

ForceUpdateDynamicSizeStory.story = {
  name: 'Dynamic row height with force update.',
};

export function aStandardTableWithDynamicRowHeight() {
  return (
    <DataTable
      showRowDividers
      expandable
      dynamicRowHeight
      showAllRows
      keys={['name', 'jobTitle']}
      columnLabelCase="sentence"
      columnMetadata={{
        name: {
          flexGrow: 1,
        },
        jobTitle: {
          flexGrow: 1,
        },
      }}
      data={dynamicRowData}
    />
  );
}

aStandardTableWithDynamicRowHeight.story = {
  name: 'A table with dynamic row height.',
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
  name: 'A table with a search box and dynamic row height that shows all rows.',
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
      showRowDividers
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

const dynamicSortKeyData = [
  {
    data: {
      banana: '🍌',
      grape: '🍇🍇🍇🍇',
    },
  },
  {
    data: {
      banana: '🍌🍌',
      grape: '🍇🍇🍇',
    },
  },
  {
    data: {
      banana: '🍌🍌🍌',
      grape: '🍇🍇',
    },
  },
  {
    data: {
      banana: '🍌🍌🍌🍌',
      grape: '🍇',
    },
    metadata: {
      children: [
        {
          // this tests dynamic rows
          data: {
            banana:
              '🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌',
            grape:
              '🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇',
          },
        },
      ],
    },
  },
];

export function ATableWithDynamicSortKey() {
  const [sortByKey, setSortByKey] = React.useState<'banana' | 'grape'>('grape');

  return (
    <>
      <Text small>Select a sort key for the mixed column</Text>
      <Spacing vertical={0.5}>
        <Tabs
          secondary
          defaultKey={sortByKey}
          onChange={key => {
            setSortByKey(key as 'banana' | 'grape');
          }}
        >
          <Tab key="grape" label="grape 🍇" />
          <Tab key="banana" label="banana 🍌" />
        </Tabs>
      </Spacing>
      <DataTable
        expandable
        showAllRows
        showColumnDividers
        showRowDividers
        dynamicRowHeight
        minimumDynamicRowHeight={64}
        data={dynamicSortKeyData}
        keys={['mix', 'banana', 'grape']}
        renderers={{
          banana: ({ row: { rowData } }) => <div>{rowData.data.banana}</div>,
          grape: ({ row: { rowData } }) => <div>{rowData.data.grape}</div>,
          mix: ({ row: { rowData } }) => <div>{`${rowData.data.grape}${rowData.data.banana}`}</div>,
        }}
        columnToLabel={{
          mix: `Mix: Sorting on selection: "${sortByKey} ${sortByKey === 'banana' ? '🍌' : '🍇'}"`,
          banana: 'Sort by 🍌',
          grape: 'Sort by 🍇',
        }}
        sortByValue={({ data: d }, key) => d[key === 'mix' ? sortByKey : key]}
        sortByCacheKey={sortByKey}
      />
    </>
  );
}
