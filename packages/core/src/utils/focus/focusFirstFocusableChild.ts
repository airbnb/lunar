import focusElement from './focusElement';
import getFirstFocusableChild from './getFirstFocusableChild';

function focusFirstFocusableChild(node: HTMLElement) {
  if (!node.contains(document.activeElement)) {
    const firstFocusableElement = getFirstFocusableChild(node);

    focusElement(firstFocusableElement);
  }
}

export default focusFirstFocusableChild;
