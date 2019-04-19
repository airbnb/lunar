import React from 'react';
import { Column } from 'react-virtualized';
import DefaultContentRenderer from '../defaultContentRenderers';
import Spacing from '../../Spacing';
import { css, WithStylesProps } from '../../../composers/withStyles';
import {
  ColumnMetadata,
  DataTableProps,
  TableRow,
  HandleEdit,
  HeightOptions,
  WidthProperties,
  RendererProps,
} from '../types';
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

export default function DataColumns(
  keys: string[],
  editMode: boolean,
  handleEdit: HandleEdit,
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
    const renderer = renderers && renderers[key];

    const indentSize = !expandable || !isLeftmost ? 2 : 2.5;
    const spacing = isChild || !((expandable || selectable) && isLeftmost) ? indentSize : 0;

    const rendererArguments: RendererProps = {
      row,
      key,
      editMode,
      handleEdit,
      zebra: zebra || false,
      theme,
    };

    if (metadata && metadata.colspanKey && renderers) {
      if (isLeftmost) {
        const colspanRenderer = renderers[metadata.colspanKey];
        if (colspanRenderer) {
          return colspanRenderer(rendererArguments);
        }
      }
    }

    const contents: NonNullable<React.ReactNode> = renderer
      ? renderer(rendererArguments)
      : DefaultContentRenderer(rendererArguments);

    return (
      <div {...css(styles && styles.row)}>
        <div {...css(styles && styles.row_inner)}>
          <Spacing left={spacing} right={2}>
            {contents}
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
        {...css(styles && styles.column, showColumnDividers && !isRightmost && styles && styles.column_divider)}
      />
    );
  });
}
