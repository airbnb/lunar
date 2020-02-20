import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../../src/components/TextArea';
import Proofreader from '../../src/components/Proofreader';
import FormField from '../../src/components/FormField';
import BaseTextArea from '../../src/components/private/BaseTextArea';

describe('<TextArea />', () => {
  it('renders a field and input', () => {
    const wrapper = shallow(<TextArea name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(BaseTextArea)).toHaveLength(1);
  });

  it('generates a unique ID', () => {
    const wrapper = shallow(<TextArea name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(BaseTextArea).prop('id'));
  });

  it('can set `noTranslate`', () => {
    const wrapper = shallow(<TextArea noTranslate name="foo" label="Label" onChange={() => {}} />);

    expect(wrapper.find(BaseTextArea).prop('noTranslate')).toBe(true);
  });

  it('can set max length', () => {
    const wrapper = shallow(
      <TextArea name="foo" label="Label" maxLength={255} onChange={() => {}} />,
    );

    expect(wrapper.find(BaseTextArea).prop('maxLength')).toBe(255);
  });

  it('can set rows', () => {
    const wrapper = shallow(<TextArea name="foo" label="Label" rows={5} onChange={() => {}} />);

    expect(wrapper.find(BaseTextArea).prop('rows')).toBe(5);
  });

  it('renders a proofreader', () => {
    const wrapper = shallow(
      <TextArea
        proofread
        name="foo"
        label="Label"
        rows={5}
        locale="ja"
        proofreadProps={{ isRuleHighlighted: () => false, isRuleSecondary: () => false }}
        onChange={() => {}}
        onCheckText={() => Promise.resolve({ proofread: { matches: [] } })}
      />,
    );

    expect(wrapper.find(Proofreader)).toHaveLength(1);
    expect(wrapper.find(Proofreader).props()).toEqual(
      expect.objectContaining({
        name: 'foo',
        id: expect.anything(),
        disabled: false,
        invalid: false,
        optional: false,
      }),
    );
  });

  it('sets a label description when max length is used', () => {
    const wrapper = shallow(
      <TextArea
        name="foo"
        label="Label"
        rows={5}
        maxLength={1000}
        value="Hello"
        onChange={() => {}}
      />,
    );

    expect(wrapper.find(BaseTextArea).prop('maxLength')).toBe(1000);
    expect((wrapper.find(FormField).prop('labelDescription') as React.ReactElement).props).toEqual({
      k: 'lunar.form.charsUsed',
      phrase: '%{current}/%{max} characters used',
      current: '5',
      max: '1,000',
    });

    wrapper.setProps({
      value: 'Hello this is a longer string',
    });

    expect(
      (wrapper.find(FormField).prop('labelDescription') as React.ReactElement).props.current,
    ).toBe('29');
  });
});
