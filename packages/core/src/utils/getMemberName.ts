/* eslint-disable camelcase */

import T from '../components/Translate';

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
    return (
      copy ||
      T.phrase(
        'Unknown member',
        {},
        { key: 'lunar.common.unknownMember', context: 'Member name does not exist' },
      )
    );
  }

  const firstName = member.first_name;
  let lastName = member.last_name || '';

  if (shorten) {
    lastName = `${lastName.charAt(0)}.`;
  }

  return `${firstName} ${lastName}`.trim();
}
