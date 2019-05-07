import React from 'react';
import withStyles, { css, WithStylesProps } from '../../composers/withStyles';
import Button from '../Button';
import ButtonGroup from '../ButtonGroup';
import Text from '../Text';
import Translate from '../Translate';
import { HeaderButton, SelectedRows } from './types';

export type Props = {
  /** Specifies whether or not editMode can be enabled */
  editable?: boolean;
  /** Determines which set of header buttons to render. */
  editMode: boolean;
  /** Without instantEdit the header renders Cancel and Apply, otherwise it just renders Done. */
  instantEdit?: boolean;
  /** Height of the TableHeader, falls back to RowHeight if not specified. */
  height: number;
  /** Label to display in the top left side. */
  tableHeaderLabel?: string;
  /** Width of the header. */
  width: number;
  /** Callback for toggling editMode. */
  onEnableEditMode: () => void;
  /** Callback for toggling editMode. */
  onDisableEditMode: () => void;
  /** Undos edits if instantEdit is disabled. */
  onCancelEditMode: () => void;
  /** Applys edits if instantEdit is enabled. */
  onEnactEdits: () => void;
  /** Extra buttons to render in the header. */
  extraHeaderButtons?: HeaderButton[];
  /** Selected status of all rows, can by used by header buttons. */
  selectedRows: SelectedRows;
};

/** Header for the DataTable that displays a title and Table-level buttons. */
export function TableHeader({
  editable,
  editMode,
  extraHeaderButtons,
  height,
  onEnableEditMode,
  onDisableEditMode,
  onCancelEditMode,
  onEnactEdits,
  instantEdit,
  selectedRows,
  styles,
  tableHeaderLabel,
  width,
}: Props & WithStylesProps) {
  const extraEditButtons = extraHeaderButtons!.map(
    (btnConfig: HeaderButton) =>
      btnConfig.displayEditMode && (
        <Button
          small
          inverted
          onClick={btnConfig.onClick && btnConfig.onClick(selectedRows)}
          key={btnConfig.label}
        >
          {btnConfig.label}
        </Button>
      ),
  );

  const extraNonEditButtons = extraHeaderButtons!.map(
    (btnConfig: HeaderButton) =>
      btnConfig.display && (
        <Button
          small
          inverted
          onClick={btnConfig.onClick && btnConfig.onClick(selectedRows)}
          key={btnConfig.label}
        >
          {btnConfig.label}
        </Button>
      ),
  );

  const extraButtons = editMode ? extraEditButtons : extraNonEditButtons;

  const editModeButtons = instantEdit
    ? [
        <Button small onClick={onDisableEditMode} key="Done">
          <Translate phrase="Done" context="This button exits edit mode." />
        </Button>,
      ]
    : [
        <Button small inverted onClick={onCancelEditMode} key="Cancel">
          <Translate
            phrase="Cancel"
            context="This button cancels out of edit mode without applying changes."
          />
        </Button>,
        <Button small onClick={onEnactEdits} key="Apply">
          <Translate phrase="Apply" context="This button applies all live edits." />
        </Button>,
      ];

  const modeButtons = editMode ? (
    editModeButtons
  ) : (
    <Button inverted small onClick={onEnableEditMode}>
      <Translate phrase="Edit" context="This button enables edit mode." />
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
      <div {...css(styles.tableHeader_inner)}>
        {label}
        {headerButtons}
      </div>
    </div>
  );
}

export default withStyles(theme => ({
  tableHeader_inner: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    marginLeft: 2 * theme!.unit,
    marginRight: 2 * theme!.unit,
  },
}))(TableHeader);
