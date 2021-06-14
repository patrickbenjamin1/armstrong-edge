import * as React from 'react';
import { ToastProvider } from '../src';

import { ModalProvider } from '../src/components/modal/modal.context';

export const decorators = [
  (Story) => {
    return (
      <div id="host">
        <ModalProvider>
          <div className="story-wrapper">
            <Story />
          </div>
        </ModalProvider>
      </div>
    );
  },
];
