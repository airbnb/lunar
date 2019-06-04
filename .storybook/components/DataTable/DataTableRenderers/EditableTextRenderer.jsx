import React from 'react';
import Input from '@airbnb/lunar/src/components/Input';
import Text from '@airbnb/lunar/src/components/Text';

const onClick = e => e.stopPropagation();

class EditableTextRenderer extends React.Component {
  state = {
    value: this.props.value,
  };

  onEdit = (row, key) => (newVal, event) => {
    const { onEdit } = this.props;
    onEdit(row, key, newVal, event);

    this.setState({
      value: newVal,
    });
  };

  render() {
    const { editMode, row, key } = this.props;
    const { value } = this.state;

    return editMode ? (
      <Input
        hideLabel
        label="Edit row"
        name=""
        value={value}
        onChange={this.onEdit(row, key)}
        onClick={onClick}
      />
    ) : (
      <Text>{value}</Text>
    );
  }
}

export default function editableTextRenderer({ row, key, editMode, onEdit }) {
  return <EditableTextRenderer editMode={editMode} onEdit={onEdit} value={row.rowData.data[key]} />;
}
