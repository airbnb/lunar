import { StyleSheet } from '../../hooks/useStyles';

export const styleSheetFormField: StyleSheet = ({ unit }) => ({
  field: {
    marginBottom: unit * 3,

    '@selectors': {
      ':last-child, :only-child': {
        marginBottom: 0,
      },
    },
  },

  field_compactSpacing: {
    marginBottom: unit * 1.5,
  },

  field_noSpacing: {
    margin: 0,
  },

  content_inline: {
    display: 'flex',
    alignItems: 'center',
  },

  content_topAlign: {
    alignItems: 'flex-start',
  },

  label: {
    margin: 0,
    marginBottom: unit,
    display: 'block',
    flexGrow: 0,
  },

  label_stretch: {
    flexBasis: '100%',
  },

  label_hidden: {
    display: 'none',
  },

  label_noSpacing: {
    margin: 0,
  },

  optional: {
    marginLeft: unit,
    display: 'inline-block',
  },

  input: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
  },

  input_fullWidth: {
    width: '100%',
  },

  input_beforeInline: {
    marginRight: unit,
  },

  input_afterInline: {
    marginLeft: unit,
  },

  input_hideLabel: {
    margin: 0,
  },

  affix: {
    flexGrow: 0,
  },

  anchor: {
    flexGrow: 1,
  },
});
