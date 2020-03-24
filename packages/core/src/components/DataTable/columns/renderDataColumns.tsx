import React from 'react';
import { Column, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import DefaultRenderer from '../DefaultRenderer';
import Spacing from '../../Spacing';
import {
  ColumnMetadata,
  DataTableProps,
  VirtualRow,
  WidthProperties,
  RendererProps,
} from '../types';
import { WithStylesProps } from '../../../composers/withStyles';
import { DEFAULT_WIDTH_PROPERTIES } from '../constants';

type ArgumentsFromProps = {
  cx: WithStylesProps['cx'];
  styles: WithStylesProps['styles'];
  columnMetadata?: ColumnMetadata;
  showColumnDividers?: boolean;
  renderers?: DataTableProps['renderers'];
  zebra?: boolean;
  theme?: WithStylesProps['theme'];
  expandable?: boolean;
  dynamicRowHeight?: boolean;
};

export default function renderDataColumns<T>(
  keys: string[],
  cache: CellMeasurerCache,
  {
    columnMetadata,
    expandable,
    renderers,
    showColumnDividers,
    zebra,
    dynamicRowHeight,
    cx,
    styles,
    theme,
  }: ArgumentsFromProps,
) {
  const renderCell = (key: string, columnIndex: number, row: VirtualRow<T>) => {
    const { metadata } = row.rowData;
    const { isChild } = metadata;
    const customRenderer = renderers?.[key];
    const isLeftmost = columnIndex === 0;
    const isRightmost = columnIndex === keys.length - 1;
    const indentSize = !expandable || !isLeftmost ? 2 : 2.5;
    const spacing = isChild || !(expandable && isLeftmost) ? indentSize : 0;
    const rendererArguments: RendererProps<T> = {
      row,
      keyName: key as keyof T,
      zebra: zebra || false,
      theme,
    };

    if (metadata?.colSpanKey && renderers) {
      if (isLeftmost) {
        const colSpanRenderer = renderers[metadata.colSpanKey];

        if (colSpanRenderer) {
          return React.createElement(colSpanRenderer, rendererArguments);
        }
      }
    }

    const contents = React.createElement(customRenderer || DefaultRenderer, rendererArguments);

    return (
      <Spacing left={isLeftmost ? 0 : spacing} right={isRightmost ? 0 : 2}>
        {contents || ''}
      </Spacing>
    );
  };

  const columnCellRenderer = (columnIdx: number) => (row: VirtualRow<T>) => {
    const { dataKey, parent, rowIndex } = row;

    const content = renderCell(dataKey, columnIdx, row);

    if (!dynamicRowHeight) {
      return (
        <div className={cx(styles.rowContainer)}>
          <div className={cx(styles.row)}>{content}</div>
        </div>
      );
    }

    return (
      <div className={cx(styles.rowContainer)}>
        <CellMeasurer
          key={dataKey}
          cache={cache}
          columnIndex={columnIdx}
          // @ts-ignore We need to pass in the parent node
          parent={parent}
          rowIndex={rowIndex}
        >
          <div className={cx(styles.row)}>{content}</div>
        </CellMeasurer>
      </div>
    );
  };

  return keys.map((key, idx: number) => {
    const widthPropertiesOptions = ['maxWidth', 'minWidth', 'width', 'flexGrow', 'flexShrink'];
    const widthProperties: WidthProperties = {};
    widthPropertiesOptions.forEach((property) => {
      widthProperties[property] =
        columnMetadata?.[key]?.[property] === undefined
          ? DEFAULT_WIDTH_PROPERTIES[property]
          : columnMetadata[key][property];
    });

    const isRightmost = idx === keys.length - 1;

    return (
      <Column
        key={key}
        dataKey={key}
        label={key}
        width={widthProperties.width}
        flexGrow={widthProperties.flexGrow}
        flexShrink={widthProperties.flexShrink}
        maxWidth={widthProperties.maxWidth}
        minWidth={widthProperties.minWidth}
        cellRenderer={columnCellRenderer(idx)}
        className={cx(
          styles?.column,
          showColumnDividers && !isRightmost && styles && styles.column_divider,
        )}
      />
    );
  });
}
