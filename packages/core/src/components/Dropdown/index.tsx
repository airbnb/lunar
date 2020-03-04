import React, { useEffect, useCallback, useRef } from 'react';
import { Block } from 'aesthetic';
import useStyles from '../../hooks/useStyles';

export type DropdownProps = {
  /** Bottom offset. */
  bottom?: number | string;
  /** Content within the dropdown. */
  children: NonNullable<React.ReactNode>;
  /** Position the dropdown absolutely (default) or fixed. */
  fixed?: boolean;
  /** Left offset. */
  left?: number | string;
  /** Callback fired when dropdown is unfocused. */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** Callback fired when a click occurs inside the dropdown when `visible`. */
  onClickInside?: (event: MouseEvent) => void;
  /** Callback fired when a click occurs outside the dropdown when `visible`. */
  onClickOutside?: (event: MouseEvent) => void;
  /** Callback fired when dropdown is focused. */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  /** Right offset. */
  right?: number | string;
  /** Tab index for focus management. */
  tabIndex?: number;
  /** Top offset. */
  top?: number | string;
  /** When the dropdown is visible, adds event listening for clicks outside of the dropdown. */
  visible?: boolean;
  /** Z-index of the dropdown. */
  zIndex?: number | 'auto';
};

/** An abstract component for displaing menus and overlays over content. */
export default function Dropdown({
  children,
  fixed,
  onBlur,
  onFocus,
  tabIndex,
  zIndex,
  visible,
  onClickInside,
  onClickOutside,
  ...props
}: DropdownProps) {
  const [, cx] = useStyles(() => ({}));
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const { current } = ref;

      if (current?.contains(event.target as Element)) {
        if (onClickInside) {
          onClickInside(event);
        }

        return;
      }

      if (onClickOutside) {
        onClickOutside(event);
      }
    },
    [ref, onClickInside, onClickOutside],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleClick, true);
    } else {
      document.removeEventListener('click', handleClick, true);
    }

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [visible, handleClick]);

  const style: Block = {
    position: fixed ? 'fixed' : 'absolute',
    zIndex: zIndex ?? 'auto',
    ...props,
  };

  // Set top by default if neither are defined
  if (!('bottom' in props) && !('top' in props)) {
    style.top = '100%';
  }

  // Set left by default if neither are defined
  if (!('left' in props) && !('right' in props)) {
    style.left = 0;
  }

  return (
    <div ref={ref} className={cx(style)} tabIndex={tabIndex} onBlur={onBlur} onFocus={onFocus}>
      {children}
    </div>
  );
}
