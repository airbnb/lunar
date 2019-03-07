/* eslint-disable camelcase */

import Core from '..';

type Member = {
  first_name?: string;
  last_name?: string;
};

export default function getMemberName(
  member: Member,
  shorten: boolean = false,
  copy: string = '',
): string {
  if (!member.first_name) {
    return copy || Core.translate('Unknown member', {}, 'Member name does not exist');
  }

  const firstName = member.first_name;
  let lastName = member.last_name || '';

  if (shorten) {
    lastName = `${lastName.charAt(0)}.`;
  }

  return `${firstName} ${lastName}`.trim();
}
