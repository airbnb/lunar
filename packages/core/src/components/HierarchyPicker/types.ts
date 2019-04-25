import { Item as AutocompleteItem } from '../Autocomplete';

export interface ItemShape {
  /** Identifier used in chosen definition. */
  name: string;
  /** Localized content displayed in lieu of name. */
  label?: string;
  /** Long-worded localized description of an item. */
  description?: string;
  /** Optional flag to signal item should not be pickable. */
  readonly?: boolean;
  /** Optional keywords for use in search. */
  keywords?: string;
  /** Optional recursive sub-items. */
  items?: ItemShape[] | null;
  /** Optional menu section label. */
  section?: string;
}

export type FuseMatch = {
  indices?: number[][];
  key: string;
  value: string;
};

export type TreePath = string[];

export interface SearchItemShape extends ItemShape {
  definition: TreePath;
  label: string;
  formattedParents: string;
}

export interface SearchItemResult extends AutocompleteItem {
  item: SearchItemShape;
  matches: FuseMatch[];
}

export type TopicOriginKey = 'Hierarchy' | 'Search';

export type ChoiceDetails = { origin: TopicOriginKey; charCount?: number };

export type Labeler = (chosen: TreePath) => string;

export type Formatter = (chosen: TreePath) => string;

export type ItemRenderer = (
  item: ItemShape,
  selected: boolean,
  focused: boolean,
) => NonNullable<React.ReactNode>;

export type ItemPickedHandler = (chosen: TreePath | null, details?: ChoiceDetails) => void;

export type DeepFocusHandler = () => void;

export type ToggleHandler = (open: boolean) => void;

export type ShallowFocusHandler = () => void;

export type SubTreeHandler = (
  path: TreePath,
  onDeeper?: DeepFocusHandler,
  immediate?: boolean,
) => void;
