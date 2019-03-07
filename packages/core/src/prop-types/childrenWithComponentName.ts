import { childrenOf, componentWithName } from 'airbnb-prop-types';
import { PASSTHROUGH_WRAPPER_NAMES, STRIP_HOC_NAMES } from '../constants';

export default function childrenWithComponentName(pattern: string | RegExp) {
  return childrenOf(
    componentWithName(
      pattern instanceof RegExp
        ? pattern
        : new RegExp(`(?:${PASSTHROUGH_WRAPPER_NAMES.join('|')})|(?:${pattern})$`),
      {
        stripHOCs: STRIP_HOC_NAMES,
      },
    ),
  );
}
