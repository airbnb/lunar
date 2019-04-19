import React from 'react';
import { WithStylesProps } from '../../composers/withStyles';
import { STATUS_OPTIONS, HEIGHT_TO_PX } from './constants';
import { HeightOptions, ExpandedRow, RowHeightOptions, Status } from './types';

export function camelToWords(s: string) {
  return s.replace(/([A-Z])/g, ' $1');
}

function getStatusColor(theme: WithStylesProps['theme'], status: Status) {
  if (theme) {
    if (status === STATUS_OPTIONS.ALERT) {
      return theme.color.core.danger[0];
    }

    return theme.color.core.warning[0];
  }

  return '';
}

export function getRowColor(
  row: ExpandedRow,
  index: number,
  zebra: boolean,
  theme: WithStylesProps['theme'],
) {
  if (theme) {
    const { core, accent } = theme.color;

    if (index < 0) {
      return accent.bg;
    }
    if (row.metadata && row.metadata.status) {
      return getStatusColor(theme, row.metadata.status);
    }
    if (zebra) {
      return index % 2 ? accent.bg : theme.color.core.neutral[0];
    }

    return accent.bg;
  }

  return '';
}

export function getHeight(defaultHeight: RowHeightOptions, overrideHeight: HeightOptions) {
  if (overrideHeight) {
    return HEIGHT_TO_PX[overrideHeight];
  }

  return HEIGHT_TO_PX[defaultHeight];
}
