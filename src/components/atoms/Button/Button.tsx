import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { mergeProps, useFocusRing, usePress } from "react-aria";
import { twMerge } from "tailwind-merge";

export type ButtonProps = VariantProps<typeof button>;
const button = cva(
  [
    "inline-flex outline-none justify-center items-center button-text cursor-pointer select-none",
    "transition-all active:scale-90",
  ],
  {
    variants: {
      intent: {
        primary: [
          "py-3 px-4 gap-2 rounded-[56px] bg-blue-400 text-white",
          "hover:bg-blue-500",
        ],
        ghost: [
          "text-gray-600 py-2.5 px-4 gap-2 rounded-[56px]",
          "hover:text-gray-900/87",
        ],
        danger: [
          "py-2.5 px-4 bg-red-400 text-white rounded-[56px]",
          "hover:bg-red-500",
        ],
        icon: [
          "w-10 h-10 shrink-0 text-gray-600 rounded-full",
          "hover:bg-black/12",
        ],
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  },
);

export const Button = (
  props: ButtonProps &
    ButtonHTMLAttributes<HTMLButtonElement> &
    PropsWithChildren,
) => {
  const { children, className, ...rest } = props;
  const { pressProps, isPressed } = usePress({});
  const { isFocusVisible, focusProps } = useFocusRing();
  return (
    <button
      {...mergeProps(pressProps, focusProps)}
      {...rest}
      className={twMerge(
        button(rest),
        isPressed && "scale-90",
        isFocusVisible && "outline-blue-500",
        className,
      )}
    >
      {children}
    </button>
  );
};
