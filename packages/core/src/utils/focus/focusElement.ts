/** Returns true if we need to add a tabindex to the element to focus it. */
function shouldAddTabIndexForFocus(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute('tabindex');

  if (tabIndex && !Number.isNaN(parseInt(tabIndex, 10))) {
    // The element already has a valid tab index
    return false;
  }

  const nodeName = element.nodeName.toLowerCase();

  if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
    // These elements can already normally take focus
    return false;
  }

  if (element instanceof HTMLAnchorElement) {
    // If the <a> tag has an href, we do not need to add a tabindex
    return !element.href;
  }

  // We need to add a tabindex to give this element focus
  return true;
}

/** Focus on the given DOM element. */
export default function focusElement<T extends HTMLElement>(element?: T): T | undefined {
  if (!element) {
    return undefined;
  }

  if (shouldAddTabIndexForFocus(element)) {
    element.tabIndex = -1; // eslint-disable-line no-param-reassign
  }

  element.focus();

  return element;
}
