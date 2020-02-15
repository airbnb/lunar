import React from 'react';
import shallowEqual from 'shallowequal';
import Autocomplete, {
  Props as AutocompleteProps,
  Item as AutocompleteItem,
} from '../Autocomplete';
import Spacing from '../Spacing';
import Chip from './private/Chip';

export type Item = AutocompleteItem;

type onRemove = (value: string, event: React.MouseEvent<HTMLElement>) => void;

function renderChip(value: string, onRemove: onRemove): NonNullable<React.ReactNode> {
  return (
    <Spacing inline right={1} top={1}>
      <Chip value={value} onClick={onRemove} />
    </Spacing>
  );
}

export type Props<T extends Item = Item> = Omit<
  AutocompleteProps<T>,
  'children' | 'isItemSelected' | 'onChange' | 'value'
> & {
  /** Callback that is triggered when an item is selected. */
  onChange: (values: string[], event: React.SyntheticEvent<HTMLElement>) => void;
  /** Render custom selected item, instead of a Chip. */
  renderChip?: (value: string, onRemove: onRemove) => NonNullable<React.ReactNode>;
  /** Default selected values. */
  value?: string[];
};

export type State = {
  values: Set<string>;
};

/** An uncontrolled input field for selecting multiple values via an autocomplete. */
export default class Multicomplete<T extends Item = Item> extends React.Component<Props<T>, State> {
  static defaultProps = {
    renderChip,
    value: [],
  };

  state = {
    values: new Set(this.props.value),
  };

  componentDidUpdate(prevProps: Props<T>) {
    if (!shallowEqual(this.props.value, prevProps.value!)) {
      this.setState({
        values: new Set(this.props.value),
      });
    }
  }

  private isItemSelected = (item: T, value: string) => this.state.values.has(value);

  private handleChange = (value: string, event: React.SyntheticEvent<HTMLElement>) => {
    this.props.onChange(Array.from(this.state.values), event);
  };

  private handleSelectItem = (
    value: string,
    item: T | null,
    event?: React.SyntheticEvent<HTMLElement>,
  ) => {
    if (this.props.onSelectItem) {
      this.props.onSelectItem(value, item, event);
    }

    if (!value || (!item && !this.props.selectUnknownOnEnter)) {
      return;
    }

    this.setState(
      prevState => ({
        values: new Set(prevState.values).add(value),
      }),
      () => {
        this.props.onChange(Array.from(this.state.values), event!);
      },
    );
  };

  private handleChipClick = (value: string, event: React.MouseEvent<HTMLElement>) => {
    this.setState(
      prevState => {
        const values = new Set(prevState.values);

        values.delete(value);

        return {
          values,
        };
      },
      () => {
        this.props.onChange(Array.from(this.state.values), event);
      },
    );
  };

  private renderChip = (value: string, onRemove: onRemove) => {
    return this.props.renderChip!(value, onRemove);
  };

  render() {
    const { onChange, ...props } = this.props;
    const selected = Array.from(this.state.values);

    return (
      <Autocomplete<T>
        clearOnSelect
        {...props}
        isItemSelected={this.isItemSelected}
        value=""
        onChange={this.handleChange}
        onSelectItem={this.handleSelectItem}
      >
        {selected.length > 0 && (
          <div>
            {selected.map(value => (
              <React.Fragment key={value}>
                {this.renderChip(value, this.handleChipClick)}
              </React.Fragment>
            ))}
          </div>
        )}
      </Autocomplete>
    );
  }
}
