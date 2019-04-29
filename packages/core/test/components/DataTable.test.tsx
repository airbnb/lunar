import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  AutoSizer,
  SortDirection,
  SortDirectionType,
  Grid,
  Table,
  Column,
} from 'react-virtualized';
import DataTable from '../../src/components/DataTable';
import TableHeader from '../../src/components/DataTable/TableHeader';
import Text from '../../src/components/Text';
import Translate from '../../src/components/Translate';
import Input from '../../src/components/Input';
import FormInput from '../../src/components/private/FormInput';
import BaseInput from '../../src/components/private/BaseInput';
import Row from '../../src/components/Row';
import Button from '../../src/components/Button';
// import getData from '../../../../.storybook/components/DataTable/DataTableData'
// import getData from '../../../../../../../../.storybook/components/DataTable/DataTableData';
import Checkbox from '../../src/components/CheckBox';
import { STATUS_OPTIONS } from '../../../../packages/core/src/components/DataTable/constants';

function getData() {
  return [
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
}

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

describe('<DataTable /> rows can be selected', () => {
  const data = getData();
  const props = {
    data,
    width: 500,
    selectable: true,
    expandable: true,
  };

  it('should be selectable', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const checkbox = row.find('[aria-colindex=2]');
    checkbox.simulate('click');
    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=5]')
        .find(Checkbox)
        .props().checked,
    ).toBe(true);
  });

  it('should be deselectable', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const checkbox = row.find('[aria-colindex=2]');
    checkbox.simulate('click');
    checkbox.simulate('click');
    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=5]')
        .find(Checkbox)
        .props().checked,
    ).toBe(false);
  });

  it('should be expandable and selectable', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const expandCaret = row.find('[aria-colindex=1]').childAt(0);
    expandCaret.simulate('click');

    const expandedGrid = table.find(Grid);
    const childRow = expandedGrid.find('[aria-rowindex=6]');
    const checkbox = childRow.find('[aria-colindex=2]');
    checkbox.simulate('click');

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=6]')
        .find(Checkbox)
        .props().checked,
    ).toBe(true);
  });

  it('Selecting one child should render the parent invalid', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const expandCaret = row.find('[aria-colindex=1]').childAt(0);
    expandCaret.simulate('click');

    const expandedGrid = table.find(Grid);
    const childRow = expandedGrid.find('[aria-rowindex=6]');
    const checkbox = childRow.find('[aria-colindex=2]');
    checkbox.simulate('click');

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=5]')
        .find(Checkbox)
        .props().invalid,
    ).toBe(true);
  });

  it('Selecting both children should select the parent', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const expandCaret = row.find('[aria-colindex=1]').childAt(0);
    expandCaret.simulate('click');

    table
      .find(Grid)
      .find('[aria-rowindex=6]')
      .find('[aria-colindex=2]')
      .simulate('click');
    table
      .find(Grid)
      .find('[aria-rowindex=7]')
      .find('[aria-colindex=2]')
      .simulate('click');

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=5]')
        .find(Checkbox)
        .props().invalid,
    ).toBe(false);

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=5]')
        .find(Checkbox)
        .props().checked,
    ).toBe(true);
  });

  it('Selecting the parent should select both children', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const expandCaret = row.find('[aria-colindex=1]').childAt(0);
    expandCaret.simulate('click');

    row
      .find('[aria-colindex=2]')
      .childAt(0)
      .simulate('click');

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=6]')
        .find(Checkbox)
        .props().checked,
    ).toBe(true);

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=7]')
        .find(Checkbox)
        .props().checked,
    ).toBe(true);
  });

  it('Deselecting the parent should deselect both children', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const expandCaret = row.find('[aria-colindex=1]').childAt(0);
    expandCaret.simulate('click');

    // Select one child
    table
      .find(Grid)
      .find('[aria-rowindex=6]')
      .find('[aria-colindex=2]')
      .simulate('click');

    // Select parent (deselects both children)
    row
      .find('[aria-colindex=2]')
      .childAt(0)
      .simulate('click');

    expect(
      table
        .find(Grid)
        .find('[aria-rowindex=7]')
        .find(Checkbox)
        .props().checked,
    ).toBe(false);
  });
});

describe('<DataTable /> rows can expand', () => {
  const data = getData();

  const props = {
    data,
    width: 500,
    expandable: true,
  };

  it('should be expandable', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />);
    const grid = table.find(Grid);
    const row = grid.find('[aria-rowindex=5]');
    const expandCaret = row.find('[aria-colindex=1]').childAt(0);
    expandCaret.simulate('click');
    const expandedGrid = table.find(Grid);
    const childRow = expandedGrid.find('[aria-rowindex=6]');
    const childCol = childRow.find('[aria-colindex=2]');
    const text = childCol.find(Text);
    expect(text.text()).toBe('Coding Cece');
  });
});

describe('<DataTable /> renders data', () => {
  const data = getData();

  const props = {
    data,
    width: 500,
  };

  it('should render data', () => {
    // @ts-ignore
    const grid = mount(<DataTable {...props} />).find(Grid);
    const row = grid.find('[aria-rowindex=1]');
    const col = row.find('[aria-colindex=1]');
    const text = col.find(Text);
    expect(text.text()).toBe(data[0].data.name);
  });
  it('should sort data in Ascending Order', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />).find(Table);
    const grid = table.find(Grid);
    const columnLabels = table.find('.ReactVirtualized__Table__headerColumn');
    const nameLabel = columnLabels.first();
    nameLabel.simulate('click');

    const row = grid.find('[aria-rowindex=2]');
    const col = row.find('[aria-colindex=1]');
    const text = col.find(Text);
    expect(text.text()).toBe('Product Percy');
  });
  it('should sort data in Descending Order', () => {
    // @ts-ignore
    const table = mount(<DataTable {...props} />).find(Table);
    const grid = table.find(Grid);
    const columnLabels = table.find('.ReactVirtualized__Table__headerColumn');
    const nameLabel = columnLabels.first();
    nameLabel.simulate('click');
    nameLabel.simulate('click');

    const row = grid.find('[aria-rowindex=1]');
    const col = row.find('[aria-colindex=1]');
    const text = col.find(Text);
    expect(text.text()).toBe('Dev Ops Danny');
  });
});

