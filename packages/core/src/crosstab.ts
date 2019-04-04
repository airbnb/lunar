/* global BroadcastChannel */

export type Handler = (value: any) => void;

export type Message = {
  key: string;
  value: any;
};

export class Crosstab {
  channel: BroadcastChannel;

  handlers: Map<string, Set<Handler>>;

  constructor() {
    this.channel = new BroadcastChannel('crosstab');
    this.channel.addEventListener('message', this.handleMessage);

    this.handlers = new Map();
  }

  on(key: string, handler: Handler) {
    const set = this.handlers.get(key) || new Set();

    set.add(handler);
    this.handlers.set(key, set);
  }

  off(key: string, handler?: Handler) {
    if (handler) {
      const handlersForKey = this.handlers.get(key);

      if (handlersForKey) {
        handlersForKey.delete(handler);
      }
    } else {
      this.handlers.delete(key);
    }
  }

  emit(key: string, value?: any, selfEmit: boolean = false) {
    const message: Message = {
      key,
      value,
    };

    this.channel.postMessage(message);

    if (selfEmit) {
      this.handleMessage({ data: message });
    }
  }

  private handleMessage = ({ data }: { data: Message }) => {
    const handlersForKey = this.handlers.get(data.key);

    if (handlersForKey) {
      handlersForKey.forEach(handler => {
        handler(data.value);
      });
    }
  };
}

export default new Crosstab();
