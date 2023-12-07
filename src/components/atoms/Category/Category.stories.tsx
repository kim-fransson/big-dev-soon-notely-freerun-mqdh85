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

export const Orange: Story = {
  args: {
    children: "Orange",
    color: "orange",
  },
};

export const Green: Story = {
  args: {
    children: "Green",
    color: "green",
  },
};

export const Purple: Story = {
  args: {
    children: "Purple",
    color: "purple",
  },
};

export const Red: Story = {
  args: {
    children: "Red",
    color: "red",
  },
};

export const Blue: Story = {
  args: {
    children: "Blue",
    color: "blue",
  },
};
