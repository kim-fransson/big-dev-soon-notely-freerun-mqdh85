import { SearchField } from "./SearchField";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  args: {
    "aria-label": "Search field",
  },
  argTypes: {
    onSubmit: {
      action: "search submitted",
    },
  },
};
export default meta;

type Story = StoryObj<typeof SearchField>;

export const Playground: Story = {
  args: {
    placeholder: "What are you searching for...",
  },
};
