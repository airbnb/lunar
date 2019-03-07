import React from 'react';
import { shallow } from 'enzyme';
import FormInput from '../../../src/components/private/FormInput';

describe('<FormInput />', () => {
  const props = {
    id: 'test',
    name: 'test',
    onChange() {},
  };

  it('renders an `input` tag', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} />).dive();

    expect(wrapper.is('input')).toBe(true);
  });

  it('renders a `textarea` tag', () => {
    const wrapper = shallow(<FormInput tagName="textarea" {...props} />).dive();

    expect(wrapper.is('textarea')).toBe(true);
  });

  it('renders noTranslate className', () => {
    const wrapper = shallow(<FormInput tagName="textarea" {...props} noTranslate />).dive();

    expect(wrapper.prop('className')).toContain('notranslate');
  });

  it('renders a `select` tag', () => {
    const wrapper = shallow(<FormInput tagName="select" {...props} />).dive();

    expect(wrapper.is('select')).toBe(true);
  });

  it('renders compact', () => {
    const wrapper = shallow(<FormInput tagName="input" compact {...props} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders select compact', () => {
    const wrapper = shallow(<FormInput tagName="select" compact {...props} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders important', () => {
    const wrapper = shallow(<FormInput tagName="input" important {...props} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders children in `select` tag as options', () => {
    const wrapper = shallow(
      <FormInput tagName="select" {...props}>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </FormInput>,
    ).dive();

    expect(wrapper.children()).toHaveLength(3);
    expect(
      wrapper
        .children()
        .at(0)
        .is('option'),
    ).toBe(true);
  });

  it('doesnt render children for `input` tag', () => {
    const wrapper = shallow(
      <FormInput tagName="input" {...props}>
        Foo
      </FormInput>,
    ).dive();

    expect(wrapper.children()).toHaveLength(0);
  });

  it('doesnt render children for `textarea` tag', () => {
    const wrapper = shallow(
      <FormInput tagName="textarea" {...props}>
        Foo
      </FormInput>,
    ).dive();

    expect(wrapper.children()).toHaveLength(0);
  });

  it('sets disabled', () => {
    const wrapper = shallow(<FormInput tagName="input" disabled {...props} />).dive();

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('sets hidden', () => {
    const wrapper = shallow(<FormInput tagName="input" hidden {...props} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('sets id', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} id="foo" />).dive();

    expect(wrapper.prop('id')).toBe('foo');
  });

  it('sets name', () => {
    const wrapper = shallow(<FormInput tagName="input" disabled {...props} />).dive();

    expect(wrapper.prop('name')).toBe('test');
  });

  it('sets value', () => {
    const wrapper = shallow(<FormInput tagName="input" value="Why?" {...props} />).dive();

    expect(wrapper.prop('value')).toBe('Why?');
  });

  it('sets required/optional', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} />).dive();

    expect(wrapper.prop('required')).toBe(true);

    wrapper.setProps({
      optional: true,
    });

    expect(wrapper.prop('required')).toBe(false);
  });

  it('sets aria attributes if invalid', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} />).dive();

    expect(wrapper.prop('aria-invalid')).toBeUndefined();
    expect(wrapper.prop('aria-describedby')).toBeUndefined();

    wrapper.setProps({
      invalid: true,
    });

    expect(wrapper.prop('aria-invalid')).toBe(true);
    expect(wrapper.prop('aria-describedby')).toBe('test-error');
  });

  it('passes extra props to element', () => {
    const wrapper = shallow(<FormInput tagName="input" type="email" {...props} />).dive();

    expect(wrapper.prop('type')).toBe('email');
  });

  it('supports prefixes', () => {
    const wrapper = shallow(<FormInput tagName="input" hasPrefix {...props} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('supports suffixes', () => {
    const wrapper = shallow(<FormInput tagName="input" hasSuffix {...props} />).dive();

    expect(wrapper).toMatchSnapshot();
  });

  it('sets maxLength', () => {
    const wrapper = shallow(<FormInput tagName="input" maxLength={20} {...props} />).dive();

    expect(wrapper.prop('maxLength')).toBe(20);
  });
});
