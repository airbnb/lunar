/* eslint-disable no-alert, no-console */

import React from 'react';
import IconPhone from '@airbnb/lunar-icons/lib/general/IconPhone';
import Composer, {
  Actions,
  ActionButton,
  Emojis,
  EmojiButton,
  Hotkey,
  Preview,
  Shortcuts,
  Suggestions,
  ShortcutConfig,
  SuggestionConfig,
  ActionConfig,
  DataSet,
} from '.';

export const actions: ActionConfig[] = [
  {
    label: 'Call',
    group: 'Do…',
    icon: IconPhone,
    onRun() {
      alert('Call!');
    },
  },
];

export const shortcuts: ShortcutConfig[] = [
  {
    name: 'macro',
    description: 'Select a prewritten response',
    arguments: [{ name: 'name', optional: true }],
    onRun() {
      alert('Macro!');
    },
  },
  {
    name: 'upload',
    description: 'Select and share PDFs, images, and more',
    onRun() {
      alert('Upload!');
    },
  },
  {
    name: 'call',
    description: 'Start a call',
    onRun() {
      alert('Call!');
    },
  },
  {
    name: 'cancel',
    description: 'Cancel a booking',
    arguments: [
      {
        name: 'code',
        validator(code: string) {
          if (!code.match(/\d+/)) {
            throw new Error('Code must be a number!');
          }
        },
      },
    ],
    onRun() {
      alert('Cancel!');
    },
  },
];

export const suggestions: { [phrase: string]: SuggestionConfig[] } = {
  he: [
    {
      suggestion: 'Hello, world!',
    },
  ],
  hell: [
    {
      suggestion: 'Hell nah!',
    },
  ],
  hello: [
    {
      suggestion: 'Hello there General Kenobi!',
    },
  ],
};

export function loadSuggestions(phrase: string): Promise<SuggestionConfig[]> {
  return new Promise(resolve => {
    setTimeout(
      () => {
        const key = phrase.toLowerCase();

        if (suggestions[key]) {
          resolve(suggestions[key]);
        } else {
          resolve([]);
        }
      },
      process.env.NODE_ENV === 'test' ? 0 : 500,
    );
  });
}

export function checkText() {
  return Promise.resolve([
    {
      message: '',
      short_message: 'Uncapitalized',
      offset: 59,
      length: 2,
      replacements: ['Or'],
      rule_id: 'UPPERCASE_SENTENCE_START',
    },
    {
      message: '',
      short_message: 'Incorrect word',
      offset: 76,
      length: 3,
      replacements: ['to'],
      rule_id: 'TOO_TO',
    },
    {
      message: '',
      short_message: 'Typo',
      offset: 84,
      length: 2,
      replacements: ['a'],
      rule_id: 'EN_A_VS_AN',
    },
    {
      message: '',
      short_message: 'Double words',
      offset: 91,
      length: 5,
      replacements: ['of'],
      rule_id: 'ENGLISH_WORD_REPEAT_RULE',
    },
    {
      message: '',
      short_message: 'Typo',
      offset: 126,
      length: 6,
      replacements: ['detect'],
      rule_id: 'MORFOLOGIK_RULE_EN_US',
    },
    {
      message: '',
      short_message: 'Typo',
      offset: 146,
      length: 6,
      replacements: ['think'],
      rule_id: 'NON3PRS_VERB',
    },
    {
      message: '',
      short_message: 'Typo',
      offset: 181,
      length: 3,
      replacements: ['note'],
      rule_id: 'PLEASE_NOT_THAT',
    },
  ]);
}

const props = {
  onChange: typeof action === 'undefined' ? () => {} : action('onChange'),
  onSubmit(result: DataSet) {
    alert('Submitted!');
  },
};

function Wrapper({ children, message }: { children?: React.ReactNode; message?: string }) {
  return (
    <div style={{ width: 450 }}>
      <div style={{ height: 300 }}>{message ?? 'Messages...'}</div>
      {children}
    </div>
  );
}

export default {
  title: 'Composer',
  excludeStories: ['actions', 'shortcuts', 'suggestions', 'loadSuggestions', 'checkText'],
  parameters: {
    inspectComponents: [Composer, Actions, Emojis, Hotkey, Preview, Shortcuts, Suggestions],
  },
};

