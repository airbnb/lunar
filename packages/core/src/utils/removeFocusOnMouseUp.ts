// Remove focus ring after clicking, but not when keyboard tabbing around
export default function removeFocusOnMouseUp<T>(event: React.MouseEvent<T>) {
  // This event takes too long, and prevents onClick occasionally.
  // And we do not need to do it syncronously.
  const { target } = event;

  window.setTimeout(() => (target as HTMLElement).blur(), 0);
}
