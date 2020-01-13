import React, { useContext } from 'react';
import useStyles, { StyleSheet } from '@airbnb/lunar/lib/hooks/useStyles';
import { SYMBOLS } from '../../helpers/hotkeys';
import ComposerContext from '../../contexts/ComposerContext';
import HotkeyContext from '../../contexts/HotkeyContext';
import Tip from './Tip';
import Mark from './Mark';
import Symbol from './Symbol';

const styleSheet: StyleSheet = ({ color, font, unit }) => ({
  footer: {
    ...font.textSmall,
    textAlign: 'right',
    color: color.core.neutral[4],
    paddingTop: unit / 2,
    paddingBottom: unit / 2,
    lineHeight: 1,
  },
});

export default function Footer() {
  const context = useContext(ComposerContext);
  const { hotkeys } = useContext(HotkeyContext);
  const [styles, cx] = useStyles(styleSheet);

  // Select active hotkeys for the current view
  const tips = Array.from(hotkeys.values()).filter(hotkey => hotkey.condition(context));

  // Sort hotkeys by order
  tips.sort((a, b) => a.order! - b.order!);

  if (tips.length === 0) {
    return null;
  }

  return (
    <footer className={cx(styles.footer)}>
      {tips.map(tip => (
        <Tip key={tip.name || tip.combo}>
          <Mark>
            {tip.combo.split('+').map((symbol, i) => (
              <span key={symbol}>
                {i !== 0 && ' + '}
                <Symbol char={SYMBOLS[symbol] || symbol.toLowerCase()} />
              </span>
            ))}
          </Mark>

          {tip.label}
        </Tip>
      ))}
    </footer>
  );
}
