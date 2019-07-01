import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Portal from '../Portal';
import ModalInner, { Props as ModalInnerProps } from './private/Inner';
import { ESCAPE } from '../../keys';
import { Z_INDEX_MODAL } from '../../constants';
import toRGBA from '../../utils/toRGBA';

export type Props = ModalInnerProps;

/** A modal component with a backdrop and a standardized layout. */
export class Modal extends React.Component<Props & WithStylesProps> {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  private handleClose = (event: React.MouseEvent<any> | React.KeyboardEvent) => {
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
          <div onKeyUp={this.handleKeyUp} role="presentation" className={cx(styles.wrapper)}>
            <ModalInner {...otherProps} />
          </div>
        </div>
      </Portal>
    );
  }
}

export default withStyles(({ color, unit }) => ({
  container: {
    bottom: 0,
    left: 0,
    overflowY: 'auto',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: Z_INDEX_MODAL,
  },

  wrapper: {
    alignItems: 'center',
    backgroundColor: toRGBA(color.core.neutral[6], 75),
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    padding: unit * 2,
    width: '100%',
  },
}))(Modal);