export function defaultStory() {
  return (
    <Wrapper>
      <Composer {...props} />
    </Wrapper>
  );
}

defaultStory.story = {
  name: 'Default.',
};

export function disabledInput() {
  return (
    <Wrapper>
      <Composer disabled {...props} />
    </Wrapper>
  );
}

disabledInput.story = {
  name: 'Disabled input.',
};

export function invalidInputWithErrorState() {
  return (
    <Wrapper message="Type some characters and try submitting the form.">
      <Composer
        {...props}
        onSubmit={() => {
          throw new Error('Nope, good luck submitting this form!');
        }}
      />
    </Wrapper>
  );
}

invalidInputWithErrorState.story = {
  name: 'Invalid input with error state.',
};

export function withActions() {
  return (
    <Wrapper>
      <Composer {...props} beforeButton={<ActionButton />}>
        <Actions actions={actions} />
      </Composer>
    </Wrapper>
  );
}

withActions.story = {
  name: 'With actions.',
};

export function withEmojis() {
  return (
    <Wrapper>
      <Composer {...props} afterButton={<EmojiButton />}>
        <Emojis internal />
      </Composer>
    </Wrapper>
  );
}

withEmojis.story = {
  name: 'With emojis.',
};

export function withHotkeys() {
  return (
    <Wrapper>
      <Composer {...props}>
        <Hotkey
          condition={() => true}
          name="custom"
          combo="shift+cmd+g"
          label="custom"
          onRun={() => alert('Hotkey ran!')}
        />
      </Composer>
    </Wrapper>
  );
}

withHotkeys.story = {
  name: 'With hotkeys.',
};

export function withTypeAheadSuggestions() {
  return (
    <Wrapper message={'Start typing "Hello" to load suggestions!'}>
      <Composer {...props}>
        <Suggestions noCache onLoad={loadSuggestions} />
      </Composer>
    </Wrapper>
  );
}

withTypeAheadSuggestions.story = {
  name: 'With type ahead suggestions.',
};

export function withPreview() {
  return (
    <Wrapper>
      <Composer {...props} defaultValues={{ value: 'Lorem ipsum dolor sit amet.' }}>
        <Preview />
      </Composer>
    </Wrapper>
  );
}

withPreview.story = {
  name: 'With preview.',
};

export function withPreviewConfirmation() {
  return (
    <Wrapper>
      <Composer {...props} defaultValues={{ value: 'Lorem ipsum dolor sit amet.' }}>
        <Preview requireConfirmation />
      </Composer>
    </Wrapper>
  );
}

withPreviewConfirmation.story = {
  name: 'With preview and required confirmation.',
};

export function withProofreading() {
  return (
    <Wrapper>
      <Composer
        {...props}
        defaultValues={{
          value:
            "Click the colored phrases for details on potential errors. or use this text too see an few of of the problems that Oxford can detecd. What do you thinks of grammar checkers? Please not that they are not perfect. Style issues get a blue marker: It's 5 P.M. in the afternoon.",
        }}
      >
        <Preview onProofread={checkText} />
      </Composer>
    </Wrapper>
  );
}

withProofreading.story = {
  name: 'With proofreading.',
};

export function withShortcuts() {
  return (
    <Wrapper message={'Start typing with "/" to open the shortcuts menu!'}>
      <Composer {...props}>
        <Shortcuts shortcuts={shortcuts} />
      </Composer>
    </Wrapper>
  );
}

withShortcuts.story = {
  name: 'With shortcuts.',
};

export function everything() {
  return (
    <Wrapper>
      <Composer
        {...props}
        defaultValues={{ emailTo: 'foo@domain.com', emailSubject: 'Airbnb Customer Support' }}
        afterButton={<EmojiButton />}
        beforeButton={<ActionButton />}
      >
        <Preview />

        <Actions actions={actions} />

        <Emojis internal />

        <Suggestions onLoad={loadSuggestions} />

        <Shortcuts shortcuts={shortcuts} />

        <Hotkey
          condition={() => true}
          name="custom"
          combo="shift+cmd+g"
          label="custom"
          order={50}
          onRun={() => alert('Hotkey ran!')}
        />
      </Composer>
    </Wrapper>
  );
}

everything.story = {
  name: 'Everything.',
};
