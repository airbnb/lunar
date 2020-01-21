/* eslint-disable no-param-reassign */

import { useEffect } from 'react';

// This logic is taken from Lunar, but converted into a hook!
// https://github.com/airbnb/lunar/blob/master/packages/core/src/components/private/BaseTextArea.tsx
export default function useAutoResize(
  element: HTMLElement | null,
  value: string,
  maxHeight: number = 400,
  minHeight: number = 38, // Height of textarea by default
) {
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      if (!element) {
        return;
      }

      // Fixed height is set when using the manual browser resizer (bottom right corner)
      const { height } = element.style;
      const hasBeenResizedManually = height && height !== 'auto';

      // Set heights to auto so that we can calculate the full height of the content
      element.style.minHeight = 'auto';
      element.style.height = 'auto';

      // Determine the next height by clamping our boundaries
      const newMinHeight = `${Math.max(minHeight, Math.min(element.scrollHeight, maxHeight))}px`;

      // If it has been manually resized outside our max, use that fixed height instead
      const newHeight =
        hasBeenResizedManually && height && parseFloat(height) > maxHeight ? height : 'auto';

      // Set the new heights
      element.style.minHeight = newMinHeight;
      element.style.height = newHeight;
    });

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [element, value, maxHeight, minHeight]);
}
