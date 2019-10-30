import React from 'react';
import { renderAndWait } from 'rut';
import BaseInterweave from 'interweave';
import { UrlMatcher } from 'interweave-autolink';
import Interweave, {
  Props,
  emailMatcher,
  emojiMatcher,
  emojiMatcherWithEmoticons,
  urlMatcher,
} from '../../src/components/Interweave';
import Url from '../../src/components/Interweave/factories/Url';
import Email from '../../src/components/Interweave/factories/Email';
import Link from '../../src/components/Link';

describe('<Interweave />', () => {
  it('passes content', async () => {
    const { root } = await renderAndWait<Props>(<Interweave content="Foo" />);

    expect(root.findOne(BaseInterweave)).toHaveProp('content', 'Foo');
  });

  it('autolinks urls', async () => {
    const { root } = await renderAndWait<Props>(<Interweave content="Foo http://test.com bar" />);

    expect(root.find(Link.WrappedComponent)).toHaveLength(1);
  });

  it('set large size prop if urls and emails are present', async () => {
    const { root } = await renderAndWait<Props>(
      <Interweave large content="Foo http://test.com bar with an email@email.com" />,
    );

    expect(root.findOne(Url)).toHaveProp('large', true);
    expect(root.findOne(Url)).not.toHaveProp('small');
    expect(root.findOne(Email)).toHaveProp('large', true);
    expect(root.findOne(Email)).not.toHaveProp('small');
  });

  it('set small size prop if urls and emails are present', async () => {
    const { root } = await renderAndWait<Props>(
      <Interweave small content="Foo http://test.com bar with an email@email.com" />,
    );

    expect(root.findOne(Url)).not.toHaveProp('large');
    expect(root.findOne(Url)).toHaveProp('small', true);
    expect(root.findOne(Email)).not.toHaveProp('large');
    expect(root.findOne(Email)).toHaveProp('small', true);
  });

  it('autolinks emails', async () => {
    const { root } = await renderAndWait<Props>(<Interweave content="Foo test@domain.com bar" />);

    expect(root.find(Link.WrappedComponent)).toHaveLength(1);
  });

  it('can pass custom props', async () => {
    const { root } = await renderAndWait<Props>(<Interweave content="Foo" emojiSize="3em" />);

    expect(root.findOne(BaseInterweave)).toHaveProp('emojiSize', '3em');
  });

  it('adds url, email, and emoji global matchers by default', async () => {
    const { root } = await renderAndWait<Props>(<Interweave withEmoticons content="Foo" />);

    expect(root.findOne(BaseInterweave)).toHaveProp('matchers', [
      emailMatcher,
      urlMatcher,
      emojiMatcherWithEmoticons,
    ]);
  });

  it('merges custom matchers with global matchers', async () => {
    const matcher = new UrlMatcher('foo');
    const { root } = await renderAndWait<Props>(<Interweave content="Foo" matchers={[matcher]} />);

    expect(root.findOne(BaseInterweave)).toHaveProp('matchers', [
      emailMatcher,
      urlMatcher,
      emojiMatcher,
      matcher,
    ]);
  });

  it('filters matchers to the only list', async () => {
    const { root } = await renderAndWait<Props>(
      <Interweave content="Foo" onlyMatchers={['url', 'emoji']} />,
    );

    expect(root.findOne(BaseInterweave)).toHaveProp('matchers', [urlMatcher, emojiMatcher]);
  });
});
