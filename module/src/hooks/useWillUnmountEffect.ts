import React from 'react';

/** A useEffect which only runs on the cleanup of the last effect */
export function useWillUnMountEffect(callback: () => void) {
  React.useEffect(() => callback, []);
}

/** A useLayoutEffect which only runs on the cleanup of the last effect */
export function useWillUnMountLayoutEffect(callback: () => void) {
  React.useLayoutEffect(() => callback, []);
}
