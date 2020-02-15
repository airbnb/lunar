import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ color, pattern, unit }) => ({
  alert: {
    ...pattern.box,
    display: 'block',
    alignItems: 'start',
    position: 'relative',
    borderColor: color.core.neutral[1],
    backgroundColor: color.accent.bg,
    overflow: 'hidden',
    padding: unit * 3,
    wordBreak: 'break-word',

    ':before': {
      content: '" "',
      backgroundColor: color.accent.text,
      position: 'absolute',
      top: 0,
      left: 0,
      width: unit / 2,
      height: '100%',
    },
  },

  alert_inline: {
    display: 'inline-block',
  },

  alert_danger: {
    ':before': {
      backgroundColor: color.core.danger[3],
    },
  },

  alert_info: {
    ':before': {
      backgroundColor: color.core.primary[3],
    },
  },

  alert_notice: {
    ':before': {
      backgroundColor: color.core.secondary[3],
    },
  },

  alert_success: {
    ':before': {
      backgroundColor: color.core.success[3],
    },
  },

  alert_warning: {
    ':before': {
      backgroundColor: color.core.warning[3],
    },
  },

  alert_statusIcon: {
    paddingLeft: unit * 2.5,
  },
});

export default styleSheet;

export { styleSheet };
