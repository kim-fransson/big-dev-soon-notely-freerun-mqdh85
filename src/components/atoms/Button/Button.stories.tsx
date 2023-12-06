import { Button } from "./Button";
import type { Meta, StoryObj } from "@storybook/react";

import TrashIcon from "@icons/delete-icon.svg?react";

const meta: Meta<typeof Button> = {
  component: Button,
  argTypes: {
    onClick: {
      action: "button clicked",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: "Button",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary",
    intent: "primary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    intent: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    intent: "danger",
  },
};

export const Icon: Story = {
  args: {
    children: <TrashIcon />,
    intent: "icon",
  },
};
