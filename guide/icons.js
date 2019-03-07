const context = require.context('../packages/icons/src', true, /Icon[A-Z]+\.tsx/i);
const icons = {
  general: {
    label: 'General Objects',
    icons: [],
  },
  interface: {
    label: 'User Interface',
    icons: [],
  },
  social: {
    label: 'Social Media',
    icons: [],
  },
};

context.keys().forEach(file => {
  const Icon = context(file).default;
  const [category] = file.slice(2).split('/Icon');

  icons[category].icons.push(Icon);
});

module.exports = icons;
