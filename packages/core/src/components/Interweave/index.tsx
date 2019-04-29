import React from 'react';
import BaseInterweave, {
  InterweaveProps as BaseInterweaveProps,
  MatcherInterface,
  FilterInterface,
} from 'interweave';
import { EmailMatcher, UrlMatcher } from 'interweave-autolink';
import withEmojiData, { WithEmojiDataProps, EmojiMatcher } from 'interweave-emoji';
import Core from '../..';
import EmailFactory from './factories/Email';
import UrlFactory from './factories/Url';
import transformer from './factories/transformer';

export const globalMatchers: MatcherInterface<any>[] = [];

export const globalFilters: FilterInterface[] = [];

const emojiOptions = {
  convertEmoticon: false,
  convertShortcode: true,
  convertUnicode: true,
  enlargeThreshold: 3,
};

const urlMatcher = new UrlMatcher(
  'url',
  {
    customTLDs: ['tools'],
  },
  UrlFactory,
);

const emailMatcher = new EmailMatcher('email', {}, EmailFactory);

const emojiMatcher = new EmojiMatcher('emoji', emojiOptions);

const emojiMatcherWithEmoticons = new EmojiMatcher('emoji', {
  ...emojiOptions,
  convertEmoticon: true,
});

export type Props = BaseInterweaveProps & {
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
export class Interweave extends React.PureComponent<Props & WithEmojiDataProps> {
  static defaultProps = {
    content: '',
    filters: [],
    large: false,
    matchers: [],
    onlyMatchers: [],
    small: false,
    withEmoticons: false,
  };

  render() {
    const { content, filters, matchers, onlyMatchers, withEmoticons, ...props } = this
      .props as Required<Props>;
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
        content={content}
        filters={finalFilters}
        matchers={finalMatchers}
        emojiPath={Core.settings.emojiCDN}
        emojiSize="1.25em"
        transform={transformer}
        newWindow
        {...props}
      />
    );
  }
}

export default withEmojiData({
  alwaysRender: true,
  throwErrors: false,
})(Interweave);
