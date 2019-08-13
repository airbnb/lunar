import React from 'react';
import Text from '@airbnb/lunar/src/components/Text';

function daysBreakdown(totalDays) {
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = Math.floor(totalDays % 30);

  return { years, months, days };
}

export default function TenureRenderer({ row }) {
  const { years, months, days } = daysBreakdown(row.rowData.data.tenureDays);

  return <Text>{`${years > 0 ? `${years}y ` : ''}${months}m ${days}d`}</Text>;
}
