import React from 'react';
import { shallow } from 'enzyme';
import IconUpload from '@airbnb/lunar-icons/lib/interface/IconUpload';
import IconAudio from '@airbnb/lunar-icons/lib/interface/IconAudio';
import IconPhoto from '@airbnb/lunar-icons/lib/interface/IconPhoto';
import IconVideo from '@airbnb/lunar-icons/lib/interface/IconVideo';
import FileInput from '../../src/components/FileInput';
import FormField from '../../src/components/FormField';
import FormInput from '../../src/components/private/FormInput';
import FormInputButton from '../../src/components/private/FormInputButton';
import Table, { Cell } from '../../src/components/Table';
import IconButton from '../../src/components/IconButton';

describe('<FileInput />', () => {
  const props = {
    name: 'foo',
    label: 'Label',
    onChange() {},
  };

  it('renders a field and input', () => {
    const wrapper = shallow(<FileInput {...props} />);

    expect(wrapper.find(FormField)).toHaveLength(1);
    expect(wrapper.find(FormInput)).toHaveLength(1);
  });

  it('it generates a unique ID', () => {
    const wrapper = shallow(<FileInput {...props} />);

    expect(wrapper.find(FormField).prop('id')).toBe(wrapper.find(FormInput).prop('id'));
  });

  it('marks input field as hidden', () => {
    const wrapper = shallow(<FileInput {...props} />);

    expect(wrapper.find(FormInput).prop('hidden')).toBe(true);
  });

  it('marks button as invalid', () => {
    const wrapper = shallow(<FileInput {...props} invalid />);

    expect(wrapper.find(FormInput).prop('invalid')).toBe(true);
    expect(wrapper.find(FormInputButton).prop('invalid')).toBe(true);
  });

  it('marks button as small when compact', () => {
    const wrapper = shallow(<FileInput {...props} compact />);

    expect(wrapper.find(FormInputButton).prop('small')).toBe(true);
  });

  it('defaults to any files', () => {
    const wrapper = shallow(<FileInput {...props} />);

    expect((wrapper.find(FormInputButton).prop('afterIcon') as any).type).toBe(IconUpload);
    expect(wrapper.find(FormInput).prop('accept')).toBeUndefined();
  });

  it('can limit to only audio files', () => {
    const wrapper = shallow(<FileInput {...props} onlyAudio />);

    expect((wrapper.find(FormInputButton).prop('afterIcon') as any).type).toBe(IconAudio);
    expect(wrapper.find(FormInput).prop('accept')).toBe('audio/*');
  });

  it('can limit to only image files', () => {
    const wrapper = shallow(<FileInput {...props} onlyImages />);

    expect((wrapper.find(FormInputButton).prop('afterIcon') as any).type).toBe(IconPhoto);
    expect(wrapper.find(FormInput).prop('accept')).toBe('image/*');
  });

  it('can limit to only video files', () => {
    const wrapper = shallow(<FileInput {...props} onlyVideo />);

    expect((wrapper.find(FormInputButton).prop('afterIcon') as any).type).toBe(IconVideo);
    expect(wrapper.find(FormInput).prop('accept')).toBe('video/*');
  });

  it('shows file count in button when files are selected', () => {
    const wrapper = shallow(<FileInput {...props} />);

    expect(wrapper.find(FormInputButton).find('span')).toHaveLength(0);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(FormInputButton).find('span')).toHaveLength(1);
    expect(
      wrapper
        .find(FormInputButton)
        .find('span')
        .prop('children'),
    ).toBe(' (1)');
  });

  it('shows a table with 4 columns when files exist', () => {
    const wrapper = shallow(<FileInput {...props} />);

    expect(wrapper.find(Table)).toHaveLength(0);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(Table)).toHaveLength(1);
    expect(wrapper.find(Cell)).toHaveLength(5);
  });

  it('doesnt show table when inline', () => {
    const wrapper = shallow(<FileInput {...props} inline />);

    expect(wrapper.find(Table)).toHaveLength(0);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(Table)).toHaveLength(0);
  });

  it('can hide file size column', () => {
    const wrapper = shallow(<FileInput {...props} hideFileSize />);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(Cell)).toHaveLength(4);
  });

  it('can hide file type column', () => {
    const wrapper = shallow(<FileInput {...props} hideFileType />);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(Cell)).toHaveLength(4);
  });

  it('can hide last modified column', () => {
    const wrapper = shallow(<FileInput {...props} hideLastModified />);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(Cell)).toHaveLength(4);
  });

  it('can hide all columns except name and remove', () => {
    const wrapper = shallow(<FileInput {...props} hideLastModified hideFileSize hideFileType />);

    wrapper.setState({
      files: [new File([], 'foo.png')],
    });

    expect(wrapper.find(Cell)).toHaveLength(2);
  });

  it('creates a row for every file', () => {
    const wrapper = shallow(<FileInput {...props} />);

    wrapper.setState({
      files: [new File([], 'foo.png'), new File([], 'bar.png'), new File([], 'baz.jpg')],
    });

    expect(wrapper.find('tr')).toHaveLength(3);
  });

  it('choosing a file triggers an onchange and updates state', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FileInput {...props} onChange={spy} />);
    const files = [new File([], 'foo.png')];
    const event = {
      currentTarget: {
        files,
      },
    };

    expect(wrapper.state('files')).toEqual([]);

    wrapper.find(FormInput).simulate('change', event);

    expect(wrapper.state('files')).toEqual(files);
    expect(spy).toHaveBeenCalledWith(files, event);
  });

  it('can remove a chosen filen by clicking remove', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FileInput {...props} onChange={spy} />);
    const files = [new File([], 'foo.png')];

    wrapper.setState({
      files,
    });

    wrapper.find(IconButton).simulate('click', {});

    expect(wrapper.state('files')).toEqual([]);
    expect(spy).toHaveBeenCalledWith([], {});
  });

  it('clicking the button triggers the input', () => {
    const spy = jest.fn();
    const wrapper = shallow(<FileInput {...props} />);

    (wrapper.instance() as any).ref = { current: { click: spy } };

    wrapper.find(FormInputButton).simulate('click');

    expect(spy).toHaveBeenCalled();
  });
});
