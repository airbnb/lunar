import React from 'react';
import { styled } from '@storybook/theming';
import { Button } from '@storybook/components';

const Wrapper = styled.div({
  marginBottom: 16,
  '::after': {
    content: '""',
    clear: 'both',
    display: 'table',
  },
});

const RightAlign = styled.div({
  float: 'right',
  '> *': {
    marginLeft: '8px !important',
  },
});

const ImportPath = styled.div(({ theme }) => ({
  padding: 8,
  fontSize: 13,
  width: 'auto',
  display: 'inline-block',
  backgroundColor: theme.barBg,
  border: `1px solid ${theme.appBorderColor}`,
  borderRadius: theme.appBorderRadius,
}));

export default function PathBar({ sourcePath, storyPath, importPath }) {
  return (
    <Wrapper>
      <RightAlign>
        <Button href={sourcePath} target="_blank" isLink secondary small>
          View source
        </Button>

        <Button href={storyPath} target="_blank" isLink secondary small>
          View story
        </Button>
      </RightAlign>

      {importPath && <ImportPath>{importPath}</ImportPath>}
    </Wrapper>
  );
}
