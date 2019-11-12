import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ ui }) => ({
  rule: {
    borderBottom: ui.border,
  },
});

export default styleSheet;

export { styleSheet };
