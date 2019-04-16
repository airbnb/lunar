import React from 'react';
import { styled } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import getTypeName from './getTypeName';

const Wrapper = styled.div(({ theme }) => ({
  padding: 16,
  fontSize: 14,
}));

const Description = styled.div({
  marginBottom: 16,
});

const Table = styled.table(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  padding: 0,
  border: `1px solid ${theme.appBorderColor}`,
  borderCollapse: 'collapse',
  borderSpacing: 0,

  '& th': {
    textAlign: 'left',
  },

  '& td, & th': {
    border: `1px solid ${theme.appBorderColor}`,
    padding: 8,
  },
}));

const Type = styled.span(({ theme }) => ({
  color: theme.color.secondary,
}));

const Value = styled.span(({ theme }) => ({
  color: theme.color.green,
}));

const Required = styled.span(({ theme }) => ({
  color: theme.color.negative,
}));

function Row({ prop }) {
  return (
    <tr>
      <td>
        <b>{prop.name}</b>
      </td>
      <td>
        <Type>{getTypeName(prop.type && prop.type.name)}</Type>
      </td>
      <td>
        {prop.required ? (
          <Required>Required</Required>
        ) : (
          <Value>{getTypeName(prop.defaultValue && prop.defaultValue.value)}</Value>
        )}
      </td>
      <td>{prop.description}</td>
    </tr>
  );
}

export default class PropTable extends React.Component {
  render() {
    const { name, table } = this.props;

    if (!table) {
      return <Placeholder>No props found for {name}.</Placeholder>;
    }

    const { description } = table.docgenInfo;
    const requiredProps = [];
    const optionalProps = [];
    const alphaSort = (a, b) => a.name.localeCompare(b.name);

    Object.values(table.docgenInfo.props).forEach(prop => {
      if (prop.description.includes('@ignore')) {
        return;
      }

      if (prop.required) {
        requiredProps.push(prop);
      } else {
        optionalProps.push(prop);
      }
    });

    const props = [...requiredProps.sort(alphaSort), ...optionalProps.sort(alphaSort)];

    if (props.length === 0) {
      return <Placeholder>No props found for {name}.</Placeholder>;
    }

    return (
      <Wrapper>
        {description && <Description>{description}</Description>}

        <Table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map(prop => (
              <Row key={prop.name} prop={prop} />
            ))}
          </tbody>
        </Table>
      </Wrapper>
    );
  }
}
