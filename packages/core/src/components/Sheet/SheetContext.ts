import React from 'react';

export type Context = (visible: boolean) => void;

export default React.createContext<Context>(/* istanbul ignore next */ () => {});
