import React from 'react';
import { shallow } from 'enzyme';
import Core, { Settings } from '../../src';
import Translate from '../../src/components/Translate';

describe('<Translate />', () => {
  let oldSettings: Required<Settings>;

  function T() {
    return null;
  }

  beforeEach(() => {
    oldSettings = Core.settings;

    Core.settings.translator = jest.fn();
    Core.settings.translatorComponent = T;
  });

  afterEach(() => {
    Core.settings = oldSettings;
  });

  it('renders a translator component', () => {
    const wrapper = shallow(<Translate phrase="Foo" bar={123} context="Baz" />);

    expect(wrapper.find(T)).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders without translator component', () => {
    Core.settings.translatorComponent = null;

    const wrapper = shallow(<Translate phrase="Foo" bar={123} context="Baz" />);

    expect(wrapper.find(T)).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  describe('phrase()', () => {
    it('passes params to translator', () => {
      Translate.phrase('Foo', { bar: 123 }, 'Baz');

      expect(Core.settings.translator).toHaveBeenCalledWith('Foo', { bar: 123 }, 'Baz');
    });
  });
});
