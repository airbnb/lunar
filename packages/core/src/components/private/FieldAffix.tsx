import withStyles from '../../composers/withStyles';
import BaseAffix, { Props as BaseProps } from './BaseAffix';

export type Props = BaseProps;

export default withStyles(({ color, font, unit, ui, pattern }) => ({
  affix: {
    ...font.textRegular,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    border: ui.borderThick,
    borderRadius: ui.borderRadius,
    background: color.accent.bgHover,
    paddingLeft: unit * 1.5,
    paddingRight: unit * 1.5,
  },

  affix_compact: {
    ...font.textSmall,
    paddingLeft: unit,
    paddingRight: unit,
  },

  affix_after: {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  affix_before: {
    borderRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  affix_disabled: {
    ...pattern.disabled,
  },
}))(BaseAffix);
