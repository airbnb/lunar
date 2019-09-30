import React from 'react';
import Toast from '.';

const TRANSITION_ANIMATION = 300;

export default {
  title: 'Core/Toast',
  parameters: {
    happo: { delay: 250 + TRANSITION_ANIMATION },
    inspectComponents: [Toast],
  },
};

export function aStandardToast() {
  return <Toast id="foo" message="This is a message within a toast." duration={0} />;
}

aStandardToast.story = {
  name: 'A standard toast.',
};

export function anErrorToastThatHasADelayBeforeDisplaying() {
  return (
    <Toast danger id="bar" message="This is a message within a toast." duration={0} delay={1000} />
  );
}

anErrorToastThatHasADelayBeforeDisplaying.story = {
  name: 'An error toast that has a delay before displaying.',
  parameters: {
    happo: { delay: 1000 + TRANSITION_ANIMATION },
  },
};

export function aSuccessToastWithATitle() {
  return (
    <Toast
      success
      id="baz"
      message="This is a message within a toast."
      title="Success!"
      duration={0}
    />
  );
}

aSuccessToastWithATitle.story = {
  name: 'A success toast with a title.',
};

export function aRefreshToastDenotingANewVersion() {
  return <Toast refresh id="qux" message="This is a message within a toast." duration={0} />;
}

aRefreshToastDenotingANewVersion.story = {
  name: 'A refresh toast denoting a new version.',
};
