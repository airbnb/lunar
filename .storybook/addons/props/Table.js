import { styled } from '@storybook/theming';

export default styled.table(({ theme }) => ({
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
