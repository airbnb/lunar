import { StyleSheet } from '../../hooks/useStyles';

const styleSheet: StyleSheet = ({ unit }) => ({
  wrapper: {
    display: 'grid',
    gridTemplateAreas: '"previous page next"',
    gridTemplateColumns: 'auto 1fr auto',
    gridColumnGap: unit * 2,
    alignItems: 'center',
    justifyItems: 'center',
  },

  wrapper_endAlign: {
    gridTemplateAreas: '"page previous next"',
    gridTemplateColumns: 'auto',
    justifyContent: 'end',
  },

  wrapper_centerAlign: {
    gridTemplateColumns: 'auto',
    justifyContent: 'center',
  },

  wrapper_startAlign: {
    gridTemplateAreas: '"previous next page"',
    gridTemplateColumns: 'auto',
    justifyContent: 'start',
  },

  page: {
    gridArea: 'page',
  },

  previous: {
    gridArea: 'previous',
  },

  next: {
    gridArea: 'next',
  },
});

export default styleSheet;

export { styleSheet };
