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
    const wrapper = shallow(<FormInput tagName="input" {...props} />);

    expect(wrapper.is('input')).toBe(true);
  });

  it('renders a `textarea` tag', () => {
    const wrapper = shallow(<FormInput tagName="textarea" {...props} />);

    expect(wrapper.is('textarea')).toBe(true);
  });

  it('renders `noTranslate` className', () => {
    const wrapper = shallow(<FormInput tagName="textarea" {...props} noTranslate />);

    expect(wrapper.prop('className')).toContain('notranslate');
  });

  it('renders a `select` tag', () => {
    const wrapper = shallow(<FormInput tagName="select" {...props} />);

    expect(wrapper.is('select')).toBe(true);
  });

  it('renders compact', () => {
    const wrapper = shallow(<FormInput compact tagName="input" {...props} />);

    expect(wrapper.prop('className')).toMatch('input_compact');
  });

  it('renders select compact', () => {
    const wrapper = shallow(<FormInput compact tagName="select" {...props} />);

    expect(wrapper.prop('className')).toMatch('select select_compact');
  });

  it('renders important', () => {
    const wrapper = shallow(<FormInput important tagName="input" {...props} />);

    expect(wrapper.prop('className')).toMatch('input_important');
  });

  it('renders children in `select` tag as options', () => {
    const wrapper = shallow(
      <FormInput tagName="select" {...props}>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </FormInput>,
    );

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
    );

    expect(wrapper.children()).toHaveLength(0);
  });

  it('doesnt render children for `textarea` tag', () => {
    const wrapper = shallow(
      <FormInput tagName="textarea" {...props}>
        Foo
      </FormInput>,
    );

    expect(wrapper.children()).toHaveLength(0);
  });

  it('sets disabled', () => {
    const wrapper = shallow(<FormInput disabled tagName="input" {...props} />);

    expect(wrapper.prop('disabled')).toBe(true);
  });

  it('sets hidden', () => {
    const wrapper = shallow(<FormInput hidden tagName="input" {...props} />);

    expect(wrapper.prop('className')).toMatch('input_hidden');
  });

  it('sets id', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} id="foo" />);

    expect(wrapper.prop('id')).toBe('foo');
  });

  it('sets name', () => {
    const wrapper = shallow(<FormInput disabled tagName="input" {...props} />);

    expect(wrapper.prop('name')).toBe('test');
  });

  it('sets value', () => {
    const wrapper = shallow(<FormInput tagName="input" value="Why?" {...props} />);

    expect(wrapper.prop('value')).toBe('Why?');
  });

  it('sets required/optional', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} />);

    expect(wrapper.prop('required')).toBe(true);

    wrapper.setProps({
      optional: true,
    });

    expect(wrapper.prop('required')).toBe(false);
  });

  it('sets aria attributes if invalid', () => {
    const wrapper = shallow(<FormInput tagName="input" {...props} />);

    expect(wrapper.prop('aria-invalid')).toBeUndefined();
    expect(wrapper.prop('aria-describedby')).toBeUndefined();

    wrapper.setProps({
      invalid: true,
    });

    expect(wrapper.prop('aria-invalid')).toBe(true);
    expect(wrapper.prop('aria-describedby')).toBe('test-error');
  });

  it('passes extra props to element', () => {
    const wrapper = shallow(<FormInput tagName="input" type="email" {...props} />);

    expect(wrapper.prop('type')).toBe('email');
  });

  it('supports prefixes', () => {
    const wrapper = shallow(<FormInput hasPrefix tagName="input" {...props} />);

    expect(wrapper.prop('className')).toMatch('input_hasPrefix');
  });

  it('supports suffixes', () => {
    const wrapper = shallow(<FormInput hasSuffix tagName="input" {...props} />);

    expect(wrapper.prop('className')).toMatch('input_hasSuffix');
  });

  it('sets maxLength', () => {
    const wrapper = shallow(<FormInput tagName="input" maxLength={20} {...props} />);

    expect(wrapper.prop('maxLength')).toBe(20);
  });
});
