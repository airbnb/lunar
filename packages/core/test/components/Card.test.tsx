import React from 'react';
import { shallow } from 'enzyme';
import Card, { Content } from '../../src/components/Card';

describe('<Card />', () => {
  it('renders different styles for `overflow`', () => {
    const withoutOverflow = shallow(
      <Card>
        <Content>Foo</Content>
      </Card>,
    );

    const withOverflow = shallow(
      <Card overflow>
        <Content>Foo</Content>
      </Card>,
    );

    expect(withoutOverflow.prop('className')).not.toBe(withOverflow.prop('className'));
  });
});
