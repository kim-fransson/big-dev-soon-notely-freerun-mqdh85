import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

export type CategoryProps = VariantProps<typeof category>;
const category = cva(
  ["inline-flex py-1.5 px-3 justify-center items-center body-2 rounded-[28px]"],
  {
    variants: {
      color: {
        orange: ["bg-orange-200 text-orange-900"],
        green: ["bg-green-200 text-green-900"],
        purple: ["bg-deep-purple-200 text-deep-purple-900"],
        blue: ["bg-blue-200 text-blue-900"],
        red: ["bg-red-200 text-red-900"],
      },
    },
    defaultVariants: {
      color: "orange",
    },
  },
);

export const Category = (
  props: CategoryProps & PropsWithChildren & HTMLAttributes<HTMLDivElement>,
) => {
  const { children, className, ...rest } = props;
  return <div className={twMerge(category(rest), className)}>{children}</div>;
};
