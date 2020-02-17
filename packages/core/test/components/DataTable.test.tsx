/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Enzyme from 'enzyme';
import { Grid, Table } from 'react-virtualized';
import { shallowWithStyles, mountWithStyles } from '@airbnb/lunar-test-utils';
import DataTable, {
  ParentRow,
  VirtualRow,
  DataTableProps,
  RendererProps,
} from '../../src/components/DataTable';
import StyledDataTable, {
  DataTable as InnerDataTable,
} from '../../src/components/DataTable/DataTable';
import Input from '../../src/components/Input';
import FormInput from '../../src/components/private/FormInput';
import TableHeader from '../../src/components/DataTable/TableHeader';
import Text from '../../src/components/Text';
import Translate from '../../src/components/Translate';
import Button from '../../src/components/Button';
import Checkbox from '../../src/components/CheckBox';
import { STATUS_OPTIONS } from '../../src/components/DataTable/constants';

type EditableTextRendererProps = Omit<RendererProps, 'theme' | 'zebra'> & {
  value: string;
};

type EditableTextRendererState = {
  value: string;
};

class InnerEditableTextRenderer extends React.Component<
  EditableTextRendererProps,
  EditableTextRendererState
> {
  state = {
    value: this.props.value,
  };

  onEdit = (row: VirtualRow, keyName: string | number) => (
    newVal: string,
    event: React.SyntheticEvent<EventTarget>,
  ) => {
    const { onEdit } = this.props;
    onEdit(row, keyName, newVal, event);

    this.setState({
      value: newVal,
    });
  };

  render() {
    const { editMode, row, keyName } = this.props;
    const { value } = this.state;

    return editMode ? (
      <Input
        hideLabel
        label="Edit row"
        name=""
        value={value}
        onChange={this.onEdit(row, keyName)}
      />
    ) : (
      <Text>{value}</Text>
    );
  }
}

function EditableTextRenderer({ row, keyName, editMode, onEdit }: RendererProps) {
  return (
    <InnerEditableTextRenderer
      editMode={editMode}
      value={String(row.rowData.data[keyName])}
      row={row}
      keyName={keyName}
      onEdit={onEdit}
    />
  );
}

const data: ParentRow[] = [
  {
    data: {
      name: 'Product Percy',
      jobTitle: 'PM',
      tenureDays: 307,
      menu: '',
      cats: 1,
    },
  },
  {
    data: {
      name: 'Hidden Henry',
      jobTitle: 'Engineer',
      tenureDays: 500,
      menu: '',
      cats: 1,
      colSpan: 'This person is hidden because you have insufficient permissions.',
    },
    metadata: {
      colSpanKey: 'colSpan',
    },
  },
  {
    data: {
      name: 'Engineer Emma',
      jobTitle: 'Engineer',
      tenureDays: 500,
      menu: '',
      cats: 2,
    },
  },
  {
    data: {
      name: 'Frontend Fabien',
      jobTitle: undefined,
      tenureDays: null,
      menu: '',
      cats: 1,
    },
  },
  {
    data: {
      name: 'Manager Mary',
      jobTitle: 'Manager',
      tenureDays: 820,
      menu: '',
      cats: 3,
    },
    metadata: {
      children: [
        {
          data: {
            name: 'Coding Cece',
            jobTitle: 'Engineer',
            tenureDays: 1610,
            menu: '',
            cats: 2,
          },
          metadata: {
            status: STATUS_OPTIONS.ALERT,
          },
        },
        {
          data: {
            name: 'Hacker Helen',
            jobTitle: 'Engineer',
            tenureDays: 1095,
            menu: '',
            cats: 3,
          },
        },
      ],
    },
  },
  {
    data: {
      name: 'Dev Ops Danny',
      jobTitle: 'Engineer',
      tenureDays: 30,
      menu: '',
      cats: 1,
    },
    metadata: {
      status: STATUS_OPTIONS.ALERT,
    },
  },
];

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

