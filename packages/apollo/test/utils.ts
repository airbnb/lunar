// eslint-disable-next-line import/prefer-default-export
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
