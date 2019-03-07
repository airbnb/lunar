import React from 'react';
import BaseRow, { Props } from '@airbnb/lunar/lib/components/Menu/Row';
import proxyComponent from '@airbnb/lunar/lib/utils/proxyComponent';

export default proxyComponent(BaseRow, ({ children }: Props) => (
  <BaseRow spacious>{children}</BaseRow>
));
