import React from 'react';
import Input from '@airbnb/lunar/src/components/Input';
import Text from '@airbnb/lunar/src/components/Text';

const onClick = e => e.stopPropagation();

class InnerEditableTextRenderer extends React.Component {
  state = {
    value: this.props.value,
  };

  onEdit = (newVal, event) => {
    const { onEdit, row, keyName } = this.props;

    onEdit(row, keyName, newVal, event);

    this.setState({
      value: newVal,
    });
  };

  render() {
    const { editMode } = this.props;
    const { value } = this.state;

    return editMode ? (
      <Input
        hideLabel
        label="Edit row"
        name=""
        value={value}
        onChange={this.onEdit}
        onClick={onClick}
      />
    ) : (
      <Text>{value}</Text>
    );
  }
}

export default function EditableTextRenderer({ row, keyName, editMode, onEdit }) {
  return (
    <InnerEditableTextRenderer
      editMode={editMode}
      onEdit={onEdit}
      value={row.rowData.data[keyName]}
    />
  );
}
