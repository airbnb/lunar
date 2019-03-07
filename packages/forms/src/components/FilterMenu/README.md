FilterMenu uses controlled forms in a dropdown menu.

```jsx
import Row from './private/Row';
import Form from '../Form';
import Select from '../Form/Select';
import CheckBox from '../Form/CheckBox';

<Form onSubmit={debug('onSubmit')}>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <FilterMenu
      accessibilityLabel="Filter menu"
      zIndex={2}
      onShow={debug('onShow')}
      onHide={debug('onHide')}
    >
      <Row>
        <Select
          label="Select"
          name="select"
          defaultValue="foo"
          onChange={debug('onChange')}
          validator={() => {}}
        >
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
          <option value="baz">Baz</option>
        </Select>
      </Row>

      <Row>
        <CheckBox
          label="CheckBox"
          name="checkbox"
          onChange={debug('onChange')}
          validator={() => {}}
        />
      </Row>
    </FilterMenu>
  </div>
</Form>;
```

Left-aligned filter menu.

```jsx
import { Row } from '.';
import Form from '../Form';
import Select from '../Form/Select';
import CheckBox from '../Form/CheckBox';

<Form onSubmit={debug('onSubmit')}>
  <FilterMenu dropdownProps={{ left: 0 }} accessibilityLabel="Filter menu">
    <Row>
      <Select
        label="Select"
        name="select"
        defaultValue="foo"
        onChange={debug('onChange')}
        validator={() => {}}
      >
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      </Select>
    </Row>

    <Row>
      <CheckBox
        label="CheckBox"
        name="checkbox"
        onChange={debug('onChange')}
        validator={() => {}}
      />
    </Row>
  </FilterMenu>
</Form>;
```

Filter menu with overflow.

```jsx
import { Row } from '.';
import Form from '../Form';
import Select from '../Form/Select';
import CheckBox from '../Form/CheckBox';

<Form onSubmit={debug('onSubmit')}>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <FilterMenu accessibilityLabel="Filter menu" menuProps={{ maxHeight: 200 }} zIndex={2}>
      <Row>
        <Select
          label="Select"
          name="select"
          defaultValue="foo"
          onChange={debug('onChange')}
          validator={() => {}}
        >
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
          <option value="baz">Baz</option>
        </Select>
      </Row>

      <Row>
        <CheckBox
          label="CheckBox"
          name="checkbox"
          onChange={debug('onChange')}
          validator={() => {}}
        />
      </Row>

      <Row>
        <div style={{ height: 300 }} />
      </Row>
    </FilterMenu>
  </div>
</Form>;
```
