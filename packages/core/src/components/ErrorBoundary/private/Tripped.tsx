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
          phrase="This feature has crashed or failed to load."
          context="Loading a feature crashed"
        />
      }
    >
      <T phrase="Please try again." context="Message letting the user known to try again" />
    </Alert>
  );
}
