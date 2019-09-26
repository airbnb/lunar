export { getIn, setIn } from 'final-form';

/**
 * Return true if the value is primitive.
 */
export function isPrimitive(value: unknown): boolean {
  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return true;

    default:
      return false;
  }
}

/**
 * Return an empty string for non-primitives, otherwise cast to a string.
 */
export function toString(value: unknown): string {
  return isPrimitive(value) ? String(value) : '';
}

/**
 * Return false for non-primitives, otherwise cast to a boolean.
 * Support "true", "on", and "1" (recommended) strings as true boolean values.
 */
export function toBool(value: unknown): boolean {
  if (!isPrimitive(value)) {
    return false;
  }

  const bool = String(value)
    .toLowerCase()
    .trim();

  return bool === 'true' || bool === '1' || bool === 'on';
}

/**
 * Return 0 for non-primitive, falsy, or NaN values, otherwise cast to a number.
 */
export function toNumber(value: unknown): number {
  if (!value || !isPrimitive(value)) {
    return 0;
  }

  const number = Number(value);

  return Number.isNaN(number) ? 0 : number;
}

/**
 * Return "1" for a truthy value and "" for a falsy one.
 * If the value is undefined, return the initial checked state.
 */
export function fromBool(value: unknown, checked: boolean = true): string {
  if (typeof value === 'undefined') {
    return checked ? '1' : '';
  }

  return value ? '1' : '';
}

type Nullable<T> = T | null;

/**
 * Only allows one promise to be running at a time, and calls the last invocation when complete.
 * Very similar to a traditional debounce, but it debounces on the Promise completing instead of a
 * timer.
 */
export function throttleToSinglePromise<T, U extends unknown[]>(
  callback: (...args: U) => Promise<T>,
): (...args: U) => Promise<T> {
  let currentPromise: Nullable<Promise<T>> = null;
  let nextPromise: Nullable<() => Promise<T>> = null;
  let nextArgs: Nullable<U> = null;

  const singleThreadedPromise: (...args: U) => Promise<T> = (...args: U) => {
    if (currentPromise) {
      nextArgs = args;

      if (!nextPromise) {
        nextPromise = () => {
          currentPromise = null;
          nextPromise = null;

          return singleThreadedPromise(...nextArgs!);
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      return currentPromise.finally(nextPromise);
    }

    currentPromise = Promise.resolve(callback(...args)).finally(() => {
      currentPromise = null;
    });

    return currentPromise;
  };

  return singleThreadedPromise;
}
