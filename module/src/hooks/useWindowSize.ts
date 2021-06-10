import * as React from 'react';

import { Globals } from '../utils/globals';

export interface IWindowSize {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
}

export function useWindowSize() {
  const [size, setSize] = React.useState<IWindowSize>({ innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 });

  const onResize = React.useCallback(() => {
    if (Globals.Window) {
      const { innerHeight, innerWidth, outerHeight, outerWidth } = Globals.Window;
      setSize({ innerHeight, innerWidth, outerHeight, outerWidth });
    }
  }, []);

  React.useEffect(() => {
    onResize();
    Globals.Document?.body.addEventListener('resize', onResize, { capture: true, passive: true });

    return () => {
      Globals.Document?.body.removeEventListener('resize', onResize, { capture: true });
    };
  }, [onResize]);

  return size;
}
