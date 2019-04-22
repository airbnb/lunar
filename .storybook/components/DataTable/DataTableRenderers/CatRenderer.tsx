import React from 'react';

import Emoji from '../../../../packages/core/src/components/Emoji';
import CountBadge from '../../../../packages/core/src/components/CountBadge';
import { TableRow, RendererProps } from '../../../../packages/core/src/components/DataTable/types';

type CatRendererProps = {
  row: RendererProps['row'];
  key: RendererProps['key'];
  editMode: RendererProps['editMode'];
  onEdit: RendererProps['onEdit'];
};
class CatRenderer extends React.Component<CatRendererProps> {
  state = {
    hovered: false,
  };

  renderCounter() {
    const { row, key, onEdit } = this.props;

    return (
      <IncrementableBadge
        value={row.rowData.data.cats}
        row={row}
        colKey="cats"
        onChange={onEdit(row, 'cats')}
      />
    );
  }

  renderCats() {
    const { row } = this.props;
    const num = row.rowData.data.cats ? row.rowData.data.cats : 0;

    return new Array(num).fill(0).map((x, i) => <Emoji key={i} unicode="🐱" />);
  }

  renderContent() {
    return this.state.hovered || this.props.editMode ? this.renderCounter() : this.renderCats();
  }

  render() {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
        }}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        {this.renderContent()}
      </div>
    );
  }
}

export default function catRenderer({ row, key, editMode, onEdit }: CatRendererProps) {
  return <CatRenderer row={row} key={key} editMode={editMode} onEdit={onEdit} />;
}

type IncrementableBadgeProps = {
  row: TableRow;
  colKey: string;
  onChange: (newCount: number, event: React.SyntheticEvent<EventTarget>) => void;
  value?: number;
};

export class IncrementableBadge extends React.Component<IncrementableBadgeProps> {
  state = {
    count: this.props.value || 1,
  };

  private handleClick = (event: React.SyntheticEvent<EventTarget>) => {
    event.stopPropagation();
    const { count } = this.state;
    const { onChange } = this.props;

    const newCount = Math.min(count + 1, 4);

    onChange(newCount, event);

    this.setState({
      count: newCount,
    });
  };

  render() {
    return (
      <div role="button" tabIndex={0} onKeyPress={this.handleClick} onClick={this.handleClick}>
        <CountBadge
          accessibilityLabel={`${this.state.count} unread messages`}
          value={this.state.count}
        />
      </div>
    );
  }
}
