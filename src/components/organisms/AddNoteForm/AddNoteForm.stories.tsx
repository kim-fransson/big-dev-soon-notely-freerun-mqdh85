import { AddNoteForm } from "./AddNoteForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AddNoteForm> = {
  component: AddNoteForm,
  argTypes: {
    onSubmit: {
      action: "note created",
    },
  },
};
export default meta;

type Story = StoryObj<typeof AddNoteForm>;

export const Playground: Story = {
  args: {},
};
