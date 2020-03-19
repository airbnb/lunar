import focusElement from './focusElement';
import getFirstFocusableChild from './getFirstFocusableChild';

export default function focusFirstFocusableChild(node: HTMLElement) {
  if (!node.contains(document.activeElement)) {
    const firstFocusableElement = getFirstFocusableChild(node);

    focusElement(firstFocusableElement);
  }
}
