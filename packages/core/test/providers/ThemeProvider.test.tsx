import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider as BaseThemeProvider } from 'aesthetic-react';
import ThemeProvider from '../../src/providers/ThemeProvider';
import Core from '../../src';

describe('<ThemeProvider />', () => {
  it('renders a base provider with aesthetic', () => {
    const wrapper = shallow(<ThemeProvider>Child</ThemeProvider>);

    expect(wrapper.find(BaseThemeProvider).prop('aesthetic')).toBe(Core.aesthetic);
  });
});
