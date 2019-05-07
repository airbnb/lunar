import { WidthProperties } from './types';

export const SELECTION_OPTIONS = {
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  INACTIVE: 'INACTIVE',
  HAS_ACTIVE_CHILD: 'HAS_ACTIVE_CHILD',
};

export const STATUS_OPTIONS = {
  ALERT: 'ALERT',
  WARNING: 'WARNING',
};

type HeightMap = {
  [key: string]: number;
};

export const HEIGHT_TO_PX: HeightMap = {
  micro: 32,
  small: 48,
  regular: 56,
  large: 64,
  jumbo: 108,
};

export const DEFAULT_WIDTH_PROPERTIES: WidthProperties = {
  width: 50,
  flexGrow: 1,
  flexShrink: 1,
  minWidth: 0,
};

export const EXPANDABLE_COLUMN_WIDTH = 50;

export const SELECTABLE_COLUMN_WIDTH = 50;
export const SELECTABLE_COLUMN_WIDTH_EXPANDABLE = 39;
