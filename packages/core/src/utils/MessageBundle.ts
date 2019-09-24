import Core from '..';

export type Messages = {
  [locale: string]: string;
};

export type Options = {
  default?: string;
};

export default class MessageBundle {
  messages: Messages;

  options: Options;

  constructor(messages: Messages, options: Options = {}) {
    this.messages = messages;
    this.options = options;
  }

  get(locale?: string): string {
    const message =
      // Try to use localized message first
      this.messages[locale || Core.locale()] ||
      // Or use default if defined
      this.options.default ||
      // Lastly, fallback to English
      this.messages.en;

    return message;
  }
}