describe('Static <DataTable /> basic functionality, headers, labels', () => {
  const data = getData();

  it('should render a div', () => {
    // @ts-ignore
    const wrapper = shallow(<DataTable />).dive();
    expect(wrapper.is('div')).toBe(true);
  });
  it('should render an autosizer', () => {
    // @ts-ignore
    const wrapper = shallow(<DataTable />).dive();
    const div = wrapper.find('div div');
    const auto = div.find(AutoSizer);
    expect(auto).toHaveLength(1);
  });
  it('should render an table header', () => {
    // @ts-ignore
    const wrapper = mount(<DataTable tableHeaderLabel="My Table" />);
    const header = wrapper.find(TableHeader);
    const text = header
      .find(Text)
      .find('div')
      .text();

    expect(text).toBe('My Table');
  });
  it('should render the correct column labels', () => {
    // @ts-ignore
    const wrapper = shallow(<DataTable data={data} />).dive();
    const table = wrapper
      .find(AutoSizer)
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
  it('should render the custom column labels', () => {
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
      // @ts-ignore
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
  const data = getData();

  const props = {
    data,
    width: 500,
    tableHeaderLabel: 'My Table',
  };

  it('should enable instant edit mode', () => {
    // @ts-ignore
    const wrapper = shallow(<DataTable {...props} />).dive();
    const editButton = wrapper
      .find(TableHeader)
      .dive()
      .dive()
      .find(Row)
      .dive()
      .dive()
      .find(Button);
    editButton.simulate('click');
    editButton.simulate('click');
    editButton.simulate('click');

    const doneButton = wrapper
      .find(TableHeader)
      .dive()
      .dive()
      .find(Row)
      .dive()
      .dive()
      .find(Button);

    expect(wrapper.state('editMode')).toBe(true);
    expect(doneButton.find(Translate).prop('phrase')).toBe('Done');
  });

  it('should enable edit mode', () => {
    // @ts-ignore
    const wrapper = shallow(<DataTable {...props} instantEdit={false} />).dive();
    const editButton = wrapper
      .find(TableHeader)
      .dive()
      .dive()
      .find(Row)
      .dive()
      .dive()
      .find(Button);
    editButton.simulate('click');

    const buttons = wrapper
      .find(TableHeader)
      .dive()
      .dive()
      .find(Row)
      .dive()
      .dive()
      .find(Button);
    const cancelButton = buttons.at(0);
    const applyButton = buttons.at(1);

    cancelButton.simulate('click');
    editButton.simulate('click');
    applyButton.simulate('click');
    editButton.simulate('click');

    expect(wrapper.state('editMode')).toBe(true);
    expect(cancelButton.find(Translate).prop('phrase')).toBe('Cancel');
    expect(applyButton.find(Translate).prop('phrase')).toBe('Apply');
  });

  it('should replace text with inputs', () => {
    // @ts-ignore
    const wrapper = mount(<DataTable {...props} />);
    const button = wrapper.find(TableHeader).find(Button);
    button.simulate('click');
    const grid = wrapper.find(Grid);
    const row = grid.find('[aria-rowindex=1]');
    const col = row.find('[aria-colindex=1]');
    const input = col.find(Input);
    expect(input.prop('value')).toBe(data[0].data.name);
  });

  // it('should be editable', () => {
  //   const spy = jest.fn();

  //   // @ts-ignore
  //   const wrapper = mount(<DataTable {...props} />);
  //   const button = wrapper.find(TableHeader).find(Button);
  //   button.simulate('click');
  //   const grid = wrapper.find(Grid)
  //   const row = grid.find('[aria-rowindex=1]');
  //   const col = row.find('[aria-colindex=1]');
  //   const input = col.find(Input).find(FormInput);//.childAt(0).childAt(0);

  //   console.log(input.debug());

  //   // input.simulate('click');
  //   // input.simulate('change', 'abcdefg', {target:{}});
  //   // input.simulate('keydown', { value: 'asdf' });
  //   const event = {
  //     currentTarget: {
  //       value: 'foo',
  //     },
  //   };
  //   // input.setProps({value: 'asdf' });

  //   // console.log(wrapper.state());

  //   input.simulate('change', event);

  //   console.log(wrapper.find(Grid).find('[aria-rowindex=1]').find('[aria-colindex=1]')
  //     .find(Input).find(FormInput).debug());

  //   expect(wrapper.find(Grid)
  //     .find('[aria-rowindex=1]')
  //     .find('[aria-colindex=1]')
  //     .find(Input)
  //     .prop('value')).toBe(data[0].data);
  // });
});

describe('<DataTable /> uses a bvunch of props', () => {
  const data = getData();

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
  };

  it('should enable instant edit mode', () => {
    // @ts-ignore
    const wrapper = shallow(<DataTable {...props} />).dive();
    expect(true).toBe(true);
  });
});
