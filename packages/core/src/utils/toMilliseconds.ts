import ms from 'ms';

export default function toMilliseconds(format: string): number {
  return ms(format);
}
