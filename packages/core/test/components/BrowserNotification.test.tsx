import React from 'react';
import { shallow } from 'enzyme';
import { mockNotification } from '@airbnb/lunar-test-utils';
import BrowserNotification from '../../src/components/BrowserNotification';

describe('<BrowserNotification />', () => {
  let unmockNotification: () => void;
  let Notification: Notification & {
    permission: string;
    requestPermission: () => Promise<NotificationPermission>;
  };

  beforeEach(() => {
    unmockNotification = mockNotification();
    ({ Notification } = window);
  });

  afterEach(() => {
    unmockNotification();
  });

  it('renders nothing', () => {
    const wrapper = shallow(<BrowserNotification title="Hello, test." />);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('requests permissions when displaying the notification', () => {
    shallow(<BrowserNotification title="Hello, test." />);

    expect(Notification.requestPermission).toHaveBeenCalledTimes(1);
  });

  it('creates a browser notification', async () => {
    Notification.permission = 'granted';

    const title = 'Test Title';
    const tag = 'Test Tag';
    const body = 'Test Body';
    const icon = 'Test Icon';
    const onClick = jest.fn();
    const wrapper = shallow<BrowserNotification>(
      <BrowserNotification title={title} tag={tag} body={body} icon={icon} onClick={onClick} />,
    );

    await Notification.requestPermission();

    expect(Notification).toHaveBeenCalledWith(title, {
      tag,
      body,
      icon,
    });

    wrapper.instance().notification!.dispatchEvent(new Event('click'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('updates when setting new props', async () => {
    const wrapper = shallow(<BrowserNotification title="Title 1" />);

    await Notification.requestPermission();

    expect(Notification).toHaveBeenCalledWith('Title 1', expect.anything());

    wrapper.setProps({
      title: 'Title 2',
    });

    await Notification.requestPermission();

    expect(Notification).toHaveBeenCalledWith('Title 2', expect.anything());
  });

  it('removes the notification when unmounting', async () => {
    const wrapper = shallow<BrowserNotification>(<BrowserNotification title="Title 1" />);

    await Notification.requestPermission();

    const noti = wrapper.instance().notification;

    wrapper.unmount();

    expect(noti!.close).toHaveBeenCalled();
  });

  describe('timeout', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('removes the notification when timing out', async () => {
      const wrapper = shallow<BrowserNotification>(
        <BrowserNotification title="Title 1" timeout={1000} />,
      );
      await Notification.requestPermission();

      const noti = wrapper.instance().notification;

      jest.advanceTimersByTime(1000);

      expect(noti!.close).toHaveBeenCalled();
    });

    it('clears the timeout when unmounting', async () => {
      const wrapper = shallow<BrowserNotification>(
        <BrowserNotification title="Title 1" timeout={1000} />,
      );

      await Notification.requestPermission();

      const noti = wrapper.instance().notification;

      wrapper.unmount();

      expect(noti!.close).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);

      expect(noti!.close).toHaveBeenCalledTimes(1);
    });
  });
});
