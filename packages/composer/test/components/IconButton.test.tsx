import React from 'react';
import { render } from 'rut-dom';
import IconStarAlt from '@airbnb/lunar-icons/lib/interface/IconStarAlt';
import IconButton, { IconButtonProps } from '../../src/components/IconButton';

describe('<IconButton />', () => {
  it('renders a button with an icon and id', () => {
    const { root } = render<IconButtonProps>(
      <IconButton accessibilityLabel="Label" id="foo-bar" icon={IconStarAlt} />,
    );

    expect(root.findOne('button')).toHaveProp('id', 'foo-bar');
    expect(root.find(IconStarAlt)).toHaveLength(1);
  });

  it('can disable the button', () => {
    const { root } = render<IconButtonProps>(
      <IconButton disabled accessibilityLabel="Label" icon={IconStarAlt} />,
    );

    expect(root.findOne('button')).toHaveProp('disabled', true);
  });

  it('can be clicked', () => {
    const spy = jest.fn();
    const { root } = render<IconButtonProps>(
      <IconButton accessibilityLabel="Label" icon={IconStarAlt} onClick={spy} />,
    );

    root.findOne('button').dispatch('onClick');

    expect(spy).toHaveBeenCalled();
  });
});
