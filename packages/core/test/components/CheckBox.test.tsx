import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import CheckBox, { Props, State } from '../../src/components/CheckBox';
import FormField from '../../src/components/FormField';
import BaseCheckBox from '../../src/components/private/BaseCheckBox';
import Text from '../../src/components/Text';

describe('<CheckBox />', () => {
  it('renders a field and input', () => {
    const wrapper = shallow(<CheckBox name="foo" label="Label" value="1" onChange={() => {}} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseCheckBox)).toHaveLength(1);
  });

  it('renders field inline', () => {
    const wrapper = shallow(<CheckBox name="foo" label="Label" value="1" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('inline')).toBe(true);
    expect(wrapper.find(FormField).prop('renderBeforeLabel')).toBe(true);
  });

  it('renders field with stretchLabel', () => {
    const wrapper = shallow(<CheckBox name="foo" label="Label" value="1" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('stretchLabel')).toBe(true);
  });

  it('it generates a unique ID', () => {
    const wrapper = shallow(<CheckBox name="foo" label="Label" value="1" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(BaseCheckBox).prop('id'));
  });

  it('can set checked', () => {
    const wrapper = shallow(<CheckBox name="foo" label="Label" value="1" onChange={() => {}} />);

    expect(wrapper.find(BaseCheckBox).prop('checked')).toBe(false);

    wrapper.setProps({
      checked: true,
    });

    expect(wrapper.find(BaseCheckBox).prop('checked')).toBe(true);
  });

  it('can set indeterminate', () => {
    const wrapper = shallow(<CheckBox name="foo" label="Label" value="1" onChange={() => {}} />);

    expect(wrapper.find(BaseCheckBox).prop('indeterminate')).toBe(false);

    wrapper.setProps({
      indeterminate: true,
    });

    expect(wrapper.find(BaseCheckBox).prop('indeterminate')).toBe(true);
  });

  describe('button mode', () => {
    let wrapper: Enzyme.ShallowWrapper<Props, State>;

    beforeEach(() => {
      wrapper = shallow(
        <CheckBox
          button
          name="foo"
          label="Label"
          labelDescription="Label description"
          value="1"
          onChange={() => {}}
        />,
      );
    });

    it('renders in button mode', () => {
      expect(wrapper.find(BaseCheckBox).prop('button')).toBe(true);
    });

    it('renders a Text for label and labelDescription', () => {
      const texts = wrapper.find(Text);

      expect(texts).toHaveLength(2);
      expect(texts.at(0).prop('children')).toBe('Label');
      expect(texts.at(1).prop('children')).toBe('Label description');
    });
  });
});
