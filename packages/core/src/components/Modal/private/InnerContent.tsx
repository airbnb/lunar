import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import Text from '../../Text';
import Title from '../../Title';
import IconButton from '../../IconButton';
import T from '../../Translate';
import useStyles from '../../../hooks/useStyles';
import useTheme from '../../../hooks/useTheme';
import { styleSheetInnerContent as styleSheet } from '../styles';

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
  /** Callback for when the Dialog should be closed.  */
  onClose: (event: React.MouseEvent | React.KeyboardEvent) => void;
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
}: ModalInnerContentProps) {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const withHeader = Boolean(title || subtitle);
  const withFooter = Boolean(footer);

  return (
    <div className={cx(styles.wrapper)}>
      {withHeader && (
        <header className={cx(styles.header, scrollable && styles.header_scrollable)}>
          {title && <Title level={3}>{title}</Title>}
          {subtitle && <Text muted>{subtitle}</Text>}
        </header>
      )}

      <div className={cx(styles.close, !withHeader && styles.close_float)}>
        <IconButton onClick={onClose}>
          <IconClose
            accessibilityLabel={T.phrase('lunar.common.close', 'Close')}
            color={theme.color.muted}
            size={theme.unit * 3}
          />
        </IconButton>
      </div>

      <div
        className={cx(
          styles.body,
          !withHeader && styles.body_paddingTop,
          !withFooter && styles.body_paddingBottom,
          scrollable && styles.body_scrollable,
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
