import React from 'react';
import { shallow } from 'enzyme';
import ProfilePhotoGroup from '../../src/components/ProfilePhotoGroup';
import ProfilePhoto from '../../src/components/ProfilePhoto';

describe('<ProfilePhotoGroup />', () => {
  const props = {
    imageSrc: 'https://domain.com/some/file.jpg',
    title: 'Name',
  };

  it('renders photos', () => {
    const wrapper = shallow(
      <ProfilePhotoGroup>
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a single photo', () => {
    const wrapper = shallow(
      <ProfilePhotoGroup>
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a remainder cell when the max is met', () => {
    const wrapper = shallow(
      <ProfilePhotoGroup max={1}>
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('supports custom sizes', () => {
    const wrapper = shallow(
      <ProfilePhotoGroup size={5}>
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles photos that return falsy values', () => {
    const wrapper = shallow(
      <ProfilePhotoGroup>
        {false && <ProfilePhoto {...props} />}
        {true && <ProfilePhoto {...props} />}
        {null && <ProfilePhoto {...props} />}
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles components that return a falsy value', () => {
    function FakePhoto() {
      return null;
    }

    const wrapper = shallow(
      <ProfilePhotoGroup>
        <FakePhoto />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
