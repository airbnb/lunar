import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetDataTable: StyleSheet = ({ ui, unit }) => ({
  tableContainer: {
    overflowX: 'auto',
  },
  headerRow: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    textTransform: 'none',
  },
  columnHeader: {
    borderBottom: ui.border,
    cursor: 'pointer',
  },
  column: {
    height: 'inherit',
  },
  columnDivider: {
    borderRight: ui.border,
  },
  columnLabelIndented: {
    marginLeft: 2 * unit,
  },
  columnLabelRightAligned: {
    justifyContent: 'flex-end',
    width: '100%',
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
  expandCaret: {
    cursor: 'pointer',
    marginLeft: 1.5 * unit,
    '@selectors': {
      '> svg': {
        width: '1.6em',
        height: '1.6em',
      },
    },
  },
});

export const styleSheetTableHeader: StyleSheet = ({ unit, color, ui }) => ({
  tableHeaderInner: {
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
