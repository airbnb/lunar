import ThemeProvider from '@airbnb/lunar/lib/providers/ThemeProvider';
import DirectionProvider from '@airbnb/lunar/lib/providers/DirectionProvider';

export default [
  {
    icon: 'paintbrush',
    title: 'Change the theme',
    components: [ThemeProvider],
    params: [
      { name: 'Light', props: { name: 'light', propagate: true }, default: true },
      { name: 'Dark', props: { name: 'dark', propagate: true } },
    ],
  },
  {
    icon: 'globe',
    title: 'Change the direction',
    components: [DirectionProvider],
    params: [
      { name: 'Left-to-Right', props: { dir: 'ltr' }, default: true },
      { name: 'Right-to-Left', props: { dir: 'rtl' } },
    ],
  },
];
