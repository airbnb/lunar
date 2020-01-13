import React from 'react';
import { render } from 'rut-dom';
import Footer from '../../src/components/Footer';
import Mark from '../../src/components/Footer/Mark';
import Symbol from '../../src/components/Footer/Symbol';
import Tip from '../../src/components/Footer/Tip';
import { HotkeyConfig } from '../../src/types';
import { Wrapper } from '../mocks';

describe('<Footer />', () => {
  const hotkeys: HotkeyConfig[] = [
    {
      name: 'foo',
      combo: 'shift+f',
      comparator: {},
      condition: ctx => ctx.menu === '',
      onRun() {},
    },
    {
      name: 'bar',
      combo: 'cmd+alt',
      comparator: {},
      condition: ctx => ctx.menu === 'menu',
      onRun() {},
    },
    {
      name: 'baz',
      combo: 'alt+/',
      comparator: {},
      condition: ctx => ctx.menu === '',
      onRun() {},
    },
  ];

  it('renders nothing when no hotkeys defined', () => {
    const { root } = render<{}>(<Footer />);

    expect(root.find(Tip)).toHaveLength(0);
  });

  it('renders hotkeys that match the condition', () => {
    const { root } = render<{}>(<Footer />, {
      wrapper: <Wrapper hotkeys={hotkeys} />,
    });

    expect(root.find(Tip)).toHaveLength(2);
  });

  it('renders a symbol for each combo item', () => {
    const { root } = render<{}>(<Footer />, {
      wrapper: <Wrapper hotkeys={hotkeys} menu="menu" />,
    });

    expect(root.find(Mark)).toHaveLength(1);
    expect(root.find(Symbol)).toHaveLength(2);
  });
});
