import { Omit } from 'utility-types/dist/mapped-types';

export function filterNulls<T>(value: T | null): value is T {
  return Boolean(value);
}

export function hasProps<T, K extends keyof T>(
  obj: T,
  ...props: K[]
): obj is T & { [k in K]-?: NonNullable<T[K]> } {
  return props.every(prop => obj[prop] !== null && obj[prop] !== undefined);
}
export function hasNoNullValues<T>(obj: T): obj is T & { [K in keyof T]: NonNullable<T[K]> } {
  return Object.values(obj).every(value => value !== null);
}

export type NonNullableKeys<T> = { [K in keyof T]: NonNullable<T[K]> };
export type Replace<T, K extends keyof T, T2> = Omit<T, K> & { [k in K]: T2 };
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & NonNullable<Pick<T, K>>;
export type Unpack<T> = T extends (infer U)[] ? U : T;
export type ValuesOf<T extends unknown[]> = T[number];
export type Writeable<T> = {
  -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? Writeable<U>[] : Writeable<T[P]>;
};

export type DeepReplaceType<T, IN, OUT> = {
  [K in keyof T]: IN extends T[K]
    ? (Exclude<T[K], IN> | OUT)
    : T[K] extends object
    ? DeepReplaceType<T[K], IN, OUT>
    : T[K];
};

export declare class Opaque<S extends { readonly _: symbol }> {
  private as: S;
}
