import * as React from 'react';

import { ArmstrongId, Form, IArmstrongExtendedOption } from '../..';
import { useOverridableState } from '../../hooks';
import { IBindingProps } from '../../hooks/form';
import { ClassNames } from '../../utils/classNames';
import { Icon, IconSet, IconUtils, IIcon } from '../icon';
import { IInputWrapperProps } from '../inputWrapper';
import { OptionContent } from '../optionContent';
import { Status } from '../status';
import { ValidationErrors } from '../validationErrors';

export interface ICheckboxInputProps
  extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'type'>,
    Pick<
      IInputWrapperProps,
      'scrollValidationErrorsIntoView' | 'validationMode' | 'errorIcon' | 'disabled' | 'pending' | 'error' | 'validationErrorMessages'
    >,
    Pick<IArmstrongExtendedOption<ArmstrongId>, 'content' | 'name' | 'leftIcon' | 'rightIcon'> {
  /**  prop for binding to an Armstrong form binder (see forms documentation) */
  bind?: IBindingProps<boolean>;

  /** CSS className property */
  className?: string;

  /** icon to render on the input when checked */
  checkedIcon?: IIcon<IconSet>;

  /** icon to render on the input when not checked */
  uncheckedIcon?: IIcon<IconSet>;

  /** fired when the value changes */
  onValueChange?: (newValue: boolean) => void;

  /** props to spread onto the input element */
  inputProps?: Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'type' | 'ref' | 'checked'>;

  /** the direction for the content to flow */
  direction?: 'vertical' | 'horizontal';

  /** should hide the checkbox itself, showing only the label, allowing you to handle visualising the state of the input yourself */
  hideCheckbox?: boolean;
}

/** Render a checkbox that uses DOM elements allow for easier styling */
export const CheckboxInput = React.forwardRef<HTMLInputElement, ICheckboxInputProps>(
  (
    {
      bind,
      validationErrorMessages,
      validationMode,
      className,
      errorIcon,
      error,
      pending,
      disabled,
      checked,
      onChange,
      checkedIcon,
      content,
      uncheckedIcon,
      leftIcon,
      rightIcon,
      scrollValidationErrorsIntoView,
      onValueChange,
      inputProps,
      direction,
      name,
      hideCheckbox,
      ...nativeProps
    }: ICheckboxInputProps,
    ref
  ) => {
    const [boundValue, setBoundValue, bindConfig] = Form.useBindingTools(bind, {
      value: checked,
      validationErrorMessages,
      validationErrorIcon: errorIcon,
      validationMode,
      onChange: onValueChange,
    });

    // use an overridable internal state so it can be used without a binding
    const [isChecked, setIsChecked] = useOverridableState(checked, boundValue, setBoundValue);

    const onChangeEvent = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.currentTarget.checked);
        onChange?.(event);
      },
      [bind, onChange]
    );

    return (
      <>
        <div
          className={ClassNames.concat('arm-input', 'arm-checkbox-input', className)}
          data-disabled={disabled || pending}
          data-error={error || !!validationErrorMessages?.length}
          data-checked={isChecked}
          data-direction={direction}
          {...nativeProps}
        >
          <input
            className="arm-checkbox-input-checkbox-input"
            onChange={onChangeEvent}
            type="checkbox"
            ref={ref}
            checked={isChecked}
            {...inputProps}
          />

          <label>
            {!hideCheckbox && (
              <div className="arm-checkbox-input-checkbox">
                {checkedIcon && <Icon className="arm-checkbox-input-checked-icon" iconSet={checkedIcon.iconSet} icon={checkedIcon.icon} />}
                {uncheckedIcon && <Icon className="arm-checkbox-input-unchecked-icon" iconSet={uncheckedIcon.iconSet} icon={uncheckedIcon.icon} />}
              </div>
            )}

            <OptionContent content={content} name={name} leftIcon={leftIcon} rightIcon={rightIcon} isActive={checked} />

            <Status
              error={bindConfig.shouldShowValidationErrorIcon && (!!bindConfig?.validationErrorMessages?.length || error)}
              pending={pending}
              errorIcon={bindConfig.validationErrorIcon}
            />
          </label>
        </div>

        {!!bindConfig.validationErrorMessages?.length && bindConfig.shouldShowValidationErrorMessage && (
          <ValidationErrors
            validationErrors={bindConfig.validationErrorMessages}
            icon={bindConfig.validationErrorIcon}
            scrollIntoView={scrollValidationErrorsIntoView}
          />
        )}
      </>
    );
  }
);

CheckboxInput.defaultProps = {
  checkedIcon: IconUtils.getIconDefinition('Icomoon', 'checkmark3'),
  validationMode: 'both',
  direction: 'horizontal',
};
