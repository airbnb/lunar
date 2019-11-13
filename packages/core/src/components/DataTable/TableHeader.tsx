import React from 'react';
import withStyles, { WithStylesProps } from '../../composers/withStyles';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';
import Translate from '../Translate';
import { HeaderButton, SelectedRows } from './types';
import { styleSheetTableHeader as styleSheet } from './styles';

export type Props = {
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
};

/** Header for the DataTable that displays a title and Table-level buttons. */
export function TableHeader({
  cx,
  editable,
  editMode,
  extraHeaderButtons,
  height,
  instantEdit,
  onEnactEdits,
  onEnableEditMode,
  onDisableEditMode,
  selectedRows,
  styles,
  tableHeaderLabel,
  width,
}: Props & WithStylesProps) {
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
      <Translate k="lunar.common.done" phrase="Done" context="This button exits edit mode." />
    </Button>
  ) : (
    [
      <Button key="Cancel" small inverted onClick={onDisableEditMode}>
        <Translate
          k="lunar.common.cancel"
          phrase="Cancel"
          context="This button cancels out of edit mode without applying changes."
        />
      </Button>,
      <Button key="Apply" small onClick={onEnactEdits}>
        <Translate
          k="lunar.common.apply"
          phrase="Apply"
          context="This button applies all live edits."
        />
      </Button>,
    ]
  );

  const modeButtons = editMode ? (
    editModeButtons
  ) : (
    <Button inverted small onClick={onEnableEditMode}>
      <Translate k="lunar.common.edit" phrase="Edit" context="This button enables edit mode." />
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

export default withStyles(styleSheet)(TableHeader);
