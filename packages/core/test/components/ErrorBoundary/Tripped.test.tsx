import React from 'react';
import { shallow } from 'enzyme';
import Tripped from '../../../src/components/ErrorBoundary/private/Tripped';

describe('<Tripped />', () => {
  it('will render an alert with a message', () => {
    const wrapper = shallow(<Tripped />);

    expect(wrapper).toMatchSnapshot();
  });
});
