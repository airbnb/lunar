require('airbnb-js-shims/target/es2017');

// CONSOLE

console.warn = console.error = function mockedConsole(message) {
  throw new Error(message);
};

// ENZYME

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({
  adapter: new Adapter(),
});
