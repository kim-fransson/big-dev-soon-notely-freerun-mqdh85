import { HTMLAttributes, useRef } from "react";
import type { AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";
import { twMerge } from "tailwind-merge";

export const TextArea = (
  props: AriaTextFieldProps & HTMLAttributes<HTMLDivElement>,
) => {
  const { label, className, isRequired, maxLength } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { labelProps, inputProps } = useTextField(
    {
      ...props,
      inputElementType: "textarea",
    },
    textAreaRef,
  );

  return (
    <div className={twMerge("inline-flex flex-col gap-1", className)}>
      <label
        {...labelProps}
        className="capitalize label text-gray-900/87 select-none flex items-center gap-1"
      >
        {label}
        {!isRequired && (
          <span className="body text-gray-900/60">(optional)</span>
        )}
        {maxLength && textAreaRef.current && (
          <span className="ml-auto caption text-gray-900/60">
            {textAreaRef.current.value.length} / {maxLength}{" "}
          </span>
        )}
      </label>
      <textarea
        {...inputProps}
        ref={textAreaRef}
        className="rounded-lg p-3 input text-gray-900/87 placeholder:text-gray-900/60 bg-gray-200 border border-black/12 active:outline-blue-500"
      />
    </div>
  );
};
