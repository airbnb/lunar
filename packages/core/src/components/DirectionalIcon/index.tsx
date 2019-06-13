import React from 'react';
import { WithIconWrapperProps } from '@airbnb/lunar-icons/lib/withIcon';
import Core from '../..';

export type Props = {
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
}: Props & WithIconWrapperProps) {
  if (direction === 'left') {
    return Core.settings.rtl ? <RightIcon {...props} /> : <LeftIcon {...props} />;
  }

  return Core.settings.rtl ? <LeftIcon {...props} /> : <RightIcon {...props} />;
}
