import React from 'react';
import { shallow } from 'enzyme';
import Core, { Settings } from '../../src';
import Translate from '../../src/components/Translate';

function T() {
  return null;
}

describe('<Translate />', () => {
  let oldSettings: Required<Settings>;

  beforeEach(() => {
    oldSettings = Core.settings;

    // eslint-disable-next-line jest/prefer-spy-on
    Core.settings.translator = jest.fn();
    Core.settings.translatorComponent = T;
  });

  afterEach(() => {
    Core.settings = oldSettings;
  });

  it('renders a translator component', () => {
    const wrapper = shallow(<Translate k="foo" phrase="Foo" bar={123} />);

    expect(wrapper.find(T)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with a `k` prop', () => {
    const wrapper = shallow(<Translate k="foo" phrase="Foo" bar={123} />);

    expect(wrapper.find(T).prop('k')).toBe('foo');
  });

  it('renders without translator component', () => {
    Core.settings.translatorComponent = null;

    const wrapper = shallow(<Translate k="foo" phrase="Foo" bar={123} />);

    expect(wrapper.find(T)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  describe('phrase()', () => {
    it('passes params to translator', () => {
      Translate.phrase('foo', 'Foo', { bar: 123 });

      expect(Core.settings.translator).toHaveBeenCalledWith('foo', 'Foo', { bar: 123 }, {});
    });

    it('supports object options', () => {
      Translate.phrase('foo', 'Foo', { bar: 123 });

      expect(Core.settings.translator).toHaveBeenCalledWith('foo', 'Foo', { bar: 123 }, {});
    });
  });
});
