import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import FormErrorMessage from '../../src/components/FormErrorMessage';
import StatusText from '../../src/components/StatusText';

describe('<FormErrorMessage />', () => {
  it('renders an error ', () => {
    const wrapper = shallowWithStyles(<FormErrorMessage id="foo" error="Oops" />);

    expect(wrapper.find(StatusText).prop('children')).toEqual('Oops');
  });

  it('renders empty if no error ', () => {
    const wrapper = shallowWithStyles(<FormErrorMessage id="foo" />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('sets correct attributes', () => {
    const wrapper = shallowWithStyles(<FormErrorMessage id="foo" error="Oops" />);

    expect(wrapper.prop('id')).toBe('foo-error');
    expect(wrapper.prop('role')).toBe('alert');
    expect(wrapper.prop('aria-live')).toBe('polite');
  });
});
