import T from '../Translate';
import { TreePath, Labeler } from './types';

export default function defaultFormatter(chosen: TreePath, getLabel: Labeler): string {
  if (chosen.length > 0) {
    const labels = chosen.map((_, i, a) => getLabel(a.slice(0, i + 1)));

    return labels.join(' > ');
  }

  return T.phrase('lunar.picker.selectPlaceholder', 'Select from hierarchy');
}
