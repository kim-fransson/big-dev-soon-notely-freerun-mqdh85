import { AddNoteForm } from "./AddNoteForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AddNoteForm> = {
  component: AddNoteForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: {
      action: "note created",
    },
    onCancel: {
      action: "cancel",
    },
  },
};
export default meta;

type Story = StoryObj<typeof AddNoteForm>;

export const Playground: Story = {
  args: {},
};
