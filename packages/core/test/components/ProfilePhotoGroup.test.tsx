import React from 'react';
import { shallowWithStyles } from '@airbnb/lunar-test-utils';
import ProfilePhotoGroup from '../../src/components/ProfilePhotoGroup';
import ProfilePhoto from '../../src/components/ProfilePhoto';

describe('<ProfilePhotoGroup />', () => {
  const props = {
    imageSrc: 'https://domain.com/some/file.jpg',
    title: 'Name',
  };

  it('renders photos', () => {
    const wrapper = shallowWithStyles(
      <ProfilePhotoGroup>
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a single photo', () => {
    const wrapper = shallowWithStyles(
      <ProfilePhotoGroup>
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders a remainder cell when the max is met', () => {
    const wrapper = shallowWithStyles(
      <ProfilePhotoGroup max={1}>
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('supports custom sizes', () => {
    const wrapper = shallowWithStyles(
      <ProfilePhotoGroup size={5}>
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
        <ProfilePhoto {...props} />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('handles photos that return falsy values', () => {
    const wrapper = shallowWithStyles(
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

    const wrapper = shallowWithStyles(
      <ProfilePhotoGroup>
        <FakePhoto />
      </ProfilePhotoGroup>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
