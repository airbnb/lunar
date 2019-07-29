import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import withStyles, { WithStylesProps } from '../../../composers/withStyles';
import Text from '../../Text';
import Title from '../../Title';
import IconButton from '../../IconButton';
import T from '../../Translate';
import useTheme from '../../../hooks/useTheme';
import { Z_INDEX_MODAL } from '../../../constants';
import toRGBA from '../../../utils/toRGBA';

export type Props = {
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
  onClose: (event: React.MouseEvent<any> | React.KeyboardEvent) => void;
};

/** A Dialog component with a backdrop and a standardized layout. */
function ModalInnerContent({
  children,
  cx,
  footer,
  large,
  small,
  onClose,
  scrollable,
  styles,
  subtitle,
  title,
}: Props & WithStylesProps) {
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
            accessibilityLabel={T.phrase(
              'Close',
              {},
              { context: 'Close a modal popup', key: 'lunar.common.close' },
            )}
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

export default withStyles(({ color, ui, unit }) => ({
  wrapper: {
    position: 'relative',
  },

  header: {
    padding: unit * 3,
  },

  header_scrollable: {
    position: 'relative',

    ':after': {
      content: '" "',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      height: unit / 2,
      background: `linear-gradient(${toRGBA(color.core.neutral[6], 15)}, ${toRGBA(
        color.core.neutral[6],
        0,
      )})`,
    },
  },

  close: {
    position: 'absolute',
    top: unit * 2,
    right: unit * 2,
    zIndex: Z_INDEX_MODAL,
  },

  close_float: {
    float: 'right',
    position: 'relative',
    top: 0,
    right: 0,
    margin: `${unit * 2}px ${unit * 2}px ${unit / 2}px ${unit / 2}px`,
  },

  body: {
    padding: `0 ${unit * 3}px`,
  },

  body_paddingBottom: {
    paddingBottom: unit * 3,
  },

  body_paddingTop: {
    paddingTop: unit * 3,
  },

  body_scrollable: {
    paddingBottom: unit * 3,
    maxHeight: 300,
    overflow: 'auto',

    ':before': {
      content: '" "',
      position: 'sticky',
      display: 'block',
      width: `calc(100% + ${unit * 6}px)`,
      marginLeft: -unit * 3,
      height: unit / 2,
      background: color.accent.bg,
    },
  },

  body_scrollableSmall: {
    maxHeight: 160,
  },

  body_scrollableLarge: {
    maxHeight: 500,
  },

  footer: {
    padding: unit * 3,
  },

  footer_scrollable: {
    borderTop: ui.border,
  },
}))(ModalInnerContent);
