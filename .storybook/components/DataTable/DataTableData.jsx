import { STATUS_OPTIONS } from '@airbnb/lunar/src/components/DataTable/constants';

export function generateRandomData() {
  return new Array(50).fill(0).map((x, i) => ({
    data: {
      number: `${i + 1} `.repeat(i + 1),
      zero: x,
    },
    metadata: {
      children: new Array(2).fill(0).map((x, j) => ({
        data: {
          number: `${j + 1} `.repeat(i + 1),
          zero: x,
        },
      })),
    },
  }));
}

export default function getData() {
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
}
