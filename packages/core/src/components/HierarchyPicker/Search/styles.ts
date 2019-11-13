import { StyleSheet } from '../../../hooks/useStyles';

export const styleSheet: StyleSheet = ({ unit }) => ({
  container: {
    padding: unit,
  },
});

export const styleSheetHighlight: StyleSheet = ({ color, ui }) => ({
  highlight: {
    borderRadius: ui.borderRadius,
    backgroundColor: color.core.warning[0],

    '@selectors': {
      '> mark': {
        backgroundColor: 'transparent',
        color: 'inherit',
        position: 'relative',
        whiteSpace: 'nowrap',
      },
    },
  },

  highlight_dark: {
    backgroundColor: color.core.warning[3],
  },
});

export const styleSheetSearchResult: StyleSheet = ({ unit }) => ({
  resultItem: {
    padding: unit,
    wordBreak: 'break-word',
  },
});
