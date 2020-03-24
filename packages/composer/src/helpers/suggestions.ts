import { isShortcutCommand } from './shortcuts';
import Trie from './Trie';
import { SuggestionConfig, SuggestionLoader, ReadableContext, WritableContext } from '../types';

const MAX_WORD_COUNT = 5;

/**
 * When a user is typing, we need to extract the partial sentence (a phrase) to find
 * type ahead suggestions, so that the sentence can be completed. To achieve this,
 * we need to loop backwards through the string and find all words before we hit a delimiter:
 * a space, period, question, or exclamation mark.
 */
export function extractPhraseFromLastDelimiter(value: string): string | null {
  if (!value.trim()) {
    return '';
  }

  const words: string[] = [];
  let index = value.length - 1;
  let currentWord = '';

  function addWord() {
    if (currentWord) {
      words.unshift(currentWord);
      currentWord = '';
    }
  }

  while (index > -1) {
    const char = value[index];

    // Word boundary found
    if (char === ' ') {
      addWord();
    }

    // Delimiter found
    if (char === '\n' || char === '.' || char === '?' || char === '!') {
      addWord();

      break;
    }

    // Max words found
    if (words.length === MAX_WORD_COUNT) {
      break;
    }

    if (char !== ' ') {
      currentWord = char + currentWord;
    }

    index -= 1;
  }

  addWord();

  return words.length > 0 ? words.join(' ') : null;
}

/**
 * Load the list of suggestions into the trie. We split on each word in
 * the suggestion itself so that partial matches will also work. For example,
 * if the suggestion was "Hello there General Kenobi!", and the phrase that
 * loaded it was "Hello th", then the trie would look like:
 *
 *  "Hello" -> "Hello there General Kenobi!"
 *  "Hello there" -> ...
 *  "Hello there General" -> ...
 *  "Hello there General Kenobi!" -> ...
 *
 * That way, regardless of what they have been typing, a match will be found.
 * Otherwise only "Hello th" would trigger the shadow.
 */
export function loadSuggestionsIntoTrie(
  trie: Trie<string>,
  phrase: string,
  suggestions: SuggestionConfig[],
) {
  suggestions.forEach(({ suggestion }) => {
    let prefix = '';

    suggestion.split(' ').forEach((word) => {
      trie.set(prefix + word, suggestion.startsWith(phrase) ? suggestion : phrase + suggestion);

      prefix += word;
      prefix += ' ';
    });
  });
}

/**
 * When the value changes, extract the phrase and attempt to find a
 * suggestion match by traversing the trie structure. If a match is found,
 * update the shadow value.
 */
export function onChangeSetShadowIfMatch(
  nextValue: string,
  { setData }: WritableContext,
  trie: Trie<string>,
) {
  if (!nextValue || isShortcutCommand(nextValue)) {
    return;
  }

  const phrase = extractPhraseFromLastDelimiter(nextValue);

  if (!phrase) {
    return;
  }

  const match = trie.match(phrase, 1);

  if (match.length > 0) {
    setData('shadowValue', nextValue.replace(phrase, match[0]).trim());
  }
}

/**
 * Load suggestions from the endpoint and cache them to session storage.
 * We use session storage so that they aren't cached permanently.
 */
export async function onChangeLoadAndCacheSuggestions(
  value: string,
  loader: SuggestionLoader,
  cache: boolean,
  trie: Trie<string>,
): Promise<void> {
  if (!value || isShortcutCommand(value)) {
    return;
  }

  const phrase = extractPhraseFromLastDelimiter(value);

  if (!phrase) {
    return;
  }

  const cacheKey =
    cache && typeof sessionStorage !== 'undefined' ? `composer.suggestions.${btoa(phrase)}` : '';

  // Read from cache
  if (cacheKey) {
    const cachedValue = sessionStorage.getItem(cacheKey);

    if (cachedValue) {
      loadSuggestionsIntoTrie(trie, phrase, JSON.parse(cachedValue));

      return;
    }
  }

  // Load and fetch suggestions
  const suggestions = await loader(phrase);

  if (suggestions.length === 0) {
    return;
  }

  loadSuggestionsIntoTrie(trie, phrase, suggestions);

  // Write to cache
  if (cacheKey) {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(suggestions));
    } catch {
      // Ignore failues
    }
  }
}

export function activeWhenShadowExists({ data: { shadowValue, value } }: ReadableContext): boolean {
  return Boolean(shadowValue && value);
}

export function selectShadowSuggestion({ data, setData }: WritableContext) {
  setData('value', data.shadowValue);
  setData('shadowValue', '');
}
