import React from 'react';
import Markdown from 'markdown-to-jsx';
import { styled } from '@storybook/theming';
import getTypeName from './getTypeName';

const Type = styled.span(({ theme }) => ({
  color: theme.color.secondary,
}));

const Value = styled.span(({ theme }) => ({
  color: theme.color.green,
}));

const Required = styled.span(({ theme }) => ({
  color: theme.color.negative,
}));

const Table = styled.table(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  padding: 0,
  border: `1px solid ${theme.appBorderColor}`,
  borderCollapse: 'collapse',
  borderSpacing: 0,
  borderRadius: theme.appBorderRadius,

  '& th': {
    textAlign: 'left',
    backgroundColor: theme.barBg,
  },

  '& td, & th': {
    border: `1px solid ${theme.appBorderColor}`,
    padding: 8,
  },
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
      <td>{prop.description ? <Markdown>{prop.description}</Markdown> : null}</td>
    </tr>
  );
}

export default function PropTable({ props }) {
  return (
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
  );
}
