import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetDateTimeSelect: StyleSheet = ({ unit }) => ({
  selects: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',

    '@selectors': {
      '> div': {
        flexGrow: 0,
        width: 'auto',
      },
    },
  },

  spacer: {
    paddingLeft: unit / 2,
    paddingRight: unit / 2,
  },
});
