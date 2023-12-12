import CheckboxIcon from "@icons/checkbox-icon.svg?react";
import CheckboxCheckedIcon from "@icons/checkbox-checked-icon.svg?react";
import {
  AriaCheckboxProps,
  VisuallyHidden,
  mergeProps,
  useCheckbox,
  useFocusRing,
} from "react-aria";
import { useToggleState } from "react-stately";
import { useRef } from "react";

export type CheckboxProps = AriaCheckboxProps;

export const Checkbox = (props: CheckboxProps) => {
  const { children } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { inputProps, isSelected, isPressed } = useCheckbox(props, state, ref);

  return (
    <label className="flex items-center gap-2 label select-none">
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div
        className={`w-10 h-10 shrink-0 hover:bg-black/12 text-gray-600 rounded-full inline-flex border-2 
        outline-none justify-center items-center button-text cursor-pointer transition-all active:scale-90
          ${isPressed && "scale-90"} ${
            isFocusVisible ? "border-blue-500" : "border-transparent"
          }`}
      >
        {isSelected ? <CheckboxCheckedIcon /> : <CheckboxIcon />}
      </div>
      {children}
    </label>
  );
};
