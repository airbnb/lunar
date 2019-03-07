import React from 'react';
import { shallow } from 'enzyme';
import T from '../../src/components/Translate';
import FormField, { Prefix, Suffix } from '../../src/components/FormField';
import FormErrorMessage from '../../src/components/FormErrorMessage';
import BaseInput from '../../src/components/private/BaseInput';
import StatusText from '../../src/components/StatusText';
import Text from '../../src/components/Text';

describe('<FormField />', () => {
  it('renders a label', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    ).dive();

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find(StatusText).prop('children')).toEqual(['Label', false]);
  });

  it('renders a label with optional copy', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    ).dive();

    expect(wrapper.find('label').find(T)).toHaveLength(0);

    wrapper.setProps({
      optional: true,
    });

    expect(wrapper.find('label').find(T)).toHaveLength(1);
    expect(
      wrapper
        .find('label')
        .find(T)
        .prop('phrase'),
    ).toBe('(optional)');
  });

  it('doesnt renders optional label if `hideOptionalLabel` is true', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" hideOptionalLabel>
        Foo
      </FormField>,
    ).dive();

    expect(wrapper.find('label').find(T)).toHaveLength(0);

    wrapper.setProps({
      optional: true,
    });

    expect(wrapper.find('label').find(T)).toHaveLength(0);
  });

  it('renders a label description', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    ).dive();

    expect(wrapper.find(Text)).toHaveLength(0);

    wrapper.setProps({
      labelDescription: 'Description',
    });

    expect(wrapper.find(Text)).toHaveLength(1);
    expect(wrapper.find(Text).prop('children')).toBe('Description');
  });

  it('renders input after the label', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    ).dive();

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      inline: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders input before the label', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" renderBeforeLabel>
        Foo
      </FormField>,
    ).dive();

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      inline: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('hides the label', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" hideLabel>
        Foo
      </FormField>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('shows error if invalid', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" invalid errorMessage="Broken!">
        Foo
      </FormField>,
    ).dive();

    expect(wrapper.find(FormErrorMessage).prop('error')).toBe('Broken!');

    wrapper.setProps({
      invalid: false,
    });

    expect(wrapper.find(FormErrorMessage)).toHaveLength(0);
  });

  it('re-renders children if value props', () => {
    function Wrapper({ value }: { value: string }) {
      return (
        <FormField label="Label" id="foo">
          <BaseInput name="foo" value={value} onChange={() => {}} />
        </FormField>
      );
    }

    const wrapper = shallow(<Wrapper value="foo" />);

    expect(wrapper.find(BaseInput).prop('value')).toBe('foo');

    wrapper.setProps({ value: 'bar' });

    expect(wrapper.find(BaseInput).prop('value')).toBe('bar');
  });

  it('supports a prefix', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" prefix={<Prefix>Foo</Prefix>}>
        Foo
      </FormField>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('errors for invalid prefix', () => {
    expect(() => {
      shallow(
        <FormField id="foo" label="Label" prefix={<div />}>
          Foo
        </FormField>,
      ).dive();
    }).toThrowErrorMatchingSnapshot();
  });

  it('supports a suffix', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" suffix={<Suffix>Foo</Suffix>}>
        Foo
      </FormField>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('errors for invalid suffix', () => {
    expect(() => {
      shallow(
        <FormField id="foo" label="Label" suffix={<div />}>
          Foo
        </FormField>,
      ).dive();
    }).toThrowErrorMatchingSnapshot();
  });
});
