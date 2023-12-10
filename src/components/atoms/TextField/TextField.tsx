import { HTMLAttributes, RefObject, useRef } from "react";
import { AriaTextFieldProps, useTextField } from "react-aria";

export type TextFieldProps = {
  errorMessage?: string;
  inputRef?: RefObject<HTMLInputElement>;
} & AriaTextFieldProps &
  HTMLAttributes<HTMLDivElement>;

export const TextField = (props: TextFieldProps) => {
  const ref = useRef(null);
  const { label, inputRef = ref, errorMessage } = props;
  const { labelProps, inputProps, errorMessageProps, isInvalid } = useTextField(
    props,
    inputRef,
  );

  return (
    <div className="inline-flex flex-col gap-1 relative">
      <label
        {...labelProps}
        className="capitalize label text-gray-900/87 select-none"
      >
        {label}
      </label>
      <input
        {...inputProps}
        className={`placeholder:text-gray-900/60 input text-gray-900/87 py-2 px-3 selection:bg-blue-200 rounded-lg border-2 border-black/12 bg-gray-200 outline-none ${
          isInvalid ? "border-red-400" : "focus:border-blue-500"
        }`}
        autoComplete="off"
        ref={inputRef}
      />
      {isInvalid && (
        <div
          {...errorMessageProps}
          className="caption text-red-400 absolute -bottom-5"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};
