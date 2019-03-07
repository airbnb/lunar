import getFirstFocusableChild from '../../../src/utils/focus/getFirstFocusableChild';

jest.mock('../../../src/utils/focusableSelector');

describe('getFirstFocusableChild', () => {
  it('returns the first focusable child if it exists', () => {
    const fakeFocusableChild = 'fake focusable child';
    const node = {
      querySelector: jest.fn(() => fakeFocusableChild),
    };
    // @ts-ignore
    expect(getFirstFocusableChild(node)).toEqual(fakeFocusableChild);
  });

  it('returns the node if the first focusable child does not exist', () => {
    const node = {
      querySelector: jest.fn(() => null),
    };
    // @ts-ignore
    expect(getFirstFocusableChild(node)).toEqual(node);
  });
});
