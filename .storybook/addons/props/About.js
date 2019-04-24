import React from 'react';
import Markdown from 'markdown-to-jsx';
import { styled } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import getImportPath from './getImportPath';
import getSourcePath from './getSourcePath';
import PathBar from './PathBar';
import PropTable from './PropTable';

const Wrapper = styled.div({
  padding: 16,
  fontSize: 14,
});

const Description = styled.div({
  marginBottom: 16,
});

export default class About extends React.Component {
  render() {
    const { name, metadata, storyPath } = this.props;

    if (!metadata) {
      return <Placeholder>No component information found for {name}.</Placeholder>;
    }

    const { description } = metadata.docgenInfo;
    const requiredProps = [];
    const optionalProps = [];
    const alphaSort = (a, b) => a.name.localeCompare(b.name);

    Object.values(metadata.docgenInfo.props).forEach(prop => {
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

    return (
      <Wrapper>
        <PathBar
          sourcePath={getSourcePath(metadata.path)}
          storyPath={getSourcePath(storyPath)}
          importPath={getImportPath(metadata.path, metadata.name)}
        />

        {description && (
          <Description>
            <Markdown>{description}</Markdown>
          </Description>
        )}

        {props.length > 0 && <PropTable props={props} />}
      </Wrapper>
    );
  }
}
