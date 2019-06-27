import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import T from '../../src/components/Translate';
import FormField, { Prefix, Suffix } from '../../src/components/FormField';
import FormErrorMessage from '../../src/components/FormErrorMessage';
import StatusText from '../../src/components/StatusText';
import Text from '../../src/components/Text';

describe('<FormField />', () => {
  it('renders a label', () => {
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label">
        Foo
      </FormField>,
    );

    expect(wrapper.find('label')).toHaveLength(1);
    expect(wrapper.find(StatusText).prop('children')).toEqual(['Label', false]);
  });

  it('renders a label with optional copy', () => {
    const wrapper = shallowWithStyles(
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
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label" hideOptionalLabel>
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
    const wrapper = shallowWithStyles(
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
    const wrapper = shallowWithStyles(
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
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label" renderBeforeLabel>
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
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label" hideLabel>
        Foo
      </FormField>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('shows error if invalid', () => {
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label" invalid errorMessage="Broken!">
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
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label" prefix={<Prefix>Foo</Prefix>}>
        Foo
      </FormField>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('errors for invalid prefix', () => {
    expect(() => {
      shallowWithStyles(
        <FormField id="foo" label="Label" prefix={<div />}>
          Foo
        </FormField>,
      );
    }).toThrowErrorMatchingSnapshot();
  });

  it('supports a suffix', () => {
    const wrapper = shallowWithStyles(
      <FormField id="foo" label="Label" suffix={<Suffix>Foo</Suffix>}>
        Foo
      </FormField>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('errors for invalid suffix', () => {
    expect(() => {
      shallowWithStyles(
        <FormField id="foo" label="Label" suffix={<div />}>
          Foo
        </FormField>,
      );
    }).toThrowErrorMatchingSnapshot();
  });
});
