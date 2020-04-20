import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import Row from '../../Row';
import Text from '../../Text';
import Title from '../../Title';
import IconButton from '../../IconButton';
import T from '../../Translate';
import useStyles, { StyleSheet } from '../../../hooks/useStyles';
import useTheme from '../../../hooks/useTheme';
import { styleSheetInnerContent } from '../styles';

export type ModalInnerContentProps = {
  /** Dialog content. */
  children: NonNullable<React.ReactNode>;
  /** Footer content. */
  footer?: React.ReactNode;
  /** Show the large version of the Dialog. */
  large?: boolean;
  /** Modal content height becomes scrollable. */
  scrollable?: boolean;
  /** Show the small version of the Dialog. */
  small?: boolean;
  /** Dialog header subtitle. */
  subtitle?: React.ReactNode;
  /** Dialog header title. */
  title?: React.ReactNode;
  /** Top bar, above dialog header. */
  topBar?: React.ReactNode;
  /** Whether the top bar content is centered. */
  topBarCentered?: boolean;
  /** Callback for when the Dialog should be closed.  */
  onClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** A Dialog component with a backdrop and a standardized layout. */
export default function ModalInnerContent({
  children,
  footer,
  large,
  small,
  onClose,
  scrollable,
  subtitle,
  title,
  topBar,
  topBarCentered,
  styleSheet,
}: ModalInnerContentProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetInnerContent);
  const theme = useTheme();
  const withHeader = Boolean(title || subtitle);
  const withFooter = Boolean(footer);

  const closeButton = (
    <IconButton onClick={onClose}>
      <IconClose
        accessibilityLabel={T.phrase('lunar.common.close', 'Close')}
        color={theme.color.muted}
        size={theme.unit * 3}
      />
    </IconButton>
  );

  return (
    <div className={cx(styles.wrapper)}>
      {topBar && (
        <div className={cx(styles.header, styles.topBar, topBarCentered && styles.topBar_centered)}>
          <Row middleAlign after={closeButton}>
            {topBar}
          </Row>
        </div>
      )}

      {withHeader && (
        <header className={cx(styles.header, scrollable && styles.header_scrollable)}>
          <Row after={topBar ? null : closeButton}>
            <div className={cx(styles.headerInner)}>
              {title && <Title level={3}>{title}</Title>}
              {subtitle && <Text muted>{subtitle}</Text>}
            </div>
          </Row>
        </header>
      )}

      {!withHeader && !topBar && <div className={cx(styles.close_float)}>{closeButton}</div>}

      <div
        className={cx(
          styles.body,
          !withHeader && styles.body_paddingTop,
          !withFooter && styles.body_paddingBottom,
          scrollable && styles.body_scrollable,
          scrollable && !withHeader && styles.body_scrollable_noHeader,
          small && scrollable && styles.body_scrollableSmall,
          large && scrollable && styles.body_scrollableLarge,
        )}
      >
        {children}
      </div>

      {footer && (
        <footer className={cx(styles.footer, scrollable && styles.footer_scrollable)}>
          {footer}
        </footer>
      )}
    </div>
  );
}
