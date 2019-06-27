import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import IconAffix from '../../../src/components/private/IconAffix';

describe('<IconAffix />', () => {
  it('renders before', () => {
    const wrapper = shallowWithStyles(<IconAffix before>Child</IconAffix>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders after', () => {
    const wrapper = shallowWithStyles(<IconAffix after>Child</IconAffix>);

    expect(wrapper).toMatchSnapshot();
  });

  it('errors if both props used', () => {
    expect(() => {
      shallowWithStyles(
        <IconAffix before after>
          Child
        </IconAffix>,
      );
    }).toThrowError();
  });
});
