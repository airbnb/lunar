import { WithStylesProps } from '../../composers/withStyles';
import { STATUS_OPTIONS, HEIGHT_TO_PX } from './constants';
import { HeightOptions, ExpandedRow, RowHeightOptions, Status } from './types';

function getStatusColor(theme: WithStylesProps['theme'], status: Status) {
  if (status === STATUS_OPTIONS.ALERT) {
    return theme!.color.core.danger[0];
  }

  return theme!.color.core.warning[0];
}

export function getRowColor(
  row: ExpandedRow,
  index: number,
  zebra: boolean,
  theme: WithStylesProps['theme'],
) {
  const { accent, core } = theme!.color;

  if (index < 0) {
    return accent.bg;
  }
  if (row.metadata && row.metadata.status) {
    return getStatusColor(theme, row.metadata.status);
  }
  if (zebra) {
    return index % 2 ? accent.bg : core.neutral[0];
  }

  return accent.bg;
}

export function getHeight(defaultHeight?: RowHeightOptions, overrideHeight?: HeightOptions) {
  if (overrideHeight) {
    return HEIGHT_TO_PX[overrideHeight];
  }

  return defaultHeight ? HEIGHT_TO_PX[defaultHeight] : 0;
}
