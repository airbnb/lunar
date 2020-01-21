import React from 'react';
import { render } from 'rut-dom';
import IconStarAlt from '@airbnb/lunar-icons/lib/interface/IconStarAlt';
import ToggleButton, { ToggleButtonProps } from '../../../src/components/Menu/ToggleButton';
import IconButton from '../../../src/components/IconButton';
import { Wrapper } from '../../mocks';

describe('<ToggleButton />', () => {
  it('renders an icon button', () => {
    const { root } = render<ToggleButtonProps>(
      <ToggleButton accessibilityLabel="Label" menu="foo" icon={IconStarAlt} />,
    );

    expect(root.findOne(IconButton)).toHaveProp('id', 'toggle-button-foo');
  });

  it('toggles menu when clicked', () => {
    const spy = jest.fn();
    const { root } = render<ToggleButtonProps>(
      <ToggleButton accessibilityLabel="Label" menu="foo" icon={IconStarAlt} />,
      {
        wrapper: <Wrapper composerContext={{ setMenu: spy }} />,
      },
    );

    root.findOne('button').dispatch('onClick');

    expect(spy).toHaveBeenCalled();
  });
});
