import { HeaderButton } from '../types';

export default function shouldRenderTableHeader(
  editable: boolean,
  extraHeaderButtons: HeaderButton[],
  tableHeaderLabel: string,
) {
  return editable || extraHeaderButtons!.length > 0 || !!tableHeaderLabel;
}
