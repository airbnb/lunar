import React from 'react';
import { shallow, mount } from 'enzyme';
import { AutoSizer, Grid, Table } from 'react-virtualized';

import DataTable from '../../src/components/DataTable';
import Input from '../../src/components/Input';
import FormInput from '../../src/components/private/FormInput';
import TableHeader from '../../src/components/DataTable/TableHeader';
import Text from '../../src/components/Text';
import Translate from '../../src/components/Translate';
import Button from '../../src/components/Button';
import Checkbox from '../../src/components/CheckBox';
import { OnEdit, ParentRow, TableRow } from '../../src/components/DataTable/types';
import { STATUS_OPTIONS } from '../../src/components/DataTable/constants';

type EditableTextRendererProps = {
  row: TableRow;
  keyName: string;
  onEdit: OnEdit;
  value: string;
  editMode: boolean;
};
type EditableTextRendererState = {
  value: string;
};
class EditableTextRenderer extends React.Component<
  EditableTextRendererProps,
  EditableTextRendererState
> {
  state = {
    value: this.props.value,
  };

  onEdit = (row: TableRow, keyName: string) => (
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

export default function editableTextRenderer({
  row,
  key,
  editMode,
  onEdit,
}: {
  row: TableRow;
  key: string;
  editMode: boolean;
  onEdit: OnEdit;
}) {
  return (
    <EditableTextRenderer
      editMode={editMode}
      onEdit={onEdit}
      value={row.rowData.data[key]}
      row={row}
      keyName={key}
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
      tenureDays: 407,
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
      jobTitle: 'Engineer',
      tenureDays: 600,
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
};

const getRow = (table: any, row: number) => table.find(Grid).find(`[aria-rowindex=${row}]`);

const getCell = (wrapper: any, row: number, col: number) =>
  wrapper
    .find(Grid)
    .find(`[aria-rowindex=${row}]`)
    .find(`[aria-colindex=${col}]`);

const getCheckbox = (table: any, row: number) => getRow(table, row).find(Checkbox);
const getCaret = (table: any, row: number) => getCell(table, row, 1);

const selectRow = (table: any, row: number) => {
  getCheckbox(table, row).prop('onChange')();
  table.update();
};

const expandRow = (table: any, row: number) => {
  getCaret(table, row)
    .childAt(0)
    .simulate('click');
};

const getHeader = (wrapper: any) =>
  wrapper
    .find(AutoSizer)
    .at(0)
    .dive()
    .find(TableHeader);

const NAME_COL = 3;

const ROW = 3;
const PARENT_ROW = 5;
const CHILD_ROW = 6;

describe('<DataTable /> rows can be selected', () => {
  it('should be selectable', () => {
    const table = mount(<DataTable {...simpleProps} />);

    selectRow(table, ROW);
    expect(getCheckbox(table, ROW).props().checked).toBe(true);
  });

  it('should be unselectable', () => {
    const table = mount(<DataTable {...simpleProps} />);

    selectRow(table, ROW);
    selectRow(table, ROW);

    expect(getCheckbox(table, ROW).props().checked).toBe(false);
  });

  it('should be selectable by row click', () => {
    const table = mount(<DataTable {...simpleProps} selectOnRowClick />);

    getRow(table, ROW).simulate('click');
    table.update();

    expect(getCheckbox(table, ROW).props().checked).toBe(true);
  });

  it('should be expandable', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);

    expect(
      getCell(table, CHILD_ROW, 3)
        .find(Text)
        .text(),
    ).toBe(data[4].metadata!.children![0].data.name);
  });

  it('should be unexpandable', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    expandRow(table, PARENT_ROW);

    expect(
      getCell(table, 6, 3)
        .find(Text)
        .text(),
    ).toBe(data[5].data.name);
  });

  it('should have selectable children', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);

    expect(getCheckbox(table, CHILD_ROW).props().checked).toBe(true);
  });

  it('selecting the parent should select the children', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, PARENT_ROW);

    expect(getCheckbox(table, CHILD_ROW).props().checked).toBe(true);
  });

  it('selecting both children should select the parent', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);
    selectRow(table, CHILD_ROW + 1);

    expect(getCheckbox(table, PARENT_ROW).props().checked).toBe(true);
  });

  it('selecting the parent then deselecting child should deselect child', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);

    expect(getCheckbox(table, CHILD_ROW).props().checked).toBe(false);
  });

  it('Selecting the parent then deselecting both children should deselect the parent', () => {
    const table = mount(<DataTable {...simpleProps} />);

    expandRow(table, PARENT_ROW);
    selectRow(table, PARENT_ROW);
    selectRow(table, CHILD_ROW);
    selectRow(table, CHILD_ROW + 1);

    expect(getCheckbox(table, PARENT_ROW).props().checked).toBe(false);
  });
});

