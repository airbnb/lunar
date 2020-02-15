import React from 'react';
import { render } from 'rut-dom';
import IconPhone from '@airbnb/lunar-icons/lib/general/IconPhone';
import { Item } from '@airbnb/lunar/lib/components/Menu';
import Actions, { ActionsProps } from '../../src/components/Actions';
import Menu from '../../src/components/Menu';
import { Wrapper } from '../mocks';
import { MENU_ACTIONS, MODE_EMAIL, MODE_MESSAGE, MODE_PRIVATE_NOTE } from '../../src/constants';
import { ActionConfig } from '../../src/types';

describe('<Actions />', () => {
  const actions: ActionConfig[] = [
    {
      label: 'Call',
      group: 'Do…',
      icon: IconPhone,
      onRun() {},
    },
    {
      condition: ctx => ctx.data.value === '',
      label: 'Write',
      group: 'Do…',
      icon: IconPhone,
      onRun() {},
    },
  ];

  it('renders a menu', () => {
    const { root } = render<ActionsProps>(<Actions actions={actions} />, {
      wrapper: <Wrapper menu={MENU_ACTIONS} />,
    });

    expect(root.find(Menu, { name: MENU_ACTIONS })).toHaveLength(1);
  });

  it('filters out action items using the `condition`', () => {
    const { root } = render<ActionsProps>(<Actions noWritingModes actions={actions} />, {
      wrapper: <Wrapper menu={MENU_ACTIONS} value="foo" />,
    });

    expect(root.find(Item)).toHaveLength(1);
  });

  it('filters out writing mode actions when passing `noWritingModes`', () => {
    const { root, update } = render<ActionsProps>(<Actions actions={actions} />, {
      wrapper: <Wrapper menu={MENU_ACTIONS} />,
    });

    expect(root.find(Item)).toHaveLength(4);

    update({ noWritingModes: true });

    expect(root.find(Item)).toHaveLength(2);
  });

  it('hides menu and runs action when clicked', () => {
    const closeSpy = jest.fn();
    const actionSpy = jest.spyOn(actions[0], 'onRun');

    const { root } = render<ActionsProps>(<Actions noWritingModes actions={actions} />, {
      wrapper: <Wrapper menu={MENU_ACTIONS} composerContext={{ setMenu: closeSpy }} />,
    });

    root.findAt('button', 'first').dispatch('onClick');

    expect(closeSpy).toHaveBeenCalledWith('');
    expect(actionSpy).toHaveBeenCalledWith(expect.any(Object));

    actionSpy.mockRestore();
  });

  describe('writing modes', () => {
    it('sets message mode', () => {
      const spy = jest.fn();
      const { root } = render<ActionsProps>(<Actions actions={actions} />, {
        wrapper: (
          <Wrapper menu={MENU_ACTIONS} composerContext={{ mode: MODE_EMAIL, setMode: spy }} />
        ),
      });

      root.findAt('button', 'first').dispatch('onClick');

      expect(spy).toHaveBeenCalledWith(MODE_MESSAGE);
    });

    it('sets email mode', () => {
      const spy = jest.fn();
      const { root } = render<ActionsProps>(<Actions actions={actions} />, {
        wrapper: (
          <Wrapper
            menu={MENU_ACTIONS}
            composerContext={{ mode: MODE_PRIVATE_NOTE, setMode: spy }}
          />
        ),
      });

      root.findAt('button', 1).dispatch('onClick');

      expect(spy).toHaveBeenCalledWith(MODE_EMAIL);
    });

    it('sets private note mode', () => {
      const spy = jest.fn();
      const { root } = render<ActionsProps>(<Actions actions={actions} />, {
        wrapper: (
          <Wrapper menu={MENU_ACTIONS} composerContext={{ mode: MODE_MESSAGE, setMode: spy }} />
        ),
      });

      root.findAt('button', 1).dispatch('onClick');

      expect(spy).toHaveBeenCalledWith(MODE_PRIVATE_NOTE);
    });
  });
});
