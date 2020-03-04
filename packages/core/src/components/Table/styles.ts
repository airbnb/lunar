import { StyleBlock } from 'aesthetic';
import { StyleSheet } from '../../hooks/useStyles';

function createCell(styles: StyleBlock) {
  return {
    '@selectors': {
      ':only-child td': styles,
      ':only-child th': styles,
    },
  };
}

function createRow(hex: string) {
  return {
    // Overrides table specificity
    '@selectors': {
      ':nth-child(n) > td': {
        backgroundColor: hex,
      },
    },
  };
}

export const styleSheetTable: StyleSheet = ({ color, ui, unit }) => ({
  table: {
    width: '100%',
    maxWidth: '100%',
    margin: 0,
    padding: 0,
    backgroundColor: color.accent.bg,
    border: '1px solid transparent',
    borderCollapse: 'collapse',
    borderSpacing: 0,

    '@selectors': {
      ':only-child td': {
        padding: unit * 1.5,
        verticalAlign: 'top',
      },

      ':only-child th': {
        padding: unit * 1.5,
        verticalAlign: 'bottom',
        whiteSpace: 'nowrap',
        textAlign: 'left',
      },
    },
  },

  table_bordered_horizontal: {
    borderTop: ui.border,
    borderBottom: ui.border,
  },

  table_bordered_vertical: {
    borderLeft: ui.border,
    borderRight: ui.border,
  },

  table_compact: {
    ...createCell({
      padding: unit,
    }),
  },

  table_horizontal: {
    '@selectors': {
      ':only-child > tbody > tr > td': {
        borderTop: ui.border,
      },
    },
  },

  table_fixed: {
    display: 'table',
    tableLayout: 'fixed',
  },

  table_loading: {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  table_striped: {
    '@selectors': {
      ':only-child > tbody > tr': {
        backgroundColor: color.accent.bg,

        '@selectors': {
          ':nth-child(odd)': {
            backgroundColor: color.accent.bgHover,
          },
        },
      },
    },
  },

  table_transparent: {
    backgroundColor: 'transparent',
  },

  table_vertical: {
    ...createCell({
      borderLeft: ui.border,
      borderRight: ui.border,
    }),
  },

  responsive_wrapper: {
    maxWidth: '100%',
    overflowX: 'auto',
  },

  content_middle_align: {
    '@selectors': {
      ':only-child td': {
        verticalAlign: 'middle',
      },
    },
  },
});

export const styleSheetCell: StyleSheet = () => ({
  cell_truncate: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    ':hover': {
      maxWidth: 'none',
      overflow: 'inherit',
      whiteSpace: 'inherit',
      wordWrap: 'break-word',
    },
  },

  cell_left: {
    textAlign: 'left',
  },

  cell_center: {
    textAlign: 'center',
  },

  cell_right: {
    textAlign: 'right',
  },

  cell_wrap: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
});

export const styleSheetRow: StyleSheet = ({ color }) => {
  return {
    row_danger: createRow(color.core.danger[0]),
    row_info: createRow(color.core.primary[0]),
    row_muted: createRow(color.core.neutral[0]),
    row_notice: createRow(color.core.secondary[0]),
    row_success: createRow(color.core.success[0]),
    row_warning: createRow(color.core.warning[0]),
  };
};
