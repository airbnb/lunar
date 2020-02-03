import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui, unit }) => ({
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

  row_inline: {
    borderTop: 0,
    borderBottom: 0,
  },

  after: {
    paddingLeft: unit * 2,
    flexShrink: 0,
  },

  after_compact: {
    paddingLeft: unit,
  },

  after_compact_inline: {
    paddingLeft: 0.5 * unit,
  },

  before: {
    paddingRight: unit * 2,
    flexShrink: 0,
  },

  before_compact: {
    paddingRight: unit,
  },

  before_compact_inline: {
    paddingRight: 0.5 * unit,
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

export default styleSheet;

export { styleSheet };
