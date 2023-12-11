import { CategoryTabs } from "./CategoryTabs";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CategoryTabs> = {
  component: CategoryTabs,
  argTypes: {
    onCategoryChanged: {
      action: "category changed",
    },
  },
};
export default meta;

type Story = StoryObj<typeof CategoryTabs>;

export const Playground: Story = {
  args: {},
};
