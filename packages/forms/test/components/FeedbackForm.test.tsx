import React from 'react';
import { shallow } from 'enzyme';
import FormActions from '@airbnb/lunar/lib/components/FormActions';
import FeedbackForm from '../../src/components/FeedbackForm';
import Form from '../../src/components/Form';
import TextArea from '../../src/components/Form/TextArea';
import Select from '../../src/components/Form/Select';
import RadioButtonController from '../../src/components/Form/RadioButtonController';

describe('<FeedbackForm />', () => {
  const props = {
    categories: {
      chat: 'Chat',
      phone: 'Phone',
    },
    channel: 'Lunar',
    channelID: 1,
    teamID: 1,
    onSubmit: () => Promise.resolve(),
  };

  it('renders form elements', () => {
    const wrapper = shallow(<FeedbackForm {...props} />);

    expect(wrapper.find(TextArea)).toHaveLength(1);
    expect(wrapper.find(Select)).toHaveLength(1);
    expect(wrapper.find(RadioButtonController)).toHaveLength(1);
  });

  it('renders categories in select', () => {
    const wrapper = shallow(<FeedbackForm {...props} />);

    expect(wrapper.find('option')).toHaveLength(2);
    expect(
      wrapper
        .find('option')
        .at(0)
        .prop('value'),
    ).toBe('chat');
    expect(
      wrapper
        .find('option')
        .at(1)
        .prop('value'),
    ).toBe('phone');
  });

  it('passes handlers to form actions', () => {
    const cancel = jest.fn();
    const cont = jest.fn();
    const wrapper = shallow(<FeedbackForm {...props} onCancel={cancel} onContinue={cont} />);

    expect(wrapper.find(FormActions).prop('onCancel')).toBe(cancel);
    expect(wrapper.find(FormActions).prop('onContinue')).toBe(cont);
  });

  it('sets processing state when loading', () => {
    const wrapper = shallow(<FeedbackForm {...props} />);

    wrapper.setState({
      loading: true,
    });

    expect(wrapper.find(FormActions).prop('processing')).toBe(true);
  });

  it('changes placeholder based on type', () => {
    const wrapper = shallow(<FeedbackForm {...props} />);

    wrapper.setState({
      data: { type: 'bug' },
    });

    expect(wrapper.find(TextArea).prop('placeholder')).toBe(
      'What happened? Sharing steps to reproduce the problem you experienced can be helpful.',
    );

    wrapper.setState({
      data: { type: 'feedback' },
    });

    expect(wrapper.find(TextArea).prop('placeholder')).toBe(
      'Share your experience with us. What went well? What could have gone better?',
    );
  });

  it('does not render bug options when disableBugReporting is set', () => {
    const wrapper = shallow(<FeedbackForm {...props} disableBugReporting />);

    expect(wrapper.find(RadioButtonController)).toHaveLength(0);
  });

  describe('handleSubmit()', () => {
    it('posts with correct data', () => {
      const spy = jest.fn(() => Promise.resolve({}));
      const wrapper = shallow<FeedbackForm>(<FeedbackForm {...props} onSubmit={spy} />);

      wrapper.find(Form).simulate('submit', {
        type: 'bug',
        category: 'Chat',
        feedback: 'Its good',
      });

      expect(spy).toHaveBeenCalledWith(
        {
          type: 'bug',
          category: 'Chat',
          feedback: 'Its good',
        },
        {
          ...props,
          onSubmit: spy,
        },
      );
    });
  });

  describe('handleStateUpdate()', () => {
    it('updates state with new values', () => {
      const wrapper = shallow(<FeedbackForm {...props} />);

      expect(wrapper.state('data')).toEqual({
        category: '',
        feedback: '',
        type: 'feedback',
      });

      wrapper.find(Form).simulate('stateUpdate', {
        values: { type: 'bug' },
      });

      expect(wrapper.state('data')).toEqual({
        type: 'bug',
      });
    });
  });

  describe('validate()', () => {
    it('errors if empty', () => {
      const wrapper = shallow<FeedbackForm>(<FeedbackForm {...props} />);

      expect(() => {
        wrapper.instance().validate('');
      }).toThrowError('This field is required.');

      expect(() => {
        // @ts-ignore Allow non-string
        wrapper.instance().validate(0);
      }).toThrowError('This field is required.');

      expect(() => {
        // @ts-ignore Allow non-string
        wrapper.instance().validate(false);
      }).toThrowError('This field is required.');
    });
  });
});
