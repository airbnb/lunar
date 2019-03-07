/* eslint-disable no-bitwise */

const sizes = {
  b: 1,
  kb: 1 << 10,
  mb: 1 << 20,
  gb: 1 << 30,
};

export default function toBytes(value: number): string {
  const bytes = Math.abs(value);
  let unit: keyof typeof sizes = 'b';

  if (bytes >= sizes.gb) {
    unit = 'gb';
  } else if (bytes >= sizes.mb) {
    unit = 'mb';
  } else if (bytes >= sizes.kb) {
    unit = 'kb';
  }

  return `${(bytes / sizes[unit]).toFixed(2).replace('.00', '')} ${unit.toUpperCase()}`;
}
