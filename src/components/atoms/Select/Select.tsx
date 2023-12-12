import { RefObject, useRef } from "react";
import {
  AriaButtonProps,
  AriaSelectProps,
  HiddenSelect,
  useButton,
  useSelect,
} from "react-aria";
import { useSelectState } from "react-stately";
import { Popover } from "../Popover";
import { ListBox } from "../ListBox";
import CarretDown from "@icons/carret-icon.svg?react";

export type SelectProps<T> = AriaSelectProps<T>;

export const Select = <T extends object>(props: SelectProps<T>) => {
  const state = useSelectState(props);

  const ref = useRef<HTMLButtonElement>(null);
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref,
  );

  return (
    <div style={{ display: "inline-block" }}>
      <div
        {...labelProps}
        className="label select-none text-gray-900/87 capitalize mb-1"
      >
        {props.label}
      </div>
      <HiddenSelect
        isDisabled={props.isDisabled}
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button {...triggerProps} buttonRef={ref}>
        <span {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : "Select an option"}
        </span>
        <CarretDown
          aria-hidden="true"
          className={`ml-auto h-6 w-6 transition-transform ${
            state.isOpen && "-rotate-180"
          }`}
        />
      </Button>
      {state.isOpen && (
        <Popover
          width={ref.current ? ref.current.offsetWidth : "auto"}
          state={state}
          triggerRef={ref}
          placement="bottom start"
        >
          <ListBox children={[]} {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  );
};

const Button = (
  props: AriaButtonProps & { buttonRef: RefObject<HTMLButtonElement> },
) => {
  const ref = props.buttonRef;
  const { buttonProps } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className="w-full outline-none relative capitalize text-gray-900/87 input rounded-lg border-2 
      border-black/12 bg-gray-200 flex px-3 py-2 gap-2.5 items-center focus:border-blue-500 truncate"
    >
      {props.children}
    </button>
  );
};
