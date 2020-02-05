import React, { useContext, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';
import T from '@airbnb/lunar/lib/components/Translate';
import Hotkey from './Hotkey';
import ComposerContext from '../contexts/ComposerContext';
import {
  activeWhenShadowExists,
  selectShadowSuggestion,
  onChangeLoadAndCacheSuggestions,
  onChangeSetShadowIfMatch,
} from '../helpers/suggestions';
import Trie from '../helpers/Trie';
import { SuggestionConfig, ChangeHandler } from '../types';

export type SuggestionsProps = {
  /** Disable caching of loaded suggestions into session storage. */
  noCache?: boolean;
  /** Callback fired to load type head suggestions. */
  onLoad: (phrase: string) => Promise<SuggestionConfig[]>;
  /** Time in milliseconds to debounce each load. Defaults to 200. */
  throttle?: number;
};

export default function Suggestions({ noCache = false, throttle = 200, onLoad }: SuggestionsProps) {
  const context = useContext(ComposerContext);
  const trie = useRef(new Trie<string>()).current;

  // Handlers
  const handleLoadSuggestions = useCallback(
    debounce<ChangeHandler>(
      (value, ctx) =>
        onChangeLoadAndCacheSuggestions(value, onLoad, !noCache, trie).then(() => {
          // This may be out of date (more letters have been typed),
          // since we chain on the async call. However, if they do
          // stop typing, we need to update the shadow regardless.
          onChangeSetShadowIfMatch(value, ctx, trie);
        }),
      throttle,
      {
        leading: true,
      },
    ),
    [throttle, onLoad, noCache, trie],
  );

  const handleShadowMatch = useCallback(
    debounce<ChangeHandler>((value, ctx) => onChangeSetShadowIfMatch(value, ctx, trie), throttle),
    [throttle, trie],
  );

  // Enable feature
  context.flags.suggestions = true;
  context.onChange(handleLoadSuggestions);
  context.onChange(handleShadowMatch);

  return (
    <Hotkey
      preventDefault
      combo="tab"
      condition={activeWhenShadowExists}
      name="tabSelectSuggestion"
      label={T.phrase('to select', null, { key: 'lunar.composer.suggestions.hotkey.select' })}
      onRun={selectShadowSuggestion}
    />
  );
}
