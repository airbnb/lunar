import React from 'react';
import Emoji from '@airbnb/lunar/src/components/Emoji';
import CountBadge from '@airbnb/lunar/src/components/CountBadge';

class InnerCatRenderer extends React.Component {
  state = {
    hovered: false,
  };

  renderCounter() {
    const { row } = this.props;

    return <IncrementableBadge value={row.rowData.data.cats} row={row} colKey="cats" />;
  }

  renderCats() {
    const { row } = this.props;
    const num = row.rowData.data.cats ? row.rowData.data.cats : 0;

    return new Array(num).fill(0).map((x, i) => <Emoji key={i} unicode="🐱" />);
  }

  renderContent() {
    return this.state.hovered ? this.renderCounter() : this.renderCats();
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

export default function CatRenderer({ row, keyName }) {
  return <InnerCatRenderer row={row} key={keyName} />;
}

export class IncrementableBadge extends React.Component {
  state = {
    count: this.props.value || 1,
  };

  handleClick = event => {
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
