export default function deprecate(method: (...args: unknown[]) => unknown, message?: string) {
  return (...args: unknown[]) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.warn(
        message ||
          'This method has been deprecated and will be removed in a future release of Lunar.',
      );
    }

    return method(...args);
  };
}
