import { StyleSheet } from '../../hooks/useStyles';

export const termListStyleSheet: StyleSheet = ({ unit }) => ({
  termList: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  termList_vertical: {
    '@selectors': {
      '> div:not(:last-child)': {
        marginBottom: unit * 2,
      },
    },
  },
  termList_horizontal: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    '@selectors': {
      '> div:not(:last-child)': {
        marginRight: unit * 6,
      },
    },
  },
});

export const termStyleSheet: StyleSheet = () => ({
  dd: {
    marginInlineStart: 0,
  },
});
