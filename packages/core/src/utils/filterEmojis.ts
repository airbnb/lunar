import { Hexcode, fromUnicodeToHexcode } from 'emojibase';
import BASE_EMOJI_REGEX from 'emojibase-regex';

const EMOJI_REGEX = new RegExp(BASE_EMOJI_REGEX.source, 'g');

export default function filterEmojis(content: string, allowed: Hexcode[] = []): string {
  const whitelist = new Set(allowed);

  return content.replace(EMOJI_REGEX, (unicode) =>
    whitelist.has(fromUnicodeToHexcode(unicode)) ? unicode : '',
  );
}
