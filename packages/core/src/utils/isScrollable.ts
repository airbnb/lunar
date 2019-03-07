class ScrollCheck {
  computedStyle: CSSStyleDeclaration;

  node: HTMLElement;

  constructor(node: HTMLElement) {
    this.node = node;
    this.computedStyle = window.getComputedStyle(node);
  }

  hasOverflow(dimension: 'x' | 'y') {
    const overflow = this.computedStyle[
      `overflow${dimension.toUpperCase()}` as keyof CSSStyleDeclaration
    ];

    return overflow === 'scroll' || overflow === 'auto';
  }

  isScrollableX() {
    return this.hasOverflow('x') && this.node.scrollWidth > this.node.clientWidth;
  }

  isScrollableY() {
    return this.hasOverflow('y') && this.node.scrollHeight > this.node.clientHeight;
  }

  isScrollable() {
    return this.isScrollableX() || this.isScrollableY();
  }
}

export default function isScrollable(node: HTMLElement): boolean {
  return new ScrollCheck(node).isScrollable();
}

export type ArrayOfScrollables = (Window | Node)[];

export function scrollingParents(node: HTMLElement): ArrayOfScrollables {
  const output: ArrayOfScrollables = [];
  let el: Node | null = node;

  while (el && el !== document.documentElement) {
    if (isScrollable(el as HTMLElement)) {
      output.push(el);
    }

    el = el.parentNode;
  }

  if (node.ownerDocument && node.ownerDocument.defaultView) {
    output.push(node.ownerDocument.defaultView);
  }

  return output;
}
