import React from 'react';
import { shallow } from 'enzyme';
import T from '../../src/components/Translate';
import Alert from '../../src/components/Alert';
import MutedButton from '../../src/components/MutedButton';
import ErrorMessage, { getErrorMessage } from '../../src/components/ErrorMessage';
import StatusText from '../../src/components/StatusText';
import { ErrorObject } from '../../src/types';
import Core from '../../src';

describe('getErrorMessage()', () => {
  beforeAll(() => {
    Core.settings.errorURL = 'http://error-url-test.com/{{id}}';
    Core.settings.traceURL = 'http://trace-url-test.com/{{id}}';
  });

  it('returns empty string for no message', () => {
    expect(getErrorMessage({})).toBe('');
  });

  it('returns the basic message', () => {
    expect(
      getErrorMessage({
        error_message: 'Danger Will Robinson!',
      }),
    ).toBe('Danger Will Robinson!');
  });

  it('can be overridden with a user message', () => {
    expect(
      getErrorMessage({
        error_message: 'Danger Will Robinson!',
        user_message: 'Systems are offline!',
      }),
    ).toBe('Systems are offline!');
  });

  it('includes the error code', () => {
    expect(
      getErrorMessage({
        error_message: 'Danger Will Robinson!',
        error_code: 404,
      }),
    ).toBe('Danger Will Robinson!');

    expect(
      getErrorMessage(
        {
          error_message: 'Danger Will Robinson!',
          error_code: 404,
        },
        true,
      ),
    ).toBe('404 - Danger Will Robinson!');
  });

  it('handles debug code', () => {
    expect(
      getErrorMessage({
        error_message: 'Danger Will Robinson!',
        error_code: 404,
        debug_info: {
          error_class: 'FooBar',
          error_message: 'Systems are offline!',
        },
      }),
    ).toBe('FooBar - Systems are offline!');

    expect(
      getErrorMessage(
        {
          error_message: 'Danger Will Robinson!',
          error_code: 404,
          debug_info: {
            error_class: 'FooBar',
            response_message: 'Systems are offline!',
          },
        },
        true,
      ),
    ).toBe('404 - FooBar - Systems are offline!');
  });

  it('supports Error instances', () => {
    expect(getErrorMessage(new Error('Danger Will Robinson!'))).toBe('Danger Will Robinson!');
  });

  it('supports Error instances with additional properties', () => {
    const error = new Error('Not useful message') as ErrorObject; // Satisfy TS.
    error.error_message = 'Very useful message';
    expect(getErrorMessage(error)).toBe('Very useful message');
  });
});

describe('<ErrorMessage />', () => {
  it('returns null if no error', () => {
    const wrapper = shallow(<ErrorMessage />);

    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders an alert', () => {
    const wrapper = shallow(
      <ErrorMessage
        error={{
          error_message: 'Failure',
        }}
      />,
    );
    const alert = wrapper.find(Alert);

    expect(alert).toHaveLength(1);
    expect(alert.prop('title')).toEqual(<T k="lunar.error.unknown" phrase="Unknown error" />);
    expect(alert.contains('Failure')).toBe(true);
  });

  it('renders a status text when inline', () => {
    const wrapper = shallow(
      <ErrorMessage
        inline
        error={{
          error_message: 'Failure',
        }}
      />,
    );

    expect(wrapper.find(StatusText)).toHaveLength(1);
  });

  it('can pass a title and subtitle', () => {
    const wrapper = shallow(
      <ErrorMessage
        error={{
          error_message: 'Failure',
        }}
        title="Title"
        subtitle="Subtitle"
      />,
    );
    const alert = wrapper.find(Alert);

    expect(alert).toHaveLength(1);
    expect(alert.prop('title')).toBe('Title');
    expect(alert.contains('Subtitle')).toBe(true);
  });

  it('will inherit error code for title', () => {
    const wrapper = shallow(
      <ErrorMessage
        error={{
          error_message: 'Failure',
          error_code: 404,
        }}
      />,
    );
    const alert = wrapper.find(Alert);

    expect(alert).toHaveLength(1);
    expect(alert.prop('title')).toBe(404);
    expect(alert.contains('Failure')).toBe(true);
  });

  it('renders a button if an error ID is passed', () => {
    const wrapper = shallow(
      <ErrorMessage
        error={{
          error_message: 'Failure',
        }}
      />,
    );

    expect(
      wrapper
        .find(Alert)
        .find(MutedButton)
        .contains(<T k="lunar.error.viewDetails" phrase="View error details" />),
    ).toBe(false);

    wrapper.setProps({
      error: {
        error_message: 'Failure',
        error_id: 'ABC',
      },
    });

    expect(
      wrapper
        .find(Alert)
        .find(MutedButton)
        .contains(<T k="lunar.error.viewDetails" phrase="View error details" />),
    ).toBe(true);
    expect(wrapper.find(Alert).find(MutedButton).prop('href')).toBe(
      'http://error-url-test.com/ABC',
    );
  });

  it('renders a button if an error instance containing an error ID is passed', () => {
    const error = new Error('Whatever') as ErrorObject; // Satisfy TS.

    const wrapper = shallow(<ErrorMessage error={error} />);

    expect(
      wrapper
        .find(Alert)
        .find(MutedButton)
        .contains(<T k="lunar.error.viewDetails" phrase="View error details" />),
    ).toBe(false);

    error.error_message = 'Failure';
    error.error_id = 'ABC';

    wrapper.setProps({
      error,
    });

    expect(
      wrapper
        .find(Alert)
        .find(MutedButton)
        .contains(<T k="lunar.error.viewDetails" phrase="View error details" />),
    ).toBe(true);
    expect(wrapper.find(Alert).find(MutedButton).prop('href')).toBe(
      'http://error-url-test.com/ABC',
    );
  });

  it('renders a button if an trace ID is passed', () => {
    const error = new Error('Whatever') as ErrorObject; // Satisfy TS.

    const wrapper = shallow(
      <ErrorMessage
        error={{
          error_message: 'Failure',
        }}
      />,
    );

    expect(
      wrapper
        .find(Alert)
        .find(MutedButton)
        .contains(<T k="lunar.trace.viewDetails" phrase="View trace details" />),
    ).toBe(false);

    error.trace_id = 'tRaCiD1337==';

    wrapper.setProps({
      error,
    });

    expect(
      wrapper
        .find(Alert)
        .find(MutedButton)
        .contains(<T k="lunar.trace.viewDetails" phrase="View trace details" />),
    ).toBe(true);
    expect(wrapper.find(Alert).find(MutedButton).prop('href')).toBe(
      'http://trace-url-test.com/tRaCiD1337==',
    );
  });
});
