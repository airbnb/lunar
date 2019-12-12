import buildTheme from './buildTheme';
import { Theme } from '../types';

const brand: Theme['color']['brand'] = {
  luxury: ['#BFC1FF', '#8A88F0', '#665CDA', '#4D3CBE', '#3D279B', '#2F1A71', '#1E1040'],
  plus: ['#FFBFE4', '#D467A1', '#AE336D', '#8C1848', '#6E0E31', '#550D23', '#40101C'],
};

const color: Theme['color']['core'] = {
  // Gray
  neutral: ['#F8F8F8', '#EBEBEB', '#D6D6D6', '#C2C2C2', '#767676', '#484848', '#303030'],
  // Blue
  secondary: ['#E3ECF6', '#B9D0E8', '#8AB0D9', '#1561B2', '#0F4FA2', '#0C4599', '#06338A'],
  // Any
  primary: ['#EAE3FF', '#CABAFE', '#835EFE', '#6f44ff', '#6320FF', '#581BFF', '#4D00E5'],
  // Green
  success: ['#E9F5E8', '#C9E5C5', '#A5D49F', '#4AA83E', '#3A9730', '#328D28', '#227D1B'],
  // Yellow/Orange
  warning: ['#FFF5DB', '#FFE196', '#FFDA80', '#FFB400', '#F7A800', '#FF9C00', '#FF8C00'],
  // Red/Pink
  danger: ['#FCEBEB', '#EF9191', '#E44444', '#DF2323', '#D21515', '#C50A0A', '#B71C1C'],
};

export default (fontFamily: string) =>
  buildTheme({
    base: '#fff',
    boxShadowColor: color.neutral[6],
    brand,
    color,
    fontFamily,
  });
