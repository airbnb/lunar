import React from 'react';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';

export type Props = {
  children: NonNullable<React.ReactNode>;
  selected: boolean;
  onSelect: (top: number, left: number) => void;
};

class Mark extends React.Component<Props & WithStylesProps> {
  ref = React.createRef<HTMLSpanElement>();

  componentDidMount() {
    this.handleSelect();
  }

  componentDidUpdate() {
    this.handleSelect();
  }

  private handleSelect = () => {
    const { ref } = this;

    if (this.props.selected && ref.current) {
      this.props.onSelect(ref.current.offsetTop + ref.current.offsetHeight, ref.current.offsetLeft);
    }
  };

  render() {
    const { cx, children, selected, styles } = this.props;

    return (
      <mark className={cx(styles.mark, selected && styles.mark_selected)} ref={this.ref}>
        {children}
      </mark>
    );
  }
}

export default withStyles(({ color, ui }) => ({
  mark: {
    position: 'relative',
    color: 'transparent',
    backgroundColor: 'transparent',
    opacity: 0.75,
    padding: 1,
    margin: -1,
    transition: 'opacity .2s, background .2s',

    '::after': {
      position: 'absolute',
      display: 'block',
      content: '""',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      borderRadius: ui.borderRadius,
      backgroundColor: color.core.danger[2],
    },
  },

  mark_selected: {
    opacity: ui.disabledOpacity,
    borderTopLeftRadius: ui.borderRadius,
    borderTopRightRadius: ui.borderRadius,
    backgroundColor: color.core.danger[2],
  },
}))(Mark);
