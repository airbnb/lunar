import focusFirstFocusableChild from '../../../src/utils/focus/focusFirstFocusableChild';
import focusElement from '../../../src/utils/focus/focusElement';
import getFirstFocusableChild from '../../../src/utils/focus/getFirstFocusableChild';

jest.mock('../../../src/utils/focus/focusElement');
jest.mock('../../../src/utils/focus/getFirstFocusableChild');

describe('focusFirstFocusableChild', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when a focusable child is present', () => {
    it('focuses the child', () => {
      const childNode = {};
      const node = {
        contains() {
          return false;
        },
      };
      // @ts-ignore
      getFirstFocusableChild.mockReturnValueOnce(childNode);
      // @ts-ignore
      focusFirstFocusableChild(node);
      expect(focusElement).toHaveBeenCalledWith(childNode);
      expect(focusElement).not.toHaveBeenCalledWith(node);
    });
  });

  describe('when a child already contains focus', () => {
    it('focuses nothing', () => {
      const node = {
        contains() {
          return true;
        },
      };
      // @ts-ignore
      focusFirstFocusableChild(node);
      expect(focusElement).not.toHaveBeenCalled();
    });
  });

  describe('when no focusable child is present', () => {
    it('focuses the parent node', () => {
      const node = {
        contains() {
          return false;
        },
      };
      // @ts-ignore
      getFirstFocusableChild.mockReturnValueOnce(node);
      // @ts-ignore
      focusFirstFocusableChild(node);
      expect(focusElement).toHaveBeenCalledWith(node);
    });
  });
});
