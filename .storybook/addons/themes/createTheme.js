import { create } from '@storybook/theming';

export default function createTheme(type, theme, fontFamily) {
  return create({
    base: type,

    colorPrimary: theme.color.core.primary[3],
    colorSecondary: theme.color.core.secondary[3],

    // UI
    appBg: theme.color.core.neutral[1],
    appContentBg: theme.color.accent.bg,
    appBorderColor: theme.color.accent.border,
    appBorderRadius: theme.ui.borderRadius,

    // Typography
    fontBase: fontFamily,
    fontCode: 'monospace',

    // Text colors
    textColor: theme.color.accent.text,
    textInverseColor: theme.color.base,

    // Toolbar default and active colors
    barTextColor: theme.color.accent.text,
    barSelectedColor: theme.color.core.primary[3],
    barBg: theme.color.accent.bgHover,

    // Form colors
    inputBg: theme.color.base,
    inputBorder: theme.color.accent.border,
    inputTextColor: theme.color.accent.text,
    inputBorderRadius: theme.ui.borderRadius,

    // Brand
    brandTitle: `Lunar (${type})`,
    brandUrl: 'https://airbnb.io/lunar',
    brandImage: 'https://placehold.it/350x150',
  });
}
