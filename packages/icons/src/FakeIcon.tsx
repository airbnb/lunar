import React from 'react';
import IconAdd from './interface/IconAdd';
import { WithIconWrapperProps } from './withIcon';

export type Props = WithIconWrapperProps;

function FakeIcon(props: Props) {
  return <IconAdd {...props} decorative />;
}

FakeIcon.defaultProps = {
  accessibilityLabel: '',
  color: 'currentColor',
  decorative: false,
  flip: false,
  flipVertical: false,
  inline: false,
  size: '1em',
};

export default FakeIcon;
