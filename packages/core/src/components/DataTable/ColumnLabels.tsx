import React from 'react';
import { SortDirection } from 'react-virtualized';
import SortCarets from '../SortCarets';
import Spacing from '../Spacing';
import Text from '../Text';
import { WithStylesProps } from '../../composers/withStyles';
import { caseColumnLabel, getHeight } from './helpers';
import {
  ColumnLabelCase,
  ColumnMetadata,
  ColumnToLabel,
  HeightOptions,
  RowHeightOptions,
} from './types';

// Theses anys are required to match the param types from react-virtualized
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/types.js
type ColumnLabelsProps = {
  // Column className from react-virutalized.
  className: string;
  // Array of columns from react-virtualized.
  columns: React.ReactNode[];
  // Column style from react-virtualized, infered from Column widths.
  style: React.CSSProperties;
};

/** See https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultHeaderRowRenderer.js.
    In order to overwrite the existing labels and carets in defaultHeaderRowRenderer,
    we clone them from props (children[0] = label, children[1] = carets), build around their data. */
export default function ColumnLabels({
  cx,
  styles,
  columnToLabel = {},
  showColumnDividers,
  rowHeight,
  columnHeaderHeight,
  expandable,
  selectable,
  columnMetadata,
  columnLabelCase,
}: {
  cx: WithStylesProps['cx'];
  styles: WithStylesProps['styles'];
  columnToLabel?: ColumnToLabel;
  showColumnDividers?: boolean;
  rowHeight?: RowHeightOptions;
  columnHeaderHeight?: HeightOptions;
  expandable?: boolean;
  selectable?: boolean;
  columnMetadata?: ColumnMetadata;
  columnLabelCase?: ColumnLabelCase;
}) {
  return ({ className, columns, style }: ColumnLabelsProps) => {
    const leftmostIdx = Number(expandable) + Number(selectable);

    const heightStyle: React.CSSProperties = {
      height: getHeight(rowHeight, columnHeaderHeight),
    };

    const rightAlignmentStyle: React.CSSProperties = {
      justifyContent: 'flex-end',
      width: '100%',
    };

    const newColumns = columns.map((col, idx) => {
      if (!React.isValidElement(col)) {
        return col;
      }

      const { children } = col.props;
      const key = children[0].props.children;
      const label = columnToLabel[key]
        ? columnToLabel[key]
        : key && caseColumnLabel(key, columnLabelCase!);
      const sort = children[1] && children[1].props.sortDirection;

      const isLeftmost = idx === leftmostIdx;
      const isRightmost = idx === columns.length - 1;
      const indent = !((expandable || selectable) && isLeftmost);

      const showDivider = showColumnDividers && !!label && !isRightmost;

      const sortable =
        !columnMetadata || !columnMetadata[key] || columnMetadata[key].disableSorting !== 1;

      const newHeader = (
        <Spacing left={indent && !isLeftmost ? 2 : 0}>
          <div style={heightStyle} className={cx(showDivider && styles && styles.column_divider)}>
            <div
              style={
                columnMetadata && columnMetadata[key] && columnMetadata[key].rightAlign
                  ? rightAlignmentStyle
                  : {}
              }
              className={cx(styles && styles.headerRow)}
            >
              <Text micro muted>
                {label}
              </Text>

              {label && sortable && (
                <Spacing inline left={0.5}>
                  <SortCarets
                    down
                    up
                    enableDown={sort === SortDirection.DESC}
                    enableUp={sort === SortDirection.ASC}
                  />
                </Spacing>
              )}
            </div>
          </div>
        </Spacing>
      );

      return React.cloneElement(col, col.props, newHeader);
    });

    return (
      <div role="row" style={style} className={cx(className, styles && styles.column_header)}>
        {newColumns}
      </div>
    );
  };
}
