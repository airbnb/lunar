/* eslint-disable no-param-reassign */

export default function passThroughRef<T>(handler?: React.Ref<T>, ref: T | null = null) {
  if (!handler) {
    return;
  }

  if (typeof handler === 'string') {
    throw new TypeError('String refs are not supported. Use React.createRef() instead.');
  } else if (typeof handler === 'function') {
    handler(ref);
  } else if (typeof handler === 'object' && 'current' in handler) {
    // @ts-ignore
    handler.current = ref;
  }
}
