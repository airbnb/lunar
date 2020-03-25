/* eslint-disable jest/no-if */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import FocusTrap, { FocusTrapProps } from '../../src/components/FocusTrap';

// `activeElement` does not change when `focus()` is called.
// https://github.com/jsdom/jsdom/issues/2723
// https://blog.whatwg.org/focusing-on-focus
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('<FocusTrap>', () => {
  let childAElement: HTMLInputElement | null;
  let childBElement: HTMLInputElement | null;
  let childCElement: HTMLInputElement | null;
  let wrapper: Enzyme.ReactWrapper<FocusTrapProps, unknown, FocusTrap>;
  let preventDefault: jest.Mock;

  describe('with all focusable elements', () => {
    beforeEach(() => {
      const childA = (
        <input
          ref={(ref) => {
            childAElement = ref;
          }}
          type="text"
        />
      );
      const childB = (
        <input
          ref={(ref) => {
            childBElement = ref;
          }}
          type="text"
        />
      );
      const childC = (
        <input
          ref={(ref) => {
            childCElement = ref;
          }}
          type="text"
        />
      );
      wrapper = mount(
        <FocusTrap>
          {childA}
          {childB}
          {childC}
        </FocusTrap>,
      );
      preventDefault = jest.fn();
    });

    describe('with no element initially focused', () => {
      it('focuses the first focusable element on forward tab', () => {
        wrapper.simulate('keydown', {
          key: 'Tab',
          preventDefault,
        });
        expect(document.activeElement).toBe(childAElement);
      });

      it('focuses the last focusable element on backward tab', () => {
        wrapper.simulate('keydown', {
          key: 'Tab',
          shiftKey: true,
          preventDefault,
        });
        expect(document.activeElement).toBe(childCElement);
      });
    });

    describe('when tab is pressed while on the first of multiple elements', () => {
      beforeEach(() => {
        if (childAElement) {
          childAElement.focus();
        }
      });

      it('prevents default', () => {
        wrapper.simulate('keydown', {
          key: 'Tab',
          preventDefault,
        });
        expect(preventDefault).toHaveBeenCalledTimes(1);
      });

      it('increments the focused element correctly', () => {
        wrapper.simulate('keydown', {
          key: 'Tab',
          preventDefault,
        });
        expect(document.activeElement).toBe(childBElement);
      });

      describe('and the shift key is held', () => {
        it('focuses the last focusable element', () => {
          wrapper.simulate('keydown', {
            key: 'Tab',
            shiftKey: true,
            preventDefault,
          });
          expect(document.activeElement).toBe(childCElement);
        });
      });
    });

    describe('when tab is pressed while on the last of multiple elements', () => {
      beforeEach(() => {
        if (childCElement) {
          childCElement.focus();
        }
      });

      it('does not prevent default when disabled', () => {
        wrapper.setProps({ disabled: true });

        wrapper.simulate('keydown', {
          key: 'Tab',
          preventDefault,
        });
        expect(preventDefault).toHaveBeenCalledTimes(0);
      });

      it('does call focus on the first element', () => {
        wrapper.simulate('keydown', {
          key: 'Tab',
          preventDefault,
        });
        expect(document.activeElement).toBe(childAElement);
      });

      describe('and the shift key is held', () => {
        it('decrements the focused element correctly', () => {
          wrapper.simulate('keydown', {
            key: 'Tab',
            shiftKey: true,
            preventDefault,
          });
          expect(document.activeElement).toBe(childBElement);
        });
      });
    });
  });

  describe('with hidden elements', () => {
    beforeEach(() => {
      const hiddenChild = (
        <input
          ref={(ref) => {
            if (ref) {
              jest.spyOn(ref, 'focus').mockImplementation();
            }
          }}
          style={{ display: 'none' }}
          type="text"
        />
      );
      const childA = (
        <input
          ref={(ref) => {
            childAElement = ref;
          }}
          type="text"
        />
      );
      const childB = (
        <input
          ref={(ref) => {
            childBElement = ref;
          }}
          type="text"
        />
      );
      const childC = (
        <input
          ref={(ref) => {
            childCElement = ref;
          }}
          type="text"
        />
      );
      wrapper = mount(
        <FocusTrap>
          {hiddenChild}
          {childA}
          {hiddenChild}
          {childB}
          {hiddenChild}
          {childC}
          {hiddenChild}
        </FocusTrap>,
      );
      preventDefault = jest.fn();
    });

    it('skips hidden elements', () => {
      if (childAElement) {
        childAElement.focus();
      }

      wrapper.simulate('keydown', {
        key: 'Tab',
        preventDefault,
      });
      expect(document.activeElement).toBe(childBElement);
    });

    it('skips hidden elements when wrapping from last to first', () => {
      if (childCElement) {
        childCElement.focus();
      }

      wrapper.simulate('keydown', {
        key: 'Tab',
        preventDefault,
      });
      expect(document.activeElement).toBe(childAElement);
    });

    it('skips hidden elements when wrapping from first to last', () => {
      if (childAElement) {
        childAElement.focus();
      }

      wrapper.simulate('keydown', {
        key: 'Tab',
        shiftKey: true,
        preventDefault,
      });
      expect(document.activeElement).toBe(childCElement);
    });
  });
});
