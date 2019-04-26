import { DateTime } from 'luxon';
import moment from 'moment';
import createDateTime from '../../src/utils/createDateTime';

describe('createDateTime()', () => {
  // Some timezone sub-values are off by 1 between implementations,
  // which makes it very hard to test. So strip it for now.
  function parseISO(iso: string): string {
    return iso.split('.')[0];
  }

  it('converts UTC to defined zone', () => {
    const utc = DateTime.utc();
    const time = createDateTime(null, { timezone: 'America/New_York' });

    expect(utc.toISO()).not.toBe(time.toISO());
  });

  it('stays between UTC', () => {
    const utc = DateTime.utc();
    const time = createDateTime(null, { timezone: 'UTC' });

    expect(parseISO(utc.toISO())).toBe(parseISO(time.toISO()));
  });

  it('supports luxon objects', () => {
    const luxon = DateTime.utc();
    const time = createDateTime(luxon, { timezone: 'UTC' });

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toISO()).toBe(luxon.toISO());

    // Test immutability
    expect(time).not.toBe(luxon);
  });

  it('supports luxon objects with a changing timezone', () => {
    const luxon = DateTime.utc();
    const time = createDateTime(luxon, { timezone: 'Europe/Paris' });

    expect(time).toBeInstanceOf(DateTime);
    expect(time.valueOf()).toBe(luxon.valueOf());
    expect(time.zoneName).toBe('Europe/Paris');
  });

  it('supports date objects', () => {
    const date = new Date(Date.UTC(2000, 1, 1));
    const time = createDateTime(date, { timezone: 'UTC' });

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toISO()).toBe(date.toISOString());
  });

  it('supports ISO strings', () => {
    const date = '1988-02-26T00:00:00-00:00';
    const time = createDateTime(date, { timezone: 'UTC' });

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toISO()).toBe('1988-02-26T00:00:00.000Z');
  });

  it('supports strings with custom format', () => {
    const date = 'February 26, 1988';
    const time = createDateTime(date, { timezone: 'UTC', sourceFormat: 'MMMM d, yyyy' });

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toISO()).toBe('1988-02-26T00:00:00.000Z');
  });

  it('supports unix', () => {
    const date = Date.UTC(2018, 10);
    const time = createDateTime(date);

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toMillis()).toBe(date);
  });

  // it('defaults to unix', () => {
  //   const date = Date.now();
  //   const time = createDateTime();

  //   expect(time).toBeInstanceOf(DateTime);
  //   expect(time.toMillis()).toBe(date);
  // });

  it('supports 0 unix', () => {
    const time = createDateTime(0);

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toMillis()).toBe(0);
  });

  it('supports negative unix', () => {
    const time = createDateTime(-123);

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toMillis()).toBe(-123);
  });

  it('defaults to unix when value is empty string', () => {
    const date = Date.now();
    const time = createDateTime('');

    expect(time).toBeInstanceOf(DateTime);
    expect(time.toMillis()).toBeGreaterThanOrEqual(date);
  });

  it('converts moment objects', () => {
    const date = moment.utc();
    // @ts-ignore Allow moment object
    const time = createDateTime(date, { timezone: 'UTC' });

    expect(time).toBeInstanceOf(DateTime);
    expect(parseISO(time.toISO())).toBe(parseISO(date.toISOString()));
  });
});
