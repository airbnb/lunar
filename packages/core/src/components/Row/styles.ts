import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetRow: StyleSheet = ({ ui, unit }) => ({
  row: {
    display: 'flex',
  },

  row_compact: {
    paddingBottom: unit * 1.5,
    paddingTop: unit * 1.5,
  },

  row_spacious: {
    paddingBottom: unit * 3,
    paddingTop: unit * 3,
  },

  row_middleAlign: {
    alignItems: 'center',
  },

  row_baseline: {
    borderBottom: ui.border,
  },

  row_topline: {
    borderTop: ui.border,
  },

  after: {
    paddingLeft: unit * 2,
    flexShrink: 0,
  },

  after_compact: {
    paddingLeft: unit,
  },

  before: {
    paddingRight: unit * 2,
    flexShrink: 0,
  },

  before_compact: {
    paddingRight: unit,
  },

  primary: {
    flex: 1,
    maxWidth: '100%',
  },

  primary_truncated: {
    overflow: 'hidden',
  },

  inline: {
    display: 'inline-flex',
    alignSelf: 'initial',
  },
});
