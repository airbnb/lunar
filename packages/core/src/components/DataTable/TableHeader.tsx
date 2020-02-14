import React from 'react';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';
import T from '../Translate';
import { HeaderButton, SelectedRows } from './types';
import { styleSheetTableHeader } from './styles';
import useStyles, { StyleSheet } from '../../hooks/useStyles';

export type TableHeaderProps = {
  /** Specifies whether or not editMode can be enabled */
  editable?: boolean;
  /** Determines which set of header buttons to render. */
  editMode: boolean;
  /** Height of the TableHeader, falls back to RowHeight if not specified. */
  height: number;
  /** If instantEdit is disabled, header will render Cancel and Apply buttons during edit mode. */
  instantEdit: boolean;
  /** Label to display in the top left side. */
  tableHeaderLabel?: string;
  /** Width of the header. */
  width: number;
  /** Callback for toggling editMode. */
  onEnableEditMode: () => void;
  /** Callback for toggling editMode. */
  onDisableEditMode: () => void;
  /** Applies edits if instantEdit is disabled. */
  onEnactEdits: () => void;
  /** Extra buttons to render in the header. */
  extraHeaderButtons?: HeaderButton[];
  /** Selected status of all rows, can by used by header buttons. */
  selectedRows: SelectedRows;
  /** Custom style sheet. */
  styleSheet?: StyleSheet;
};

/** Header for the DataTable that displays a title and Table-level buttons. */
export default function TableHeader({
  editable,
  editMode,
  extraHeaderButtons,
  height,
  instantEdit,
  onEnactEdits,
  onEnableEditMode,
  onDisableEditMode,
  selectedRows,
  tableHeaderLabel,
  width,
  styleSheet,
}: TableHeaderProps) {
  const [styles, cx] = useStyles(styleSheet ?? styleSheetTableHeader);
  const extraEditButtons = extraHeaderButtons!.map(
    (btnConfig: HeaderButton) =>
      btnConfig.displayEditMode && (
        <Button
          key={btnConfig.label}
          small
          inverted
          onClick={btnConfig.onClick && btnConfig.onClick(selectedRows)}
        >
          {btnConfig.label}
        </Button>
      ),
  );

  const extraNonEditButtons = extraHeaderButtons!.map(
    (btnConfig: HeaderButton) =>
      btnConfig.display && (
        <Button
          key={btnConfig.label}
          small
          inverted
          onClick={btnConfig.onClick && btnConfig.onClick(selectedRows)}
        >
          {btnConfig.label}
        </Button>
      ),
  );

  const extraButtons = editMode ? extraEditButtons : extraNonEditButtons;

  const editModeButtons = instantEdit ? (
    <Button key="Done" small onClick={onDisableEditMode}>
      <T k="lunar.common.done" phrase="Done" />
    </Button>
  ) : (
    [
      <Button key="Cancel" small inverted onClick={onDisableEditMode}>
        <T k="lunar.common.cancel" phrase="Cancel" />
      </Button>,
      <Button key="Apply" small onClick={onEnactEdits}>
        <T k="lunar.common.apply" phrase="Apply" />
      </Button>,
    ]
  );

  const modeButtons = editMode ? (
    editModeButtons
  ) : (
    <Button inverted small onClick={onEnableEditMode}>
      <T k="lunar.common.edit" phrase="Edit" />
    </Button>
  );

  const headerButtons =
    extraHeaderButtons!.length > -1 || editable ? (
      <ButtonGroup>
        {extraButtons}
        {editable && modeButtons}
      </ButtonGroup>
    ) : null;

  const dimensionStyles: React.CSSProperties = {
    width,
    height,
  };

  const label = <Text bold>{tableHeaderLabel}</Text>;

  return (
    <div style={dimensionStyles}>
      <div className={cx(styles.tableHeader_inner)}>
        {label}
        {headerButtons}
      </div>
    </div>
  );
}
