import React from 'react';
import shallowEqual from 'shallowequal';
import { Omit } from 'utility-types';
import Autocomplete, {
  Props as AutocompleteProps,
  Item as AutocompleteItem,
} from '../Autocomplete';
import Spacing from '../Spacing';
import Chip from './private/Chip';

export type Item = AutocompleteItem;

export type Props<T extends Item> = Omit<
  AutocompleteProps<T>,
  'children' | 'isItemSelected' | 'onChange' | 'value'
> & {
  /** Callback that is triggered when an item is selected. */
  onChange: (values: string[], event: React.SyntheticEvent<any>) => void;
  /** Default selected values. */
  value?: string[];
};

export type State = {
  values: Set<string>;
};

/** An uncontrolled input field for selecting multiple values via an autocomplete. */
export default class Multicomplete<T extends Item> extends React.Component<Props<T>, State> {
  static defaultProps = {
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

  private handleChange = (value: string, event: React.SyntheticEvent<any>) => {
    this.props.onChange(Array.from(this.state.values), event);
  };

  private handleSelectItem = (value: string, item: T | null, event?: React.SyntheticEvent<any>) => {
    if (this.props.onSelectItem) {
      this.props.onSelectItem(value, item, event);
    }

    if (!value || !item) {
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

  private handleChipClick = (value: string, event: React.MouseEvent<any>) => {
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

  render() {
    const { onChange, ...props } = this.props;
    const selected = Array.from(this.state.values);

    return (
      <Autocomplete<T>
        clearOnSelect
        {...props}
        onChange={this.handleChange}
        onSelectItem={this.handleSelectItem}
        isItemSelected={this.isItemSelected}
        value=""
      >
        {selected.length > 0 && (
          <div>
            {selected.map(item => (
              <Spacing inline key={item} right={1} top={1}>
                <Chip value={item} onClick={this.handleChipClick} />
              </Spacing>
            ))}
          </div>
        )}
      </Autocomplete>
    );
  }
}
