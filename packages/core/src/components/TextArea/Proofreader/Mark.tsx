import React from 'react';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import { styleSheetMark as styleSheet } from './styles';

export type Props = {
  children: NonNullable<React.ReactNode>;
  selected: boolean;
  onSelect: (top: number, left: number) => void;
  alwaysHighlight?: boolean;
};

class Mark extends React.PureComponent<Props & WithStylesProps> {
  static defaultProps = {
    alwaysHighlight: false,
  };

  ref = React.createRef<HTMLSpanElement>();

  componentDidMount() {
    this.handleSelect();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selected !== prevProps.selected) {
      this.handleSelect();
    }
  }

  private handleSelect = () => {
    const { ref } = this;

    if (this.props.selected && ref.current) {
      this.props.onSelect(ref.current.offsetTop + ref.current.offsetHeight, ref.current.offsetLeft);
    }
  };

  render() {
    const { cx, children, selected, alwaysHighlight, styles } = this.props;
    const highlight = selected || alwaysHighlight;

    return (
      <mark ref={this.ref} className={cx(styles.mark, highlight && styles.mark_highlight)}>
        {children}
      </mark>
    );
  }
}

export default withStyles(styleSheet, { extendable: true })(Mark);
