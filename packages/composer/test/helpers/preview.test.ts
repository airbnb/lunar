import { checkForAirbnbErrors, selectAppropriateLocale } from '../../src/helpers/preview';

describe('selectAppropriateLocale()', () => {
  it('selects none locale', () => {
    expect(selectAppropriateLocale('none')).toEqual({
      selectedLocale: 'none',
      unsupportedLocale: null,
    });
  });

  it('selects auto locale', () => {
    expect(selectAppropriateLocale('auto')).toEqual({
      selectedLocale: 'auto',
      unsupportedLocale: null,
    });
  });

  it('selects shorthand locale', () => {
    expect(selectAppropriateLocale('ja')).toEqual({
      selectedLocale: 'ja-JP',
      unsupportedLocale: null,
    });
  });

  it('selects full locale', () => {
    expect(selectAppropriateLocale('ro-RO')).toEqual({
      selectedLocale: 'ro-RO',
      unsupportedLocale: null,
    });
  });

  it('selects from possible matches', () => {
    expect(selectAppropriateLocale('ca')).toEqual({
      selectedLocale: 'ca-ES',
      unsupportedLocale: null,
    });
  });

  it('doesnt set unsupported', () => {
    expect(selectAppropriateLocale('foo')).toEqual({
      selectedLocale: null,
      unsupportedLocale: 'foo',
    });
  });
});

describe('checkForAirbnbErrors()', () => {
  it('doesnt error for normal casing', () => {
    expect(checkForAirbnbErrors('Something Airbnb something.')).toEqual([]);
  });

  it('doesnt include URLs', () => {
    expect(checkForAirbnbErrors('Something airbnb.com something.')).toEqual([]);
  });

  it('errors for all miscasing', () => {
    expect(
      checkForAirbnbErrors(
        'Something AirBnB something AIRbnb something AirBnb something airbnb something Airbnb.',
      ),
    ).toEqual([
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 10,
        length: 6,
        found: 'AirBnB',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 27,
        length: 6,
        found: 'AIRbnb',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 44,
        length: 6,
        found: 'AirBnb',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 61,
        length: 6,
        found: 'airbnb',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
    ]);
  });

  it('errors for all misspellings', () => {
    expect(
      checkForAirbnbErrors(
        'Something Aribnb something Airbbn something airnbb something iarbnb something Airbnb.',
      ),
    ).toEqual([
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 10,
        length: 6,
        found: 'Aribnb',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 27,
        length: 6,
        found: 'Airbbn',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 44,
        length: 6,
        found: 'airnbb',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
      {
        short_message: '',
        message: 'Improper company spelling or casing',
        offset: 61,
        length: 6,
        found: 'iarbnb',
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      },
    ]);
  });
});
