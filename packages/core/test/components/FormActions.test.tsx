import React from 'react';
import { shallow } from 'enzyme';
import FormActions from '../../src/components/FormActions';
import Button from '../../src/components/Button';
import DangerButton from '../../src/components/DangerButton';
import MutedButton from '../../src/components/MutedButton';

describe('<FormField />', () => {
  it('renders 2 buttons', () => {
    const wrapper = shallow(<FormActions />).dive();

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(MutedButton)).toHaveLength(1);
    expect(wrapper.find(Button).prop('type')).toBe('submit');
    expect(wrapper.find(MutedButton).prop('inverted')).toBe(true);
  });

  it('renders 3 buttons with reset', () => {
    const wrapper = shallow(<FormActions showReset />).dive();

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(MutedButton)).toHaveLength(2);
  });

  it('renders a danger button', () => {
    const wrapper = shallow(<FormActions danger />).dive();

    expect(wrapper.find(Button)).toHaveLength(0);
    expect(wrapper.find(DangerButton)).toHaveLength(1);
  });

  it('can change button text', () => {
    const wrapper = shallow(<FormActions cancelText="Close" continueText="Send" />).dive();

    expect(wrapper.find(Button).prop('children')).toBe('Send');
    expect(wrapper.find(MutedButton).prop('children')).toBe('Close');
  });

  it('can hide cancel button', () => {
    const wrapper = shallow(<FormActions hideCancel />).dive();

    expect(wrapper.find(MutedButton)).toHaveLength(0);
  });

  it('triggers `onContinue` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FormActions onContinue={spy} />).dive();

    wrapper.find(Button).simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('triggers `onCancel` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FormActions onCancel={spy} />).dive();

    wrapper.find(MutedButton).simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('disables button when disabled', () => {
    const wrapper = shallow(<FormActions disabled />).dive();

    expect(wrapper.find(Button).prop('disabled')).toBe(true);
  });

  it('disables buttons while processing', () => {
    const wrapper = shallow(<FormActions processing showReset />).dive();

    // loading disables the button, so we test for loading or disabled
    wrapper
      .find(Button)
      .forEach(button => expect(button.prop('disabled') || button.prop('loading')).toBeTruthy());
  });

  it('shows processing text while processing', () => {
    const wrapper = shallow(<FormActions processing processingText="Sending" />).dive();

    expect(wrapper.find(Button).prop('children')).toBe('Sending');
  });

  it('has small buttons when small', () => {
    const wrapper = shallow(<FormActions showReset small />).dive();

    wrapper.find(Button).forEach(button => expect(button.prop('small')).toBeTruthy());
  });

  it('does not habe small buttons when not small', () => {
    const wrapper = shallow(<FormActions showReset />).dive();

    wrapper.find(Button).forEach(button => expect(button.prop('small')).toBeFalsy());
  });
});
