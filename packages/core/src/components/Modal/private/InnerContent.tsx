import React from 'react';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
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
  /** Callback for when the Dialog should be closed.  */
  onClose: (event: React.MouseEvent<any> | React.KeyboardEvent) => void;
};

/** A Dialog component with a backdrop and a standardized layout. */
export default function ModalInnerContent({ children, footer, large, onClose, title }: Props) {
  const theme = useTheme();

  return (
    <Spacing bottom={6} horizontal={4} top={4}>
      <Spacing bottom={title ? 3 : 0} tag="header">
        <Spacing bottom={4}>
          <IconButton onClick={onClose}>
            <IconClose
              accessibilityLabel={T.phrase('Close', {}, 'Close a modal popup')}
              size={3 * theme.unit}
            />
          </IconButton>
        </Spacing>

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
