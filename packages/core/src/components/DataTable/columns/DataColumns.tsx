import React from 'react';
import { Column } from 'react-virtualized';

import renderDefaultContent from '../DefaultRenderer';
import Spacing from '../../Spacing';
import {
  ColumnMetadata,
  DataTableProps,
  TableRow,
  OnEdit,
  HeightOptions,
  WidthProperties,
  RendererProps,
} from '../types';
import { css, WithStylesProps } from '../../../composers/withStyles';
import { DEFAULT_WIDTH_PROPERTIES } from '../constants';

type ArgumentsFromProps = {
  columnMetadata?: ColumnMetadata;
  showColumnDividers?: boolean;
  styles?: WithStylesProps['styles'];
  renderers?: DataTableProps['renderers'];
  zebra?: boolean;
  rowHeight?: HeightOptions;
  theme?: WithStylesProps['theme'];
  selectable?: boolean;
  expandable?: boolean;
};

export default function renderDataColumns(
  keys: string[],
  editMode: boolean,
  onEdit: OnEdit,
  {
    columnMetadata,
    showColumnDividers,
    styles,
    renderers,
    zebra,
    theme,
    selectable,
    expandable,
  }: ArgumentsFromProps,
) {
  const renderCell = (key: string, isLeftmost: boolean) => (row: TableRow) => {
    const { metadata } = row.rowData;
    const { isChild } = metadata;
    const customRenderer = renderers && renderers[key];

    const indentSize = !expandable || !isLeftmost ? 2 : 2.5;
    const spacing = isChild || !((expandable || selectable) && isLeftmost) ? indentSize : 0;

    const rendererArguments: RendererProps = {
      row,
      key,
      editMode,
      onEdit,
      zebra: zebra || false,
      theme,
    };

    if (metadata && metadata.colSpanKey && renderers) {
      if (isLeftmost) {
        const colSpanRenderer = renderers[metadata.colSpanKey];
        if (colSpanRenderer) {
          return colSpanRenderer(rendererArguments);
        }
      }
    }

    const contents: React.ReactNode = customRenderer
      ? customRenderer(rendererArguments)
      : renderDefaultContent(rendererArguments);

    return (
      <div {...css(styles && styles.row)}>
        <div {...css(styles && styles.row_inner)}>
          <Spacing left={spacing} right={2}>
            {contents || ''}
          </Spacing>
        </div>
      </div>
    );
  };

  return keys.map((key, idx: number) => {
    const widthPropertiesOptions = ['maxWidth', 'minWidth', 'width', 'flexGrow', 'flexShrink'];
    const widthProperties: WidthProperties = {};
    widthPropertiesOptions.forEach(property => {
      widthProperties[property] =
        columnMetadata &&
        columnMetadata[key] !== undefined &&
        columnMetadata[key][property] !== undefined
          ? columnMetadata[key][property]
          : DEFAULT_WIDTH_PROPERTIES[property];
    });

    const isLeftmost = idx === 0;
    const isRightmost = idx === keys.length - 1;

    return (
      <Column
        dataKey={key}
        key={key}
        label={key}
        width={widthProperties.width}
        flexGrow={widthProperties.flexGrow}
        flexShrink={widthProperties.flexShrink}
        maxWidth={widthProperties.maxWidth}
        minWidth={widthProperties.minWidth}
        cellRenderer={renderCell(key, isLeftmost)}
        {...css(
          styles && styles.column,
          showColumnDividers && !isRightmost && styles && styles.column_divider,
        )}
      />
    );
  });
}
