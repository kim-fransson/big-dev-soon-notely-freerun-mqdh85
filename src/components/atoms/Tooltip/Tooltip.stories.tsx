import { Tooltip } from "./Tooltip";
import type { Meta, StoryObj } from "@storybook/react";

import PenIcon from "@icons/edit-icon.svg?react";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  args: {},
  argTypes: {},
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: {
    text: "edit",
    children: (
      <Button intent="icon" onPress={() => alert("button pressed")}>
        <PenIcon />
      </Button>
    ),
  },
};
