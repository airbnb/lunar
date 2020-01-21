import React from 'react';
import { render, mockSyntheticEvent } from 'rut-dom';
import Input, { InputProps } from '../../src/components/Input';
import InlineInput from '../../src/components/Input/InlineInput';
import IconButton from '../../src/components/IconButton';
import { Wrapper } from '../mocks';
import { MODE_PRIVATE_NOTE, MODE_EMAIL } from '../../src/constants';

describe('<Input />', () => {
  const props = { onChange() {}, onSubmit() {} };

  it('renders a textarea and submit button', () => {
    const { root } = render<InputProps>(<Input {...props} />);

    expect(root.find('textarea')).toHaveLength(1);
    expect(root.find('button')).toHaveLength(1);
    expect(root.find(IconButton)).toHaveLength(1);
  });

  it('changes placeholder based on writing mode', () => {
    const result = render<InputProps>(<Input {...props} />, {
      wrapper: <Wrapper />,
    });

    expect(result.root.findOne('textarea')).toHaveProp('placeholder', 'Send message…');

    result.rerender(<Input {...props} />, {
      wrapper: <Wrapper composerContext={{ mode: MODE_EMAIL }} />,
    });

    expect(result.root.findOne('textarea')).toHaveProp('placeholder', 'Send email…');

    result.rerender(<Input {...props} />, {
      wrapper: <Wrapper composerContext={{ mode: MODE_PRIVATE_NOTE }} />,
    });

    expect(result.root.findOne('textarea')).toHaveProp('placeholder', 'Private to Airbnb');
  });

  it('renders subject/to fields when mode is email', () => {
    const result = render<InputProps>(<Input {...props} />, {
      wrapper: <Wrapper />,
    });

    expect(result.root.find(InlineInput)).toHaveLength(0);

    result.rerender(<Input {...props} />, {
      wrapper: <Wrapper composerContext={{ mode: MODE_EMAIL }} />,
    });

    expect(result.root.find(InlineInput)).toHaveLength(2);
  });

  describe('events', () => {
    it('calls `onChange` prop when value changes', () => {
      const spy = jest.fn();
      const { root } = render<InputProps>(<Input {...props} onChange={spy} />, {
        wrapper: <Wrapper />,
      });

      const textarea = document.createElement('textarea');
      textarea.value = 'foobar';

      root.findOne('textarea').dispatch('onChange', { target: textarea });

      expect(spy).toHaveBeenCalledWith('foobar', expect.anything());
    });

    it('calls `onSubmit` when button is clicked', () => {
      const spy = jest.fn();
      const { root } = render<InputProps>(<Input {...props} onSubmit={spy} />, {
        wrapper: <Wrapper value="foo" />,
      });

      root.findOne('button').dispatch('onClick');

      expect(spy).toHaveBeenCalledWith({ shadowValue: '', value: 'foo' }, expect.anything());
    });
  });

  describe('states', () => {
    it('handles focus and blur', () => {
      const { root } = render<InputProps>(<Input {...props} />);

      expect(root.findOne('div')).not.toHaveClassName('container_focused');

      root.findOne('textarea').dispatch('onFocus');

      expect(root.findOne('div')).toHaveClassName('container_focused');

      root.findOne('textarea').dispatch('onBlur');

      expect(root.findOne('div')).not.toHaveClassName('container_focused');
    });

    it('handles disabled', () => {
      const { root } = render<InputProps>(<Input disabled {...props} />);

      expect(root.findOne('div')).toHaveClassName('container_disabled');
      expect(root.findOne('textarea')).toBeDisabled();
      expect(root.findOne('button')).toBeDisabled();
    });

    it('handles invalid', () => {
      const { root } = render<InputProps>(<Input invalid {...props} />);

      expect(root.findOne('div')).toHaveClassName('container_invalid');
      expect(root.findOne('textarea')).not.toBeDisabled();
      expect(root.findOne('button')).toBeDisabled();
    });
  });

  describe('hotkeys', () => {
    it('triggers hotkeys', () => {
      const shiftSpy = jest.fn();
      const altSpy = jest.fn();
      const cmdSpy = jest.fn();
      const condition = () => true;
      const { root } = render<InputProps>(<Input {...props} />, {
        wrapper: (
          <Wrapper
            hotkeys={[
              {
                name: 'foo',
                comparator: { shiftKey: true, key: 'r' },
                condition,
                onRun: shiftSpy,
                combo: 'shift+r',
              },
              {
                name: 'bar',
                comparator: { altKey: true, shiftKey: true, key: 'Tab' },
                condition,
                onRun: altSpy,
                combo: 'alt+shift+tab',
              },
              {
                name: 'baz',
                comparator: { metaKey: true, key: 'Esc' },
                condition,
                onRun: cmdSpy,
                combo: 'cmd+esc',
              },
            ]}
          />
        ),
      });
      const event = mockSyntheticEvent<React.KeyboardEvent<HTMLTextAreaElement>>('onKeyDown');
      event.shiftKey = true;
      event.key = 'r';

      root.findOne('textarea').dispatch('onKeyDown', event);

      expect(shiftSpy).toHaveBeenCalled();
      expect(altSpy).not.toHaveBeenCalled();
      expect(cmdSpy).not.toHaveBeenCalled();
    });
  });
});
