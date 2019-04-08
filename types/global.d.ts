/* eslint-disable */

declare module 'fake-indexeddb';
declare module 'full-icu';
declare module ':storybook/components/*';
declare module '*.jpg';
declare module '*.png';

declare const __DEV__: boolean;
declare const jsdom: any;

// MONKEY PATCHING

type RequestIdleCallbackOptions = {
  timeout: number;
};

type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: (() => number);
};

interface ResizeObserverEntry {
  readonly contentRect: DOMRectInit;
  readonly target: HTMLElement;
  new (target: HTMLElement): ResizeObserverEntry;
}

interface ResizeObserver {
  new (
    callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
  ): ResizeObserver;
  observe(target: HTMLElement): void;
  unobserve(target: HTMLElement): void;
  disconnect(): void;
}

interface Window {
  __APOLLO_CLIENT__: any;
  Notification: Notification;
  ResizeObserver: ResizeObserver;
  requestIdleCallback: (
    callback: ((deadline: RequestIdleCallbackDeadline) => void),
    opts?: RequestIdleCallbackOptions,
  ) => number;
  cancelIdleCallback: ((handle: number) => void);
}

interface WindowEventMap {
  cut: ClipboardEvent;
  copy: ClipboardEvent;
  paste: ClipboardEvent;
}

declare namespace JSX {
  interface IntrinsicElements {
    'tracking-boundary': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >;
  }
}

interface MouseEvent {
  trackingContext?: string[];
}

interface KeyboardEvent {
  trackingContext?: string[];
}

// One of our transitive dependencies installs @types/node, which overtakes our `global`
// variable, and we can't do anything about it. So to get around it, we need to modify
// and monkeypatch the NodeJS global for our needs. This is hacky, I know.
declare namespace NodeJS {
  interface Global {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    location: Location;
    navigator: Navigator;
    newrelic: NewRelic.Browser;
    // Tests
    indexedDB: IDBFactory;
    jsdom: any;
    IntersectionObserver: IntersectionObserver;
    Notification: Notification;
  }
}
