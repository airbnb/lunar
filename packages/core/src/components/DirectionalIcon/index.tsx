import React, { useContext } from 'react';
import { DirectionContext } from 'aesthetic-react';
import { WithIconWrapperProps } from '@airbnb/lunar-icons/lib/withIcon';
import Core from '../..';

export type DirectionalIconProps = {
  /** The default direction to render. */
  direction: 'left' | 'right';
  /** The left direction facing icon. */
  left: React.ComponentType<WithIconWrapperProps>;
  /** The right direction facing icon. */
  right: React.ComponentType<WithIconWrapperProps>;
};

export default function DirectionalIcon({
  direction,
  left: LeftIcon,
  right: RightIcon,
  ...props
}: DirectionalIconProps & WithIconWrapperProps) {
  const context = useContext(DirectionContext);
  const rtl = Core.isRTL(context);

  if (direction === 'left') {
    return rtl ? <RightIcon {...props} /> : <LeftIcon {...props} />;
  }

  return rtl ? <LeftIcon {...props} /> : <RightIcon {...props} />;
}
