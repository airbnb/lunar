import React from 'react';
import { render } from 'rut-dom';
import Suggestions, { SuggestionsProps } from '../../src/components/Suggestions';
import Hotkey from '../../src/components/Hotkey';
import { Wrapper } from '../mocks';

describe('<Suggestions />', () => {
  it('registers hotkeys', () => {
    const { root } = render<SuggestionsProps>(<Suggestions onLoad={jest.fn()} />, {
      wrapper: <Wrapper />,
    });

    expect(root.find(Hotkey)).toHaveLength(1);
  });

  it('registers change handlers', () => {
    const changeSpy = jest.fn();

    render<SuggestionsProps>(<Suggestions onLoad={jest.fn()} />, {
      wrapper: <Wrapper composerContext={{ onChange: changeSpy }} />,
    });

    expect(changeSpy).toHaveBeenCalledTimes(2);
  });
});
