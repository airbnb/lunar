import React from 'react';
import { shallow } from 'enzyme';
import T from '../../src/components/Translate';
import FormField, { Prefix, Suffix } from '../../src/components/FormField';
import FormErrorMessage from '../../src/components/FormErrorMessage';
import StatusText from '../../src/components/StatusText';
import Text from '../../src/components/Text';

describe('<FormField />', () => {
  it('renders a label', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    );

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find(StatusText).prop('children')).toEqual(['Label', undefined]);
  });

  it('renders a label with optional copy', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    );

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
      <FormField hideOptionalLabel id="foo" label="Label">
        Foo
      </FormField>,
    );

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
    );

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
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      inline: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders input before the label', () => {
    const wrapper = shallow(
      <FormField renderBeforeLabel id="foo" label="Label">
        Foo
      </FormField>,
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      inline: true,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('hides the label', () => {
    const wrapper = shallow(
      <FormField hideLabel id="foo" label="Label">
        Foo
      </FormField>,
    );

    expect(wrapper.find('label').prop('className')).toMatch('label_hidden');
  });

  it('shows error if invalid', () => {
    const wrapper = shallow(
      <FormField invalid id="foo" label="Label" errorMessage="Broken!">
        Foo
      </FormField>,
    );

    expect(wrapper.find(FormErrorMessage).prop('error')).toBe('Broken!');

    wrapper.setProps({
      invalid: false,
    });

    expect(wrapper.find(FormErrorMessage)).toHaveLength(0);
  });

  it('supports a prefix', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" prefix={<Prefix>Foo</Prefix>}>
        Foo
      </FormField>,
    );

    expect(wrapper.find(Prefix)).toHaveLength(1);
  });

  it('supports a suffix', () => {
    const wrapper = shallow(
      <FormField id="foo" label="Label" suffix={<Suffix>Foo</Suffix>}>
        Foo
      </FormField>,
    );

    expect(wrapper.find(Suffix)).toHaveLength(1);
  });
});
