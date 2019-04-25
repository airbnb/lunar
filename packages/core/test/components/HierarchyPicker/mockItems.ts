export default [
  {
    name: 'foo',
    label: 'Foo',
    readonly: true,
    items: [
      {
        name: 'bar',
        label: 'Barrrrrr',
        description: 'a place to have a drink',
        readonly: true,
        items: [{ name: 'baz' }, { name: 'whatever', description: 'I do what I want' }],
      },
      {
        name: 'hello',
        readonly: true,
      },
      {
        name: 'coverage is hard',
        description: 'very hard',
        keywords: 'bonjour bonsoir',
        section: 'test them',
      },
    ],
  },
];
