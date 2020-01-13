export function isMac(): boolean {
  return navigator.platform.toLowerCase().includes('mac');
}

export function isElementWithID(element: HTMLElement, tagName: string, id: string): boolean {
  let target: HTMLElement | null = element;
  let depth = 0;

  while (target && depth < 3) {
    if (target.tagName.toLowerCase() === tagName && target.id === id) {
      return true;
    }

    target = target.parentElement;
    depth += 1;
  }

  return false;
}
