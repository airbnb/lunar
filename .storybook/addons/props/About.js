import React from 'react';
import Markdown from 'markdown-to-jsx';
import { styled } from '@storybook/theming';
import { Placeholder } from '@storybook/components';
import getImportPath from './getImportPath';
import getSourcePath from './getSourcePath';
import PathBar from './PathBar';
import PropTable from './PropTable';
import LogTable from './LogTable';

const Wrapper = styled.div({
  padding: 16,
  fontSize: 14,
});

const Header = styled.h2({
  marginBottom: 16,
  marginTop: 24,
});

const SubHeader = styled.h4(({ theme }) => ({
  float: 'right',
  color: theme.color.mediumdark,
  margin: 0,
  marginTop: 16,
}));

const Description = styled.div({
  marginBottom: 16,
});

export default class About extends React.Component {
  static defaultProps = {
    changelog: [],
    metadata: {},
  };

  render() {
    const { changelog, name, metadata, storyPath } = this.props;

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

        {changelog.length > 0 && (
          <>
            <SubHeader>Past 1 month</SubHeader>
            <Header>Changelog</Header>
            <LogTable logs={changelog} />
          </>
        )}

        {props.length > 0 && (
          <>
            <Header>Props</Header>
            <PropTable props={props} />
          </>
        )}
      </Wrapper>
    );
  }
}
