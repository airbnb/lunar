import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Portal from '../Portal';
import ModalInner, { ModalInnerProps } from './private/Inner';
import { ESCAPE } from '../../keys';
import { styleSheet } from './styles';

export type ModalProps = ModalInnerProps;

/** A modal component with a backdrop and a standardized layout. */
export class Modal extends React.Component<ModalProps & WithStylesProps> {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  private handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    this.props.onClose(event);
  };

  private handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ESCAPE) {
      this.handleClose(event);
    }
  };

  render() {
    const { cx, styles, ...otherProps } = this.props;

    return (
      <Portal>
        <div className={cx(styles.container)}>
          <div role="presentation" className={cx(styles.wrapper)} onKeyUp={this.handleKeyUp}>
            <ModalInner {...otherProps} />
          </div>
        </div>
      </Portal>
    );
  }
}

export default withStyles(styleSheet)(Modal);
