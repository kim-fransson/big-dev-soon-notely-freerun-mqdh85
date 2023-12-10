import { useSearchFieldState } from "react-stately";
import { AriaSearchFieldProps, useSearchField } from "react-aria";
import { HTMLAttributes, useRef } from "react";

import SearchIcon from "@icons/search-icon.svg?react";
import { twMerge } from "tailwind-merge";

export const SearchField = (
  props: AriaSearchFieldProps & HTMLAttributes<HTMLDivElement>,
) => {
  const state = useSearchFieldState(props);
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputProps } = useSearchField(props, state, inputRef);

  return (
    <div
      className={twMerge(
        "flex overflow-hidden py-1 px-3 items-center rounded-lg bg-gray-200 md:py-3 md:px-6 gap-2.5 text-gray-900/87",
        "outline-none border-2 border-transparent focus-within:border-blue-500",
        props.className,
      )}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <SearchIcon className="shrink-0 hidden md:inline-block" />
      <input
        className="outline-none input bg-transparent placeholder:text-gray-900/60"
        {...inputProps}
        ref={inputRef}
      />
    </div>
  );
};