const headerButtonClick = jest.fn();

const editCallback = jest.fn();

const selectCallback = jest.fn();

const editCallbacks = {
  name: editCallback,
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

const simpleProps = {
  data,
  width: 500,
  height: 300,
  selectable: true,
  expandable: true,
  editable: true,
  tableHeaderLabel: 'My Great Table',
  showAllRows: true,
};

const getRow = (table: Enzyme.ReactWrapper<any, any>, row: number) =>
  table.find(Grid).find(`[aria-rowindex=${row}]`);

const getCell = (wrapper: Enzyme.ReactWrapper<any, any>, row: number, col: number) =>
  wrapper
    .find(Grid)
    .find(`[aria-rowindex=${row}]`)
    .find(`[aria-colindex=${col}]`);

const getCheckbox = (table: Enzyme.ReactWrapper<any, any>, row: number) =>
  getRow(table, row).find(Checkbox);

const getCaret = (table: Enzyme.ReactWrapper<any, any>, row: number) => getCell(table, row, 1);

const getTable = (wrapper: Enzyme.ShallowWrapper) => {
  return wrapper
    .find(StyledDataTable)
    .dive() // withStyles
    .dive() // DataTable
    .find(Table)
    .dive();
};

const getHeaderFromStyledDataTable = (styledDataTable: Enzyme.ShallowWrapper) =>
  shallowWithStyles(styledDataTable.find(TableHeader).getElement(), true);

const selectRow = (table: Enzyme.ReactWrapper<any, any>, row: number) => {
  (getCheckbox(table, row).prop('onChange') as () => void)();
  table.update();
};

const expandRow = (table: Enzyme.ReactWrapper<any, any>, row: number) => {
  getCaret(table, row)
    .childAt(0)
    .simulate('click');
};

const NAME_COL = 3;
const ROW = 3;
const PARENT_ROW = 5;
const CHILD_ROW = 6;

describe('<DataTable /> rows can be selected', () => {
  it('should be selectable', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    selectRow(table, ROW);
    expect(getCheckbox(table, ROW).prop('checked')).toBe(true);
  });

  it('should be unselectable', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    selectRow(table, ROW);
    selectRow(table, ROW);

    expect(getCheckbox(table, ROW).prop('checked')).toBe(false);
  });

  it('should be selectable by row click', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} selectOnRowClick />);

    getRow(table, ROW).simulate('click');
    table.update();

    expect(getCheckbox(table, ROW).prop('checked')).toBe(true);
  });

  it('should trigger callbacks on selection', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} selectCallback={selectCallback} />);

    selectRow(table, ROW);

    expect(selectCallback.mock.calls).toHaveLength(1);
  });

  it('should be expandable', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);

    expect(
      getCell(table, CHILD_ROW, 3)
        .find(Text)
        .text(),
    ).toBe(data[4].metadata!.children![0].data.name);
  });

  it('should be unexpandable', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    expandRow(table, PARENT_ROW);

    expect(
      getCell(table, 6, 3)
        .find(Text)
        .text(),
    ).toBe(data[5].data.name);
  });

  it('should have selectable children', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);

    expect(getCheckbox(table, CHILD_ROW).prop('checked')).toBe(true);
  });

  it('selecting the parent should select the children', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, PARENT_ROW);

    expect(getCheckbox(table, CHILD_ROW).prop('checked')).toBe(true);
  });

  it('selecting both children should select the parent', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);
    selectRow(table, CHILD_ROW + 1);

    expect(getCheckbox(table, PARENT_ROW).prop('checked')).toBe(true);
  });

  it('selecting the parent then deselecting child should deselect child', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);

    expect(getCheckbox(table, CHILD_ROW).prop('checked')).toBe(false);
  });

  it('Selecting the parent then deselecting both children should deselect the parent', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);
    selectRow(table, CHILD_ROW + 1);

    expect(getCheckbox(table, PARENT_ROW).prop('checked')).toBe(false);
  });
});

