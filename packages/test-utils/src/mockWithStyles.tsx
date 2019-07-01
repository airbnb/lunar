import React from 'react';
import { WithStylesWrappedProps } from 'aesthetic-react';
import { NativeBlock, ParsedBlock } from 'aesthetic-adapter-aphrodite';

export type WithStylesProps = WithStylesWrappedProps<{}, NativeBlock, ParsedBlock>;

export default function mockWithStyles() {
  jest.mock('@airbnb/lunar/lib/composers/withStyles', () => {
    const core = jest.requireActual('@airbnb/lunar').default;

    const theme = core.aesthetic.getTheme('light');

    return function withStyles() {
      function styleComponent<T>(WrappedComponent: React.ComponentType<T & WithStylesProps>) {
        function Passthrough(props: T) {
          return <WrappedComponent styles={{}} cx={() => ''} theme={theme} {...props} />;
        }

        Passthrough.extendStyles = () => Passthrough;
        const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
        Passthrough.displayName = `withStyles(${wrappedName})`;

        return Passthrough;
      }
      styleComponent.extendStyles = () => {};

      return styleComponent;
    };
  });
}
