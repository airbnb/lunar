import React, { useState } from 'react';
import useStyles, { StyleSheet } from '../../hooks/useStyles';
import SheetContext from './SheetContext';
import { styleSheetSheetArea } from './styles';

export type SheetAreaProps = {
  /** Content that includes a sheet. */
  children: NonNullable<React.ReactNode>;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Container in which to render sheets. */
export default function SheetArea({ children, styleSheet }: SheetAreaProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetSheetArea);
  const [visible, setVisible] = useState(false);

  const setSheetVisible = (nextVisible: boolean) => {
    setVisible(nextVisible);
  };

  return (
    <SheetContext.Provider value={setSheetVisible}>
      <div className={cx(visible && styles.sheet_visible)}>{children}</div>
    </SheetContext.Provider>
  );
}
