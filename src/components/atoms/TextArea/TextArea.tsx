import { HTMLAttributes, RefObject, useRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";
import { twMerge } from "tailwind-merge";

export type TextAreaProps = {
  textAreaRef?: RefObject<HTMLTextAreaElement>;
} & AriaTextFieldProps &
  HTMLAttributes<HTMLDivElement>;

export const TextArea = (props: TextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const {
    label,
    className,
    isRequired,
    maxLength,
    textAreaRef = ref,
    value,
  } = props;
  const { labelProps, inputProps } = useTextField(
    {
      ...props,
      inputElementType: "textarea",
    },
    textAreaRef,
  );

  console.log({
    limitReached: value?.length === maxLength,
  });

  return (
    <div className={twMerge("inline-flex flex-col gap-1", className)}>
      <label
        {...labelProps}
        className="capitalize label text-gray-900/87 select-none flex items-center gap-2"
      >
        {label}
        {!isRequired && (
          <span className="body-2 text-gray-900/60 lowercase">(optional)</span>
        )}
        {maxLength && (
          <span
            className={twMerge(
              "ml-auto caption text-gray-900/60",
              value?.length === maxLength && "text-blue-500",
            )}
          >
            {value?.length || 0} / {maxLength}{" "}
          </span>
        )}
      </label>
      <textarea
        {...inputProps}
        ref={textAreaRef}
        className="flex-1 rounded-lg outline-none px-3 py-2 input text-gray-900/87 placeholder:text-gray-900/60 bg-gray-200 border-2 border-black/12 focus-visible:border-blue-500"
      />
    </div>
  );
};