describe('<DataTable /> renders and sorts data', () => {
  it('should render data', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);
    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe(data[0].data.name);
  });

  it('should sort data in Descending order', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').first();
    nameHeader.simulate('click');
    nameHeader.simulate('click');
    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Product Percy');
  });

  it('should sort data in Descending order by jobTitle', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').at(3);
    nameHeader.simulate('click');
    nameHeader.simulate('click');
    const firstRow = getCell(table, 1, NAME_COL + 1)
      .find(Text)
      .text();
    expect(firstRow).toBe('PM');

    const lastRow = getCell(table, 6, NAME_COL + 1).find(Text);
    expect(lastRow).toEqual({});
  });

  it('should sort data in Descending order by tenureDays', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').at(4);
    nameHeader.simulate('click');
    nameHeader.simulate('click');

    const firstRow = getCell(table, 1, NAME_COL + 2)
      .find(Text)
      .text();
    expect(firstRow).toBe('820');

    const lastRow = getCell(table, 6, NAME_COL + 2).find(Text);

    expect(lastRow).toEqual({});
  });

  it('should sort data in Ascending order', () => {
    const table = mountWithStyles(<DataTable {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').at(NAME_COL - 1);
    nameHeader.simulate('click');
    table.update();

    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Dev Ops Danny');
  });

  it('should sort data in Ascending order with selectedRowsFirst', () => {
    const table = mountWithStyles(<DataTable selectedRowsFirst {...simpleProps} />);

    selectRow(table, ROW);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').at(NAME_COL - 1);
    nameHeader.simulate('click');
    table.update();

    expect(
      getCell(table, 1, NAME_COL)
        .find(Text)
        .text(),
    ).toBe('Engineer Emma');

    expect(
      getCell(table, 2, NAME_COL)
        .find(Text)
        .text(),
    ).toBe('Dev Ops Danny');
  });

  it('should sort data in Ascending order through props', () => {
    const table = mountWithStyles(
      <DataTable {...simpleProps} sortByOverride="name" sortDirectionOverride="ASC" />,
    );

    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Dev Ops Danny');
  });

  it('should sort data in Descending order through props', () => {
    const table = mountWithStyles(
      <DataTable {...simpleProps} sortByOverride="name" sortDirectionOverride="DESC" />,
    );

    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Product Percy');
  });

  it('should sort data in Descending order with selected rows first', () => {
    const table = mountWithStyles(<DataTable selectedRowsFirst {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').first();
    nameHeader.simulate('click');
    nameHeader.simulate('click');
    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Product Percy');
  });

  it('should use the output of sortByValue for sorting', () => {
    const sortByLowHigh = jest.fn(({ data: d }, key) => d[key]);
    const sortByHighLow = jest.fn(({ data: d }, key) => -d[key]);

    const table = mountWithStyles(
      <DataTable
        {...simpleProps}
        sortOverride
        expandable={false} // affects cell index
        selectable={false}
        sortByOverride="cats"
        sortDirectionOverride="ASC"
        sortByCacheKey="a"
        keys={['cats']}
        sortByValue={sortByLowHigh}
      />,
    );

    expect(
      getCell(table, 1, 1)
        .find(Text)
        .text(),
    ).toBe('1');

    table.setProps({ sortByValue: sortByHighLow, sortByCacheKey: 'b' });

    expect(
      getCell(table, 1, 1)
        .find(Text)
        .text(),
    ).toBe('3');
  });

  it('should re-sort upon sortCacheKey change', () => {
    const sortByValue = jest.fn(() => 1);
    const table = mountWithStyles(
      <DataTable
        {...simpleProps}
        expandable={false}
        selectable={false}
        keys={['cats']}
        sortByCacheKey="a"
        sortByValue={sortByValue}
      />,
    );

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').first();
    nameHeader.simulate('click');

    const callCount = sortByValue.mock.calls.length;
    expect(callCount).toBeGreaterThan(0);

    // setting the same cache key should do nothing
    table.setProps({ sortByCacheKey: 'a' });
    expect(sortByValue.mock.calls).toHaveLength(callCount);

    table.setProps({ sortByCacheKey: 'b' });
    expect(sortByValue.mock.calls.length).toBeGreaterThan(callCount);
  });
});

describe('<DataTable /> renders column labels', () => {
  it('should render the correct column labels in sentence case', () => {
    const table = getTable(
      shallowWithStyles(<DataTable editable data={data} columnLabelCase="sentence" />),
    );
    const columnLabels = table.childAt(0);
    const labels = ['Name', 'Job title', 'Tenure days', 'Menu', 'Cats', 'Log', 'Colspan'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(node.prop('children')).toBe(labels[idx]);
    });
  });

  it('should not format labels by default', () => {
    const table = getTable(shallowWithStyles(<DataTable editable data={data} />));
    const columnLabels = table.childAt(0);
    const labels = ['name', 'jobTitle', 'tenureDays', 'menu', 'cats', 'log', 'colspan'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(node.prop('children')).toBe(labels[idx]);
    });
  });

  it('should render the correct column labels in uppercase', () => {
    const table = getTable(
      shallowWithStyles(<DataTable editable data={data} columnLabelCase="uppercase" />),
    );
    const columnLabels = table.childAt(0);
    const labels = ['NAME', 'JOB TITLE', 'TENURE DAYS', 'MENU', 'CATS', 'LOG', 'COLSPAN'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(node.prop('children')).toBe(labels[idx]);
    });
  });

  it('should render the correct column labels in title case', () => {
    const table = getTable(
      shallowWithStyles(<DataTable editable data={data} columnLabelCase="title" />),
    );
    const columnLabels = table.childAt(0);
    const labels = ['Name', 'Job Title', 'Tenure Days', 'Menu', 'Cats', 'Log', 'Colspan'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(node.prop('children')).toBe(labels[idx]);
    });
  });

  it('should render custom column labels', () => {
    const labels = [
      'CUSTOM NAME',
      'CUSTOM JOB',
      'CUSTOM TENURE',
      'CUSTOM MENU',
      'CUSTOM CATS',
      'CUSTOM LOG',
      'CUSTOM COLSPAN',
    ];

    const table = getTable(
      shallowWithStyles(
        <DataTable
          data={data}
          columnToLabel={{
            name: labels[0],
            jobTitle: labels[1],
            tenureDays: labels[2],
            menu: labels[3],
            cats: labels[4],
            log: labels[5],
            colspan: labels[6],
          }}
        />,
      ),
    );
    const columnLabels = table.childAt(0);

    columnLabels.find(Text).forEach((node, idx) => {
      expect(node.prop('children')).toBe(labels[idx]);
    });
  });
});

