import { HTMLAttributes, useRef } from "react";
import { AriaTextFieldProps, useTextField } from "react-aria";

export const TextField = (
  props: AriaTextFieldProps & HTMLAttributes<HTMLDivElement>,
) => {
  const { label } = props;
  const inputRef = useRef(null);
  const {
    labelProps,
    inputProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, inputRef);

  return (
    <div className="inline-flex flex-col gap-1">
      <label
        {...labelProps}
        className="capitalize label text-gray-900/87 select-none"
      >
        {label}
      </label>
      <input
        {...inputProps}
        className="placeholder:text-gray-900/60 text-gray-900/87 py-2 px-3 selection:bg-blue-200 rounded-lg border border-black/12 bg-gray-200 focus:outline-blue-500 "
        ref={inputRef}
      />
      {isInvalid && (
        <div {...errorMessageProps} className="caption text-red-400">
          {validationErrors.join(" ")}
        </div>
      )}
    </div>
  );
};
