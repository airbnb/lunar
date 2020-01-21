declare global {
  interface HTMLElement {
    scrollIntoViewIfNeeded(): void;
  }
}

export default function useScrollIntoView(element: HTMLElement | null, scroll: boolean) {
  // istanbul ignore next
  if (element && scroll) {
    if (element.scrollIntoViewIfNeeded) {
      element.scrollIntoViewIfNeeded();
    } else {
      element.scrollIntoView();
    }
  }
}