describe('<DataTable /> handles edits', () => {
  const props: DataTableProps = {
    data,
    width: 500,
    tableHeaderLabel: 'My Table',
    editable: true,
    editCallbacks,
    renderers: {
      name: EditableTextRenderer,
    },
  };

  it('should be able to toggle edit mode off', () => {
    const wrapper = shallowWithStyles(<StyledDataTable {...props} />);
    const editButton = getHeaderFromStyledDataTable(wrapper).find(Button);

    editButton.simulate('click');

    const doneButton = getHeaderFromStyledDataTable(wrapper).find(Button);
    doneButton.simulate('click');

    expect(wrapper.state('editMode')).toBe(false);
  });

  it('should enable instant edit mode', () => {
    const wrapper = shallowWithStyles(<StyledDataTable {...props} />);
    const editButton = getHeaderFromStyledDataTable(wrapper).find(Button);

    editButton.simulate('click');

    const doneButton = getHeaderFromStyledDataTable(wrapper).find(Button);

    expect(wrapper.state('editMode')).toBe(true);
    expect(doneButton.find(Translate).prop('phrase')).toBe('Done');
  });

  it('should be editable', () => {
    // @ts-ignore
    const wrapper = mountWithStyles(<DataTable {...props} />);
    const button = wrapper.find(TableHeader).find(Button);
    button.simulate('click');
    const grid = wrapper.find(Grid);
    const row = grid.find('[aria-rowindex=1]');
    const col = row.find('[aria-colindex=1]');
    const input = col.find(Input).find(FormInput);

    const event = {
      currentTarget: {
        value: 'foo',
      },
    };

    input.simulate('change', event);
    input.simulate('click');

    expect(
      wrapper
        .find(Grid)
        .find('[aria-rowindex=1]')
        .find('[aria-colindex=1]')
        .find(Input)
        .prop('value'),
    ).toBe(data[0].data.name);
  });

  it('should be editable without instant edit', () => {
    // @ts-ignore
    const wrapper = mountWithStyles(<DataTable {...props} instantEdit={false} />);
    const button = wrapper.find(TableHeader).find(Button);
    button.simulate('click');
    const grid = wrapper.find(Grid);
    const row = grid.find('[aria-rowindex=1]');
    const col = row.find('[aria-colindex=1]');
    const input = col.find(Input).find(FormInput);

    const event = {
      currentTarget: {
        value: 'foo',
      },
    };

    input.simulate('change', event);
    input.simulate('click');

    expect(
      wrapper
        .find(Grid)
        .find('[aria-rowindex=1]')
        .find('[aria-colindex=1]')
        .find(Input)
        .prop('value'),
    ).toBe(data[0].data.name);
  });
});

