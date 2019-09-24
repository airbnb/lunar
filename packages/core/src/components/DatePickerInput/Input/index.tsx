import React from 'react';
import { DayModifiers, DayPickerInputProps } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import FormInput from '../../private/FormInput';
import Dropdown, { Props as DropdownProps } from '../../Dropdown';
import DatePicker from '../../DatePicker';

// The original `DayPickerInput` has very restrictive and problematic
// markup being rendered, that doesn't interop with our form layer very well.
// Since we can't hook into it using render props, we need to extend
// the component and override the render methods.
export default class PrivatePickerInput extends DayPickerInput {
  // @ts-ignore
  props: DayPickerInputProps & {
    dropdownProps?: Partial<DropdownProps>;
  };

  daypicker: unknown = null;

  input: HTMLInputElement | null = null;

  updateState?(day: Date, value: string, callback: unknown): void;

  hideAfterDayClick?(): void;

  handleDayClick?(day: Date, DayModifiers: DayModifiers, event: React.MouseEvent): void;

  handleMonthChange?(month: Date): void;

  handleInputChange?(event: React.ChangeEvent<HTMLInputElement>): void;

  handleInputClick?(event: React.MouseEvent<HTMLInputElement>): void;

  handleInputFocus?(event: React.FocusEvent<HTMLInputElement>): void;

  handleInputBlur?(event: React.FocusEvent<HTMLInputElement>): void;

  handleInputKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;

  handleInputKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;

  handleOverlayBlur?(): void;

  handleOverlayFocus?(): void;

  private loadInputRef = (ref: HTMLInputElement | null) => {
    // @ts-ignore Ignore typings
    const { propagateRef } = this.props.inputProps;

    this.input = ref;

    if (propagateRef) {
      propagateRef.current = ref;
    }
  };

  private loadPickerRef = (ref: unknown) => {
    this.daypicker = ref;
  };

  private handleResetClick = () => {
    // @ts-ignore Ignore typings
    this.updateState(new Date(), '', this.hideAfterDayClick);
  };

  private handleTodayButtonClick = () => {
    // @ts-ignore Ignore typings
    this.updateState(new Date(), this.props.formatDate(new Date()), this.hideAfterDayClick);
  };

  renderOverlay = () => {
    const { dayPickerProps = {}, dropdownProps = {} } = this.props;
    const { selectedDays, value } = this.state;
    let selectedDay;

    if (!selectedDays && value) {
      // @ts-ignore Ignore typings
      const day = this.props.parseDate(value);

      if (day) {
        selectedDay = day;
      }
    } else if (selectedDays) {
      selectedDay = selectedDays;
    }

    return (
      <Dropdown
        top="100%"
        tabIndex={0}
        zIndex={100}
        {...dropdownProps}
        onFocus={this.handleOverlayFocus}
        onBlur={this.handleOverlayBlur}
      >
        <DatePicker
          {...dayPickerProps}
          month={this.state.month}
          selectedDays={selectedDay}
          pickerRef={this.loadPickerRef}
          onDayClick={this.handleDayClick}
          onMonthChange={this.handleMonthChange}
          onResetClick={this.handleResetClick}
          onTodayButtonClick={this.handleTodayButtonClick}
        />
      </Dropdown>
    );
  };

  render() {
    const { inputProps } = this.props;

    return (
      <>
        <FormInput
          type="text"
          tagName="input"
          placeholder={this.props.placeholder}
          {...inputProps}
          value={this.state.typedValue || this.state.value}
          propagateRef={this.loadInputRef}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
          onKeyUp={this.handleInputKeyUp}
          onClick={this.handleInputClick}
        />

        {this.state.showOverlay && this.renderOverlay()}
      </>
    );
  }
}
