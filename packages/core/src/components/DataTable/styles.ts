import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetDataTable: StyleSheet = ({ ui }) => ({
  table_container: {
    overflowX: 'auto',
  },
  headerRow: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    textTransform: 'none',
  },
  column_header: {
    borderBottom: ui.border,
    cursor: 'pointer',
  },
  column: {
    height: 'inherit',
  },
  column_divider: {
    borderRight: ui.border,
  },
  rowContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  row: {
    whiteSpace: 'normal',
    width: '100%', // this is important for consumers who need full-width cells
  },
  expand_caret: {
    cursor: 'pointer',
  },
});

export const styleSheetTableHeader: StyleSheet = ({ unit, color, ui }) => ({
  tableHeader_inner: {
    background: color.accent.bg,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    paddingLeft: 2 * unit,
    paddingRight: 2 * unit,
    borderBottom: ui.border,
  },
});
