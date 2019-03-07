import focusableSelector from '../focusableSelector';

function getFirstFocusableChild(node: HTMLElement): HTMLElement {
  const firstFocusableElement = node.querySelector(focusableSelector);

  if (firstFocusableElement !== null) {
    return firstFocusableElement as HTMLElement;
  }

  return node;
}

export default getFirstFocusableChild;
