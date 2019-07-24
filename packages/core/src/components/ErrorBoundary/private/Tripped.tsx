import React from 'react';
import T from '../../Translate';
import Alert from '../../Alert';

/* @ignore */
export default function Tripped() {
  return (
    <Alert
      danger
      title={
        <T
          k="lunar.error.featureCrashed"
          phrase="This feature has crashed or failed to load."
          context="Loading a feature crashed"
        />
      }
    >
      <T
        k="lunar.error.tryAgain"
        phrase="Please try again."
        context="Message letting the user known to try again"
      />
    </Alert>
  );
}
