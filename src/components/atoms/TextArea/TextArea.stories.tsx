import { TextArea } from "./TextArea";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  args: {
    label: "label",
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  args: {
    placeholder: "Write something...",
  },
};
