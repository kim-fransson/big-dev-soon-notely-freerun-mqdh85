import { Category } from "./Category";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Category> = {
  component: Category,
};
export default meta;

type Story = StoryObj<typeof Category>;

export const Playground: Story = {
  args: {
    children: "Category",
  },
};
