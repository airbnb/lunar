import React from 'react';
import { shallow } from 'enzyme';
import { DateTime as LuxonDateTime } from 'luxon';
import DateTime from '../../src/components/DateTime';
import Empty from '../../src/components/Empty';
import { FORMAT_YMD, LOCALES } from '../../src/constants';
import createDateTime from '../../src/utils/createDateTime';
import getLanguageFromLocale from '../../src/utils/getLanguageFromLocale';
import toMilliseconds from '../../src/utils/toMilliseconds';
import Interval from '../../src/components/Interval';

describe('<DateTime />', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date(Date.UTC(1988, 1, 26, 16, 12, 5));
  });

  it('renders empty if no time', () => {
    const wrapper = shallow(<DateTime timezone="UTC" />);

    expect(wrapper.find(Empty)).toHaveLength(1);
  });

  it('renders a <time> element', () => {
    const wrapper = shallow(<DateTime at={date} timezone="UTC" />);

    expect(wrapper.find('time')).toHaveLength(1);
  });

  it('errors for an invalid time', () => {
    expect(() => shallow(<DateTime at="2016-02-33" timezone="UTC" />)).toThrow(
      'Invalid DateTime: unit out of range: you specified 33 (of type number) as a day, which is invalid',
    );
  });

  it('accepts a UNIX timestamp in milliseconds', () => {
    const wrapper = shallow(<DateTime medium at={date.getTime()} timezone="UTC" />);

    expect(wrapper.text()).toBe('Feb 26, 1988 4:12PM UTC');
  });

  it('accepts a custom format', () => {
    const wrapper = shallow(
      <DateTime
        medium
        at="26/02/1988 - 16:12:05"
        timezone="UTC"
        sourceFormat="dd/MM/yyyy - HH:mm:ss"
      />,
    );

    expect(wrapper.text()).toBe('Feb 26, 1988 4:12PM UTC');
  });

  it('disables the timezone', () => {
    const rfc3339 = "yyyy-MM-dd'T'HH:mm:ssZZ";
    const wrapper = shallow(<DateTime at={date} timezone={false} format={rfc3339} />);
    const wrapperUTC = shallow(
      <DateTime at={date} timezone="America/Los_Angeles" format={rfc3339} />,
    );

    expect(wrapper.text()).toBe('1988-02-26T16:12:05+00:00');
    expect(wrapperUTC.text()).toBe('1988-02-26T08:12:05-08:00');
  });

  it('formats to FORMAT_YMD', () => {
    const wrapper = shallow(<DateTime at={date} timezone="UTC" format={FORMAT_YMD} />);

    expect(wrapper.text()).toBe('1988-02-26');
  });

  it('formats using the `micro` prop', () => {
    const wrapper = shallow(<DateTime micro at={date} timezone="UTC" />);

    expect(wrapper.text()).toBe('Feb 26 4:12PM UTC');
  });

  it('formats using the `short` prop', () => {
    const wrapper = shallow(<DateTime short at={date} timezone="UTC" />);

    expect(wrapper.text()).toBe('Feb 26, 88 4:12PM UTC');
  });

  it('formats using the `medium` prop', () => {
    const wrapper = shallow(<DateTime medium at={date} timezone="UTC" />);

    expect(wrapper.text()).toBe('Feb 26, 1988 4:12PM UTC');
  });

  it('formats using the `long` prop', () => {
    const wrapper = shallow(<DateTime long at={date} timezone="UTC" />);

    expect(wrapper.text()).toBe('Fri, February 26, 1988 4:12PM UTC');
  });

  it('formats using the `clock` prop', () => {
    const wrapper = shallow(<DateTime clock at={date} timezone="UTC" />);

    expect(wrapper.text()).toBe('4:12PM UTC');
  });

  it('formats without the timestamp', () => {
    const wrapper = shallow(<DateTime long noTime at={date} timezone="UTC" />);

    expect(wrapper.text()).toBe('Fri, February 26, 1988 UTC');
  });

  it('formats with the timestamp but doesnt override format', () => {
    const wrapper = shallow(<DateTime at={date} timezone="UTC" format="yyyy-MM-dd" />);

    expect(wrapper.text()).toBe('1988-02-26');
  });

  it('displays the day', () => {
    const micro = shallow(<DateTime micro withDay at={date} timezone="UTC" />);
    const short = shallow(<DateTime short withDay at={date} timezone="UTC" />);
    const medium = shallow(<DateTime medium withDay at={date} timezone="UTC" />);
    const long = shallow(<DateTime long at={date} timezone="UTC" />); // On by default

    expect(micro.text()).toBe('Fri, Feb 26 4:12PM UTC');
    expect(short.text()).toBe('Fri, Feb 26, 88 4:12PM UTC');
    expect(medium.text()).toBe('Fri, Feb 26, 1988 4:12PM UTC');
    expect(long.text()).toBe('Fri, February 26, 1988 4:12PM UTC');
  });

  it('hides the day', () => {
    const micro = shallow(<DateTime micro at={date} timezone="UTC" />);
    const short = shallow(<DateTime short at={date} timezone="UTC" />);
    const medium = shallow(<DateTime medium at={date} timezone="UTC" />);
    const long = shallow(<DateTime long noDay at={date} timezone="UTC" />); // On by default

    expect(micro.text()).toBe('Feb 26 4:12PM UTC');
    expect(short.text()).toBe('Feb 26, 88 4:12PM UTC');
    expect(medium.text()).toBe('Feb 26, 1988 4:12PM UTC');
    expect(long.text()).toBe('February 26, 1988 4:12PM UTC');
  });

  it('hides the time', () => {
    const micro = shallow(<DateTime micro noTime at={date} timezone="UTC" />);
    const short = shallow(<DateTime short noTime at={date} timezone="UTC" />);
    const medium = shallow(<DateTime medium noTime at={date} timezone="UTC" />);
    const long = shallow(<DateTime long noTime at={date} timezone="UTC" />);

    expect(micro.text()).toBe('Feb 26 UTC');
    expect(short.text()).toBe('Feb 26, 88 UTC');
    expect(medium.text()).toBe('Feb 26, 1988 UTC');
    expect(long.text()).toBe('Fri, February 26, 1988 UTC');
  });

  it('hides the timezone', () => {
    const micro = shallow(<DateTime micro noTimezone at={date} timezone="UTC" />);
    const short = shallow(<DateTime short noTimezone at={date} timezone="UTC" />);
    const medium = shallow(<DateTime medium noTimezone at={date} timezone="UTC" />);
    const long = shallow(<DateTime long noTimezone at={date} timezone="UTC" />);

    expect(micro.text()).toBe('Feb 26 4:12PM');
    expect(short.text()).toBe('Feb 26, 88 4:12PM');
    expect(medium.text()).toBe('Feb 26, 1988 4:12PM');
    expect(long.text()).toBe('Fri, February 26, 1988 4:12PM');
  });

  it('hides all the things', () => {
    const micro = shallow(<DateTime micro noTime noTimezone noDay at={date} timezone="UTC" />);
    const short = shallow(<DateTime short noTime noTimezone noDay at={date} timezone="UTC" />);
    const medium = shallow(<DateTime medium noTime noTimezone noDay at={date} timezone="UTC" />);
    const long = shallow(<DateTime long noTime noTimezone noDay at={date} timezone="UTC" />);

    expect(micro.text()).toBe('Feb 26');
    expect(short.text()).toBe('Feb 26, 88');
    expect(medium.text()).toBe('Feb 26, 1988');
    expect(long.text()).toBe('February 26, 1988');
  });

  describe('localized messages', () => {
    LOCALES.forEach(locale => {
      it(`${getLanguageFromLocale(locale)} - ${locale}`, () => {
        const props = {
          at: date,
          timezone: 'UTC',
          noTime: true,
          noTimezone: true,
        };
        const micro = shallow(<DateTime {...props} micro locale={locale} />);
        const short = shallow(<DateTime {...props} short locale={locale} />);
        const medium = shallow(<DateTime {...props} medium locale={locale} />);
        const long = shallow(<DateTime {...props} long locale={locale} />);
        const clock = shallow(<DateTime {...props} clock locale={locale} />);

        expect(micro.text()).toMatchSnapshot();
        expect(short.text()).toMatchSnapshot();
        expect(medium.text()).toMatchSnapshot();
        expect(long.text()).toMatchSnapshot();
        expect(clock.text()).toMatchSnapshot();
      });
    });
  });

  describe('relative time', () => {
    describe('intervals', () => {
      it('renders an Interval component when relative is set', () => {
        const wrapper = shallow(<DateTime relative at={date} timezone="UTC" />);

        expect(wrapper.find(Interval)).toHaveLength(1);
      });

      it('does not render an Interval component when relativeCompact is set', () => {
        const wrapper = shallow(<DateTime relativeCompact at={date} timezone="UTC" />);

        expect(wrapper.find(Interval)).toHaveLength(0);
      });

      it('uses 5 seconds as the minimal Interval update', () => {
        const wrapper = shallow(<DateTime relative timezone="UTC" />);

        expect(wrapper.find(Interval).props().every).toBe(toMilliseconds('5 seconds'));
      });

      it('uses 6 hours as the maximum Interval update', () => {
        date.setFullYear(2088);
        const wrapper = shallow(<DateTime relative at={date} timezone="UTC" />);

        expect(wrapper.find(Interval).props().every).toBe(toMilliseconds('6 hours'));
      });
    });

    describe('rendered output', () => {
      it('formats to relative time in the future', () => {
        const wrapper = shallow(
          <DateTime relative at={createDateTime().plus({ years: 70 })} timezone="UTC" />,
        ).dive();

        expect(wrapper.text()).toBe('in 69 years');
      });

      it('uses the current time when noFuture is set and the time is in the future', () => {
        date.setFullYear(2088);

        const wrapper = shallow(<DateTime relative noFuture at={date} timezone="UTC" />).dive();

        expect(wrapper.text()).toBe('a few seconds ago');
      });

      it('uses the provided time when noFuture is set and the time is in the past', () => {
        const wrapper = shallow(
          <DateTime relative noFuture at={createDateTime().minus({ seconds: 5 })} timezone="UTC" />,
        ).dive();

        expect(wrapper.text()).toBe('a few seconds ago');
      });
    });
  });

  describe('relative()', () => {
    let base: LuxonDateTime;

    beforeEach(() => {
      base = createDateTime(new Date(Date.UTC(2019, 1, 1)));
    });

    describe('past times', () => {
      it('handles seconds', () => {
        expect(DateTime.relative(base.minus({ seconds: 44 }), { base })).toBe('a few seconds ago');
      });

      it('handles minutes', () => {
        expect(DateTime.relative(base.minus({ minutes: 1 }), { base })).toBe('1 minute ago');
      });

      it('handles hours', () => {
        expect(DateTime.relative(base.minus({ hours: 1 }), { base })).toBe('1 hour ago');
      });

      it('handles days', () => {
        expect(DateTime.relative(base.minus({ days: 1 }), { base })).toBe('1 day ago');
      });

      it('handles months', () => {
        expect(DateTime.relative(base.minus({ months: 1 }), { base })).toBe('1 month ago');
      });

      it('handles years', () => {
        expect(DateTime.relative(base.minus({ years: 1 }), { base })).toBe('1 year ago');
        expect(DateTime.relative(base.minus({ years: 2 }), { base })).toBe('2 years ago');
      });
    });

    describe('future times', () => {
      it('handles seconds', () => {
        expect(DateTime.relative(base.plus({ seconds: 44 }), { base })).toBe('in a few seconds');
      });

      it('handles minutes', () => {
        expect(DateTime.relative(base.plus({ minutes: 1.1 }), { base })).toBe('in 1 minute');
      });

      it('handles hours', () => {
        expect(DateTime.relative(base.plus({ minutes: 70 }), { base })).toBe('in 1 hour');
      });

      it('handles days', () => {
        expect(DateTime.relative(base.plus({ hours: 25 }), { base })).toBe('in 1 day');
      });

      it('handles months', () => {
        expect(DateTime.relative(base.plus({ days: 32 }), { base })).toBe('in 1 month');
      });

      it('handles years', () => {
        expect(DateTime.relative(base.plus({ months: 13 }), { base })).toBe('in 1 year');
        expect(DateTime.relative(base.plus({ months: 25 }), { base })).toBe('in 2 years');
      });
    });

    describe('compact relative times', () => {
      describe('past times', () => {
        it('handles seconds', () => {
          expect(DateTime.relative(base.minus({ seconds: 44 }), { base, style: 'short' })).toBe(
            'a few seconds',
          );
        });

        it('handles minutes', () => {
          expect(DateTime.relative(base.minus({ minutes: 1 }), { base, style: 'short' })).toBe(
            '1 min. ago',
          );
        });

        it('handles hours', () => {
          expect(DateTime.relative(base.minus({ hours: 1 }), { base, style: 'short' })).toBe(
            '1 hr. ago',
          );
        });

        it('handles days', () => {
          expect(DateTime.relative(base.minus({ hours: 24 }), { base, style: 'short' })).toBe(
            '1 day ago',
          );
        });

        it('handles months', () => {
          expect(DateTime.relative(base.minus({ days: 31 }), { base, style: 'short' })).toBe(
            '1 mo. ago',
          );
        });

        it('handles years', () => {
          expect(DateTime.relative(base.minus({ years: 1 }), { base, style: 'short' })).toBe(
            '1 yr. ago',
          );
          expect(DateTime.relative(base.minus({ months: 24 }), { base, style: 'short' })).toBe(
            '2 yr. ago',
          );
        });
      });

      describe('future times', () => {
        it('handles seconds', () => {
          expect(DateTime.relative(base.plus({ seconds: 44 }), { base, style: 'narrow' })).toBe(
            'a few sec.',
          );
        });

        it('handles minutes', () => {
          expect(DateTime.relative(base.plus({ minutes: 1.1 }), { base, style: 'narrow' })).toBe(
            'in 1 min.',
          );
        });

        it('handles hours', () => {
          expect(DateTime.relative(base.plus({ hours: 1.1 }), { base, style: 'narrow' })).toBe(
            'in 1 hr.',
          );
        });

        it('handles days', () => {
          expect(DateTime.relative(base.plus({ hours: 25 }), { base, style: 'narrow' })).toBe(
            'in 1 day',
          );
        });

        it('handles months', () => {
          expect(DateTime.relative(base.plus({ days: 32 }), { base, style: 'narrow' })).toBe(
            'in 1 mo.',
          );
        });

        it('handles years', () => {
          expect(DateTime.relative(base.plus({ months: 13 }), { base, style: 'narrow' })).toBe(
            'in 1 yr.',
          );
          expect(DateTime.relative(base.plus({ months: 26 }), { base, style: 'narrow' })).toBe(
            'in 2 yr.',
          );
        });
      });
    });

    it('handles no rounding logic', () => {
      expect(DateTime.relative(base.minus({ seconds: 44 }), { base, round: false })).toBe(
        'a few seconds ago',
      );

      expect(
        DateTime.relative(base.minus({ minutes: 1, seconds: 31 }), { base, round: false }),
      ).toBe('1.51 minutes ago');

      expect(DateTime.relative(base.minus({ minutes: 44 }), { base, round: false })).toBe(
        '44 minutes ago',
      );

      expect(DateTime.relative(base.minus({ minutes: 45 }), { base, round: false })).toBe(
        '45 minutes ago',
      );

      expect(DateTime.relative(base.minus({ hours: 1, minutes: 31 }), { base, round: false })).toBe(
        '1.51 hours ago',
      );

      expect(DateTime.relative(base.minus({ hours: 22 }), { base, round: false })).toBe(
        '22 hours ago',
      );

      expect(DateTime.relative(base.minus({ hours: 33 }), { base, round: false })).toBe(
        '1.37 days ago',
      );

      expect(DateTime.relative(base.minus({ days: 25 }), { base, round: false })).toBe(
        '25 days ago',
      );

      expect(DateTime.relative(base.minus({ days: 47 }), { base, round: false })).toBe(
        '1.51 months ago',
      );

      expect(DateTime.relative(base.minus({ months: 10 }), { base, round: false })).toBe(
        '10 months ago',
      );

      expect(DateTime.relative(base.minus({ months: 21 }), { base, round: false })).toBe(
        '1.75 years ago',
      );
    });
  });
});
