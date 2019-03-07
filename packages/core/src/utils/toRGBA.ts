import { Hexcode } from '../types';

export default function toRGBA(hexcode: Hexcode, opacity: number): string {
  const alpha = (isNaN(opacity) ? 100 : opacity) / 100;
  const hex = hexcode.replace('#', '');

  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const rd = hex.slice(0, 1) + hex.slice(0, 1);
  const gd = hex.slice(1, 2) + hex.slice(1, 2);
  const bd = hex.slice(2, 3) + hex.slice(2, 3);
  const r = parseInt(rd, 16);
  const g = parseInt(gd, 16);
  const b = parseInt(bd, 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
