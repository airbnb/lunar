export type Params<T = unknown> = { [key: string]: T };

export type CaptureOptions = {
  contexts?: Params<Params>;
  extra?: Params;
  fingerprint?: string[];
  tags?: Params<string>;
};
