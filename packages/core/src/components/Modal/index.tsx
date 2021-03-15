import React, { useEffect } from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import Portal from '../Portal';
import ModalInner, { ModalInnerProps } from './private/Inner';
import { ESCAPE } from '../../keys';
import { styleSheetModal } from './styles';
import { Z_INDEX_MODAL } from '../../constants';

export type ModalProps = ModalInnerProps & {
  /** Custom style sheet. */
  innerStyleSheet?: StyleSheet;
  /** Z-index of the modal. */
  zIndex?: number | 'auto';
};

/** A modal component with a backdrop and a standardized layout. */
export default function Modal({
  onClose,
  styleSheet,
  innerStyleSheet,
  zIndex,
  ...props
}: ModalProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetModal);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    onClose(event);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ESCAPE) {
      handleClose(event);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const containerZIndex = { zIndex: zIndex ?? Z_INDEX_MODAL };

  return (
    <Portal>
      <div className={cx(containerZIndex, styles.container)}>
        <div role="presentation" className={cx(styles.wrapper)} onKeyUp={handleKeyUp}>
          <ModalInner {...props} styleSheet={innerStyleSheet} onClose={onClose} />
        </div>
      </div>
    </Portal>
  );
}
