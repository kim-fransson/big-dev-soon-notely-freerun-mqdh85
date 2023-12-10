import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { mergeProps, useFocusRing, usePress } from "react-aria";
import { twMerge } from "tailwind-merge";

export type VariantButtonProps = VariantProps<typeof button>;
const button = cva(
  [
    "inline-flex border-2 border-transparent outline-none justify-center items-center button-text cursor-pointer select-none",
    "transition-all active:scale-90",
  ],
  {
    variants: {
      intent: {
        primary: [
          "p-1 md:py-2 md:px-4 gap-2 rounded-[56px] bg-blue-400 text-white border-transparent",
          "hover:bg-blue-500",
        ],
        ghost: [
          "text-gray-600 py-2 px-4 gap-2 rounded-[56px]",
          "hover:text-gray-900/87",
        ],
        danger: [
          "py-2 px-4 bg-red-400 text-white rounded-[56px]",
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

export type ButtonProps = VariantButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;

export const Button = (props: ButtonProps) => {
  const { children, className, intent, ...rest } = props;
  const { pressProps, isPressed } = usePress({});
  const { isFocusVisible, focusProps } = useFocusRing();
  return (
    <button
      {...mergeProps(pressProps, focusProps)}
      {...rest}
      className={twMerge(
        button({ ...rest, intent }),
        isPressed && "scale-90",
        isFocusVisible && ["primary", "danger", ""].includes(intent || "")
          ? "outline-blue-500"
          : isFocusVisible && "border-blue-500",
        className,
      )}
    >
      {children}
    </button>
  );
};
