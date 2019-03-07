import React from 'react';
import { shallow } from 'enzyme';
import FormActions from '../../src/components/FormActions';
import Button from '../../src/components/Button';

describe('<FormField />', () => {
  it('renders 2 buttons', () => {
    const wrapper = shallow(<FormActions />).dive();

    expect(wrapper.find(Button)).toHaveLength(2);
    expect(
      wrapper
        .find(Button)
        .at(0)
        .prop('type'),
    ).toBe('submit');
    expect(
      wrapper
        .find(Button)
        .at(1)
        .prop('inverted'),
    ).toBe(true);
  });

  it('renders 3 buttons with reset', () => {
    const wrapper = shallow(<FormActions showReset />).dive();

    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it('can change button text', () => {
    const wrapper = shallow(<FormActions cancelText="Close" continueText="Send" />).dive();

    expect(
      wrapper
        .find(Button)
        .at(0)
        .prop('children'),
    ).toBe('Send');
    expect(
      wrapper
        .find(Button)
        .at(1)
        .prop('children'),
    ).toBe('Close');
  });

  it('can hide cancel button', () => {
    const wrapper = shallow(<FormActions hideCancel />).dive();

    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('triggers `onContinue` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FormActions onContinue={spy} />).dive();

    wrapper
      .find(Button)
      .at(0)
      .simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('triggers `onCancel` when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FormActions onCancel={spy} />).dive();

    wrapper
      .find(Button)
      .at(1)
      .simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  it('disables button when disabled', () => {
    const wrapper = shallow(<FormActions disabled />).dive();

    expect(
      wrapper
        .find(Button)
        .at(0)
        .prop('disabled'),
    ).toBe(true);
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

    expect(
      wrapper
        .find(Button)
        .at(0)
        .prop('children'),
    ).toBe('Sending');
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
