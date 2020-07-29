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

  it('renders different styles for `noShadow`', () => {
    const withoutNoShadow = shallow(
      <Card>
        <Content>Foo</Content>
      </Card>,
    );

    const withNoShadow = shallow(
      <Card noShadow>
        <Content>Foo</Content>
      </Card>,
    );

    expect(withoutNoShadow.prop('className')).not.toBe(withNoShadow.prop('className'));
  });

  it('renders different styles for `selected`', () => {
    const withoutSelected = shallow(
      <Card>
        <Content>Foo</Content>
      </Card>,
    );

    const withSelected = shallow(
      <Card selected>
        <Content>Foo</Content>
      </Card>,
    );

    expect(withoutSelected.prop('className')).not.toBe(withSelected.prop('className'));
  });
});
