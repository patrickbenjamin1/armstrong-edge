import * as React from 'react';

import { Globals } from '../utils/globals';
import { useResizeObserver } from './useResizeObserver';

export type useElementContentRectReturn = [DOMRect, () => void];

/**
 * Get the size of the element with the given ref - uses a resize observer, listens to scroll events, and listens to resize events - if you need to do anything fancier, you'll have to use the second item in the returned array to force a resize
 * @param ref the html element to watch
 */
export function useElementContentRect(ref: React.MutableRefObject<Element | undefined | null>): useElementContentRectReturn {
  const [rect, setRect] = React.useState<DOMRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toJSON: () => {},
  });

  const setRectSize = React.useCallback(() => {
    if (ref.current) {
      const boundingClientRect = ref.current.getBoundingClientRect();

      // todo - optimise so this is only run when one of its values changes
      setRect(boundingClientRect);
    }
  }, [ref.current]);

  useResizeObserver(setRectSize, ref);

  React.useEffect(() => {
    Globals.Document?.addEventListener('resize', setRectSize, { capture: true, passive: true });
    Globals.Document?.addEventListener('scroll', setRectSize, { capture: true, passive: true });

    return () => {
      Globals.Document?.removeEventListener('resize', setRectSize, { capture: true });
      Globals.Document?.removeEventListener('scroll', setRectSize, { capture: true });
    };
  }, [setRectSize]);

  return [rect, setRectSize];
}
