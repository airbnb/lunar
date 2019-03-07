import buildTheme from './buildTheme';
import { Theme, ColorRange } from '../types';

const brand: Theme['color']['brand'] = {
  luxury: ['#1E1040', '#2F1A71', '#3D279B', '#4D3CBE', '#665CDA', '#8A88F0', '#BFC1FF'],
  plus: ['#40101C', '#550D23', '#6E0E31', '#8C1848', '#AE336D', '#D467A1', '#FFBFE4'],
};

const color: Theme['color']['core'] = {
  // Gray
  neutral: ['#141414', '#222222', '#303030', '#363839', '#767676', '#9D9D9D', '#F8F8F8'],
  // Blue
  secondary: [
    '#E3ECF6',
    '#B9D0E8',
    '#8AB0D9',
    '#1561B2',
    '#0F4FA2',
    '#0C4599',
    '#06338A',
  ].reverse() as ColorRange,
  // Any
  primary: ['#4D00E5', '#581BFF', '#6320FF', '#6f44ff', '#835EFE', '#CABAFE', '#EAE3FF'],
  // Green
  success: [
    '#E9F5E8',
    '#C9E5C5',
    '#A5D49F',
    '#4AA83E',
    '#3A9730',
    '#328D28',
    '#227D1B',
  ].reverse() as ColorRange,
  // Yellow/Orange
  warning: [
    '#FFF5DB',
    '#FFE196',
    '#FFDA80',
    '#FFB400',
    '#F7A800',
    '#FF9C00',
    '#FF8C00',
  ].reverse() as ColorRange,
  // Red/Pink
  danger: ['#A92828', '#B53838', '#BC4141', '#C95252', '#D16C6C', '#D98686', '#EF9191'],
};

export default (fontFamily: string) =>
  buildTheme({
    base: '#000',
    brand,
    color,
    fontFamily,
  });
