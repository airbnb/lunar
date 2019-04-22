import React from 'react';

import { RendererProps } from '../../../../packages/core/src/components/DataTable/types';
import Text from '../../../../packages/core/src/components/Text';
import Row from '../../../../packages/core/src/components/Row';

function daysBreakdown(totalDays) {
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = Math.floor(totalDays % 30);

  return { years, months, days };
}

export default function tenureRenderer({ row }) {
  const { years, months, days } = daysBreakdown(row.rowData.data.tenureDays);

  const text = <Text>{`${years > 0 ? `${years}y ` : ''}${months}m ${days}d`}</Text>;
  return <Row after={text}>{}</Row>;
}
