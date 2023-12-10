import { Notes } from "./Notes";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Notes> = {
  component: Notes,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Notes>;

export const Playground: Story = {
  args: {},
};
