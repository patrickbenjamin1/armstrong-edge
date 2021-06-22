import * as React from 'react';

import { ClassNames } from '../../utils/classNames';
import { IInputProps, Input } from '../input/input.component';

/** Wrap up a text input with type=date */
export const NativeDateInput = React.forwardRef<HTMLInputElement, Omit<IInputProps<string>, 'type'>>(({ className, ...props }, ref) => {
  return <Input {...props} className={ClassNames.concat('arm-native-date-input', className)} ref={ref} type="date" />;
});