import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import withStyles, { css, WithStylesProps } from '../../../composers/withStyles';
import Title from '../../Title';
import Spacing from '../../Spacing';
import IconButton from '../../IconButton';
import T from '../../Translate';
import useTheme from '../../../hooks/useTheme';

export type Props = {
  /** Dialog content. */
  children: NonNullable<React.ReactNode>;
  /** Footer content. */
  footer?: React.ReactNode;
  /** True to show the large version of the Dialog. */
  large?: boolean;
  /** Dialog header title. */
  title?: React.ReactNode;
  /** True to make whole layout compact */
  compact?: boolean;
  /** Callback for when the Dialog should be closed.  */
  onClose: (event: React.MouseEvent<any> | React.KeyboardEvent) => void;
};

/** A Dialog component with a backdrop and a standardized layout. */
function ModalInnerContent({ children, footer, large, compact, onClose, title, styles }: Props & WithStylesProps) {
  const theme = useTheme();
  const closeButton = (
    <IconButton onClick={onClose}>
      <IconClose
        accessibilityLabel={T.phrase('Close', {}, 'Close a modal popup')}
        size={3 * theme.unit}
      />
    </IconButton>
  );

  return (
    <Spacing bottom={6} horizontal={4} top={4}>
      <Spacing bottom={title ? 3 : 0} right={compact ? 6 : 0 } tag="header">
        {compact ? (
          <div {...css(styles.floatCloseButton)}>
            {closeButton}
          </div>
        ) : (
          <Spacing bottom={4}>
            {closeButton}
          </Spacing>
        )}
        {title && <Title level={large ? 1 : 3}>{title}</Title>}
      </Spacing>

      {children}

      {footer && (
        <Spacing tag="footer" top={4}>
          {footer}
        </Spacing>
      )}
    </Spacing>
  );
}

export default withStyles(({ unit }) => ({
  floatCloseButton: {
    position: 'absolute',
    right: 4 * unit,
  }
}))(ModalInnerContent);

