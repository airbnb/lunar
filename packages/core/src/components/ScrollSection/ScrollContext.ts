import React from 'react';

export type Context = {
  addScrollAnchor: (name: string, element: HTMLElement) => void;
  removeScrollAnchor: (name: string) => void;
};

export default React.createContext<Context | null>(null);
