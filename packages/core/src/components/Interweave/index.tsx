import React from 'react';
import BaseInterweave, {
  InterweaveProps as BaseInterweaveProps,
  MatcherInterface,
  FilterInterface,
} from 'interweave';
import { EmailMatcher, UrlMatcher } from 'interweave-autolink';
import { EmojiMatcher, useEmojiData } from 'interweave-emoji';
import Core from '../..';
import EmailFactory from './factories/Email';
import UrlFactory from './factories/Url';
import transformer from './factories/transformer';

export const globalMatchers: MatcherInterface<{}>[] = [];

export const globalFilters: FilterInterface[] = [];

const emojiOptions = {
  convertEmoticon: false,
  convertShortcode: true,
  convertUnicode: true,
  enlargeThreshold: 3,
};

export const urlMatcher = new UrlMatcher(
  'url',
  {
    customTLDs: ['tools'],
  },
  UrlFactory,
);

export const emailMatcher = new EmailMatcher('email', {}, EmailFactory);

export const emojiMatcher = new EmojiMatcher('emoji', emojiOptions);

export const emojiMatcherWithEmoticons = new EmojiMatcher('emoji', {
  ...emojiOptions,
  convertEmoticon: true,
});

export type InterweaveProps = BaseInterweaveProps & {
  /** Render any found links using large prop. */
  large?: boolean;
  /** Only run these matchers (by name). */
  onlyMatchers?: string[];
  /** Render any found links using small prop. */
  small?: boolean;
  /** Convert emoticons to emojis. */
  withEmoticons?: boolean;
};

/**
 * Safely render HTML, filter attributes, autowrap text with matchers, render emoji characters,
 * and much more.
 */
export default function Interweave({
  content,
  filters = [],
  matchers = [],
  onlyMatchers = [],
  withEmoticons,
  ...props
}: InterweaveProps) {
  const [, emojiSource] = useEmojiData({
    avoidFetch: process.env.NODE_ENV === 'test',
    throwErrors: false,
  });
  const finalFilters = [...globalFilters, ...filters];
  let finalMatchers = [
    ...globalMatchers,
    emailMatcher,
    urlMatcher,
    withEmoticons ? emojiMatcherWithEmoticons : emojiMatcher,
    ...matchers,
  ];

  if (onlyMatchers.length > 0) {
    finalMatchers = finalMatchers.filter(matcher => onlyMatchers.includes(matcher.propName));
  }

  return (
    <BaseInterweave
      newWindow
      content={content}
      emojiSize="1.25em"
      filters={finalFilters}
      matchers={finalMatchers}
      transform={transformer}
      {...props}
      emojiPath={Core.settings.emojiCDN}
      emojiSource={emojiSource}
    />
  );
}