describe('<DataTable /> renders and sorts data', () => {
  it('should render data', () => {
    const table = mount(<DataTable {...simpleProps} />);
    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe(data[0].data.name);
  });

  it('should sort data in Descending Order', () => {
    const table = mount(<DataTable {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').first();
    nameHeader.simulate('click');

    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Product Percy');
  });

  it('should sort data in Ascending Order', () => {
    const table = mount(<DataTable {...simpleProps} />);

    const nameHeader = table.find('.ReactVirtualized__Table__headerColumn').at(NAME_COL - 1);
    nameHeader.simulate('click');
    nameHeader.simulate('click');
    table.update();

    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe('Dev Ops Danny');
  });
});

describe('<DataTable /> renders column labels', () => {
  it('should render the correct column labels in sentence case', () => {
    const wrapper = shallow(<DataTable data={data} editable columnLabelCase="sentence" />).dive();
    const table = wrapper
      .find(AutoSizer)
      .at(1)
      .dive()
      .find(Table)
      .dive();
    const columnLabels = table.childAt(0);
    const labels = ['Name', 'Job title', 'Tenure days', 'Menu', 'Cats', 'Log', 'Colspan'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(
        node
          .dive()
          .dive()
          .text(),
      ).toBe(labels[idx]);
    });
  });

  it('should not format labels by default', () => {
    const wrapper = shallow(<DataTable data={data} editable />).dive();
    const table = wrapper
      .find(AutoSizer)
      .at(1)
      .dive()
      .find(Table)
      .dive();
    const columnLabels = table.childAt(0);
    const labels = ['name', 'jobTitle', 'tenureDays', 'menu', 'cats', 'log', 'colspan'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(
        node
          .dive()
          .dive()
          .text(),
      ).toBe(labels[idx]);
    });
  });

  it('should render the correct column labels in uppercase', () => {
    const wrapper = shallow(<DataTable data={data} editable columnLabelCase="uppercase" />).dive();
    const table = wrapper
      .find(AutoSizer)
      .at(1)
      .dive()
      .find(Table)
      .dive();
    const columnLabels = table.childAt(0);
    const labels = ['NAME', 'JOB TITLE', 'TENURE DAYS', 'MENU', 'CATS', 'LOG', 'COLSPAN'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(
        node
          .dive()
          .dive()
          .text(),
      ).toBe(labels[idx]);
    });
  });

  it('should render the correct column labels in title case', () => {
    const wrapper = shallow(<DataTable data={data} editable columnLabelCase="title" />).dive();
    const table = wrapper
      .find(AutoSizer)
      .at(1)
      .dive()
      .find(Table)
      .dive();
    const columnLabels = table.childAt(0);
    const labels = ['Name', 'Job Title', 'Tenure Days', 'Menu', 'Cats', 'Log', 'Colspan'];

    columnLabels.find(Text).forEach((node, idx) => {
      expect(
        node
          .dive()
          .dive()
          .text(),
      ).toBe(labels[idx]);
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

    const wrapper = shallow(
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
    ).dive();
    const table = wrapper
      .find(AutoSizer)
      .at(0)
      .dive()
      .find(Table)
      .dive();
    const columnLabels = table.childAt(0);

    columnLabels.find(Text).forEach((node, idx) => {
      expect(
        node
          .dive()
          .dive()
          .text(),
      ).toBe(labels[idx]);
    });
  });
});

describe('<DataTable /> handles edits', () => {
  const props = {
    data,
    width: 500,
    tableHeaderLabel: 'My Table',
    editable: true,
    editCallbacks,
    renderers: {
      name: editableTextRenderer,
    },
  };

  it('should be able to toggle edit mode off', () => {
    const wrapper = shallow(<DataTable {...props} />).dive();
    const editButton = getHeader(wrapper)
      .dive()
      .dive()
      .find(Button);
    editButton.simulate('click');

    const doneButton = getHeader(wrapper)
      .dive()
      .dive()
      .find(Button);
    doneButton.simulate('click');

    expect(wrapper.state('editMode')).toBe(false);
  });

  it('should enable instant edit mode', () => {
    const wrapper = shallow(<DataTable {...props} />).dive();
    const editButton = getHeader(wrapper)
      .dive()
      .dive()
      .find(Button);

    editButton.simulate('click');

    const doneButton = getHeader(wrapper)
      .dive()
      .dive()
      .find(Button);

    expect(wrapper.state('editMode')).toBe(true);
    expect(doneButton.find(Translate).prop('phrase')).toBe('Done');
  });

  it('should be editable', () => {
    // @ts-ignore
    const wrapper = mount(<DataTable {...props} />);
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
    const wrapper = mount(<DataTable {...props} instantEdit={false} />);
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
    const table = mount(<DataTable {...props} />);
    const text = getCell(table, 1, NAME_COL)
      .find(Text)
      .text();

    expect(text).toBe(data[0].data.name);
  });

  it('should render with no props', () => {
    const table = mount(<DataTable />);

    expect(!!table).toBe(true);
  });
});

describe('<DataTable />', () => {
  it('Auto-computes height when showAllRows is `true`', () => {
    const height = 50;
    const wrapper = shallow(<DataTable data={data} height={height} />).dive();
    let table = wrapper
      .find(AutoSizer)
      .at(0)
      .dive()
      .find(Table);

    expect(table.prop('height')).toBe(height);

    wrapper.setProps({ showAllRows: true });

    table = wrapper
      .find(AutoSizer)
      .at(0)
      .dive()
      .find(Table);

    expect(table.prop('height')).toBeGreaterThan(height);
  });

  it('Propagates a ref to the underlying Table', () => {
    const ref = React.createRef<Table>();
    mount(<DataTable data={data} propagateRef={ref} />);

    expect(ref.current).toBeDefined();
  });
});
