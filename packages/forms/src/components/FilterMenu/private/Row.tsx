import React from 'react';
import BaseMenuRow, { MenuRowProps } from '@airbnb/lunar/lib/components/Menu/Row';
import proxyComponent from '@airbnb/lunar/lib/utils/proxyComponent';

export default proxyComponent(BaseMenuRow, ({ children }: MenuRowProps) => (
  <BaseMenuRow spacious>{children}</BaseMenuRow>
));
