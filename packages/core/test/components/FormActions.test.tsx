import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import FormActions from '../../src/components/FormActions';
import Button from '../../src/components/Button';
import DangerButton from '../../src/components/DangerButton';
import MutedButton from '../../src/components/MutedButton';

describe('<FormActions />', () => {
  it('renders 2 buttons', () => {
    const wrapper = shallowWithStyles(<FormActions />);

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(MutedButton)).toHaveLength(1);
    expect(wrapper.find(Button).prop('type')).toBe('submit');
    expect(wrapper.find(MutedButton).prop('inverted')).toBe(true);
  });

  it('renders 3 buttons with reset', () => {
    const wrapper = shallowWithStyles(<FormActions showReset />);

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(MutedButton)).toHaveLength(2);
  });

  it('renders a danger button', () => {
    const wrapper = shallowWithStyles(<FormActions danger />);

    expect(wrapper.find(Button)).toHaveLength(0);
    expect(wrapper.find(DangerButton)).toHaveLength(1);
  });

  it('can change button text', () => {
    const wrapper = shallowWithStyles(<FormActions cancelText="Close" continueText="Send" />);

    expect(wrapper.find(Button).prop('children')).toBe('Send');
    expect(wrapper.find(MutedButton).prop('children')).toBe('Close');
  });

  it('can hide cancel button', () => {
    const wrapper = shallowWithStyles(<FormActions hideCancel />);

    expect(wrapper.find(MutedButton)).toHaveLength(0);
  });

  it('triggers `onContinue` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<FormActions onContinue={spy} />);

    wrapper.find(Button).simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('triggers `onCancel` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallowWithStyles(<FormActions onCancel={spy} />);

    wrapper.find(MutedButton).simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('disables button when disabled', () => {
    const wrapper = shallowWithStyles(<FormActions disabled />);

    expect(wrapper.find(Button).prop('disabled')).toBe(true);
  });

  it('disables buttons while processing', () => {
    const wrapper = shallowWithStyles(<FormActions processing showReset />);

    // loading disables the button, so we test for loading or disabled
    wrapper
      .find(Button)
      .forEach((button) => expect(button.prop('disabled') || button.prop('loading')).toBeTruthy());
  });

  it('shows processing text while processing', () => {
    const wrapper = shallowWithStyles(<FormActions processing processingText="Sending" />);

    expect(wrapper.find(Button).prop('children')).toBe('Sending');
  });

  it('has small buttons when small', () => {
    const wrapper = shallowWithStyles(<FormActions showReset small />);

    wrapper.find(Button).forEach((button) => expect(button.prop('small')).toBeTruthy());
  });

  it('does not habe small buttons when not small', () => {
    const wrapper = shallowWithStyles(<FormActions showReset />);

    wrapper.find(Button).forEach((button) => expect(button.prop('small')).toBeFalsy());
  });

  it('renders buttons with block', () => {
    const wrapper = shallowWithStyles(<FormActions block />);

    expect(wrapper.find(Button).prop('block')).toBe(true);
  });
});