describe('<DataTable /> does not break with weird props', () => {
  const props = {
    data,
    width: 500,
    tableHeaderLabel: 'My Table',
    zebra: true,
    rowHeight: 'regular',
    columnMetadata,
    columnToLabel: {
      name: 'CUSTOM NAME',
    },
    expandable: true,
    selectable: true,
    columnHeaderHeight: 'micro',
    tableHeaderHeight: 'large',
    keys: ['name'],
    showRowDividers: true,
    extraHeaderButtons: headerButtons,
  };

  it('should render with a lot of props', () => {
    const table = mountWithStyles(<DataTable {...props} />);
    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe(data[0].data.name);
  });

  it('should render with no props', () => {
    const table = mountWithStyles(<DataTable />);

    expect(!!table).toBe(true);
  });
});

describe('<DataTable />', () => {
  it('Auto-computes height when showAllRows is `true`', () => {
    const height = 50;
    const wrapper = shallowWithStyles(<DataTable data={data} height={height} />);
    const wrapperAllRows = shallowWithStyles(<DataTable showAllRows data={data} height={height} />);

    const table = wrapper
      .find(StyledDataTable)
      .dive() // withStyles
      .dive() // DataTable
      .find(Table);

    const tableAllRows = wrapperAllRows
      .find(StyledDataTable)
      .dive() // withStyles
      .dive() // DataTable
      .find(Table);

    expect(table.prop('height')).toBe(height);
    expect(tableAllRows.prop('height')).toBeGreaterThan(height);
  });

  it('Propagates calls dataTableRef with a DataTable instance', () => {
    const ref = jest.fn();
    mountWithStyles(<DataTable data={data} dataTableRef={ref} />);

    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref.mock.calls[0][0] instanceof InnerDataTable).toBe(true);
  });

  it('Propagates a ref to the underlying Table', () => {
    const ref = React.createRef<Table>();
    mountWithStyles(<DataTable data={data} propagateRef={ref} />);

    expect(ref.current).not.toBeNull();
  });

  it('Passes the specified overscanRowCount to the underlying Table', () => {
    const count = 14;
    const wrapper = shallowWithStyles(<DataTable data={data} overscanRowCount={count} />);
    const table = wrapper
      .find(StyledDataTable)
      .dive() // withStyles
      .dive() // DataTable
      .find(Table);

    expect(table.prop('overscanRowCount')).toBe(count);
  });
});
