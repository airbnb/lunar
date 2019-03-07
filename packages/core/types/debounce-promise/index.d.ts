declare module 'debounce-promise' {
  export default function debouncePromise<T>(
    callback: (value: any) => Promise<T>,
    wait?: number,
    options?: { leading?: boolean; accumulate?: boolean },
  ): (value: any) => Promise<T>;
}
