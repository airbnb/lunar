import buildTheme from './buildTheme';
import { Theme } from '../types';

const brand: Theme['color']['brand'] = {
  luxury: ['#1E1040', '#2F1A71', '#3D279B', '#4D3CBE', '#665CDA', '#8A88F0', '#BFC1FF'],
  plus: ['#40101C', '#550D23', '#6E0E31', '#8C1848', '#AE336D', '#D467A1', '#FFBFE4'],
};

const color: Theme['color']['core'] = {
  // Gray
  neutral: ['#2F2F2F', '#373737', '#474747', '#777777', '#B1B1B1', '#D1D1D1', '#F0F0F0'],
  // Blue
  secondary: ['#073260', '#0A437F', '#105094', '#1561B2', '#237CDA', '#8AB0D9', '#B9D0E8'],
  // Any
  primary: ['#38108A', '#41159C', '#5A1FD1', '#9362F9', '#AD87FF', '#CDBCFF', '#DACDFF'],
  // Green
  success: ['#0E6208', '#1C7315', '#227D1B', '#4AA83E', '#5ED24F', '#328D28', '#227D1B'],
  // Yellow/Orange
  warning: ['#613806', '#97590E', '#AF6D1C', '#FF8C00', '#F7A800', '#FFB400', '#FFDA80'],
  // Red/Pink
  danger: ['#5B0606', '#650B0B', '#710909', '#B71C1C', '#EF5D5D', '#FB8585', '#FFA8A8'],
};

export default (fontFamily: string) =>
  buildTheme({
    base: '#181818',
    boxShadowColor: '#000',
    brand,
    color,
    disabledOpacity: 0.2,
    fontFamily,
  });
