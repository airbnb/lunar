import React from 'react';
import { render } from 'rut-dom';
import Input from '@airbnb/lunar/lib/components/Input';
import InlineInput, { InlineInputProps } from '../../../src/components/Input/InlineInput';
import { Wrapper } from '../../mocks';

describe('<InlineInput />', () => {
  const props = { label: 'Foo', name: 'foo', value: 'value' };

  it('renders label and value as text by default', () => {
    const { root } = render<InlineInputProps>(<InlineInput {...props} />);

    expect(root).toContainNode('Foo');
    expect(root).toContainNode('value');
    expect(root.find(Input)).toHaveLength(0);
  });

  it('toggles between edit modes', () => {
    const { root } = render<InlineInputProps>(<InlineInput {...props} />);

    expect(root.find(Input)).toHaveLength(0);

    root.findOne('button').dispatch('onClick');

    expect(root.find(Input)).toHaveLength(1);
    expect(root.findOne(Input)).toHaveProp('name', 'foo');
    expect(root.findOne(Input)).toHaveValue('value');

    root.findOne('button').dispatch('onClick');

    expect(root.find(Input)).toHaveLength(0);
  });

  it('updates context value on change', () => {
    const spy = jest.fn();
    const { root } = render<InlineInputProps>(<InlineInput {...props} />, {
      wrapper: <Wrapper composerContext={{ setData: spy }} />,
    });

    root.findOne('button').dispatch('onClick');

    root.findOne('input').dispatch('onChange', {
      target: {
        value: 'new value',
      },
    });

    expect(spy).toHaveBeenCalledWith('foo', 'new value');
  });
});
