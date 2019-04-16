import React from 'react';
import Markdown from 'markdown-to-jsx';
import { styled } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import getTypeName from './getTypeName';
import getImportPath from './getImportPath';

const Wrapper = styled.div({
  padding: 16,
  fontSize: 14,
});

const Description = styled.div({
  marginBottom: 16,
});

const ImportPath = styled.table(({ theme }) => ({
  padding: 8,
  fontSize: 13,
  width: '100%',
  backgroundColor: theme.barBg,
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: theme.appBorderRadius,
  marginBottom: 16,
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
      <td>{prop.description ? <Markdown>{prop.description}</Markdown> : null}</td>
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
    const importPath = getImportPath(table.path, table.name);

    return (
      <Wrapper>
        {importPath && <ImportPath>{importPath}</ImportPath>}

        {description && (
          <Description>
            <Markdown>{description}</Markdown>
          </Description>
        )}

        {props.length > 0 && (
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
        )}
      </Wrapper>
    );
  }
}
