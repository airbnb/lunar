import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import RadioButton, { Props, State } from '../../src/components/RadioButton';
import FormField from '../../src/components/FormField';
import BaseRadioButton from '../../src/components/private/BaseRadioButton';
import Text from '../../src/components/Text';

describe('<RadioButton />', () => {
  it('renders a field and input', () => {
    const wrapper = shallow(
      <RadioButton name="foo" label="Label" value="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseRadioButton)).toHaveLength(1);
  });

  it('renders field inline', () => {
    const wrapper = shallow(
      <RadioButton name="foo" label="Label" value="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(FormField).prop('inline')).toBe(true);
    expect(wrapper.find(FormField).prop('renderBeforeLabel')).toBe(true);
  });

  it('renders field with stretchLabel', () => {
    const wrapper = shallow(
      <RadioButton name="foo" label="Label" value="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(FormField).prop('stretchLabel')).toBe(true);
  });

  it('it generates a unique ID', () => {
    const wrapper = shallow(
      <RadioButton name="foo" label="Label" value="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(BaseRadioButton).prop('id'));
  });

  it('can set checked', () => {
    const wrapper = shallow(
      <RadioButton name="foo" label="Label" value="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(BaseRadioButton).prop('checked')).toBe(false);

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find(BaseRadioButton).prop('checked')).toBe(true);
  });

  it('can set indeterminate', () => {
    const wrapper = shallow(
      <RadioButton name="foo" label="Label" value="foo" onChange={() => {}} />,
    );

    expect(wrapper.find(BaseRadioButton).prop('indeterminate')).toBe(false);

    wrapper.setProps({
      indeterminate: true,
    });

    expect(wrapper.find(BaseRadioButton).prop('indeterminate')).toBe(true);
  });

  describe('button mode', () => {
    let wrapper: Enzyme.ShallowWrapper<Props, State>;

    beforeEach(() => {
      wrapper = shallow(
        <RadioButton
          button
          name="foo"
          label="Label"
          labelDescription="Label description"
          value="foo"
          onChange={() => {}}
        />,
      );
    });

    it('renders in button mode', () => {
      expect(wrapper.find(BaseRadioButton).prop('button')).toBe(true);
    });

    it('renders a Text for label and labelDescription', () => {
      const texts = wrapper.find(Text);

      expect(texts).toHaveLength(2);
      expect(texts.at(0).prop('children')).toBe('Label');
      expect(texts.at(1).prop('children')).toBe('Label description');
    });
  });
});
