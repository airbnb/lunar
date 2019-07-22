export type Params<T = any> = { [key: string]: T };

export type CaptureOptions = {
  contexts?: Params<Params>;
  extra?: Params;
  fingerprint?: string[];
  tags?: Params<string>;
};
