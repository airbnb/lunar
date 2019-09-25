require('airbnb-js-shims/target/es2017');

// CONSOLE

console.warn = console.error = function mockedConsole(message) {
  throw new Error(message);
};

// LUNAR

const React = require('react');
const CoreLib = require('../packages/core/lib').default;
const CoreSrc = require('../packages/core/src').default;

// Some packages reference the lib/ core, while others reference the src/ one.
// We need to setup both or else things break, and we also need to do this
// in the module scope since styles are declared there.
function setupCore(core) {
  if (!core) {
    return;
  }

  core.settings.translatorComponent = ({ phrase }) => React.createElement('span', {}, phrase);
  core.bootstrapAesthetic();
  core.bootstrapLuxon();
}

setupCore(CoreLib);
setupCore(CoreSrc);

// MISC

const { EventEmitter } = require('events');
const oldRAF = window.requestAnimationFrame;
const oldRIC = window.requestIdleCallback;

beforeEach(() => {
  window.requestAnimationFrame = jest.fn(cb => cb() && 123);
  window.requestIdleCallback = jest.fn(cb => cb() && 456);

  global.newrelic = {};
});

afterEach(() => {
  window.requestAnimationFrame = oldRAF;
  window.requestIdleCallback = oldRIC;
});

global.BroadcastChannel = class BroadcastChannel {
  constructor(name) {
    this.emitter = new EventEmitter();
    this.name = name;
  }

  postMessage(data) {
    this.emitter.emit('message', { data });
  }

  addEventListener(name, listener) {
    this.emitter.on(name, listener);
  }

  removeEventListener(name, listener) {
    this.emitter.removeListener(name, listener);
  }

  close() {
    this.emitter.removeAllListeners();
  }
};
