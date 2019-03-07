export default function createRange(start: number, stop: number, step: number = 1): string[] {
  const range: string[] = [];

  for (let i = start; i <= stop; i += step) {
    range.push(String(i)); // Forms require a string
  }

  return range;
}
