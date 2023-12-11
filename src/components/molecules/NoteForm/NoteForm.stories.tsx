import { NoteForm } from "./NoteForm";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NoteForm> = {
  component: NoteForm,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: {
      action: "form submitted",
    },
    onCancel: {
      action: "cancel",
    },
  },
};
export default meta;

type Story = StoryObj<typeof NoteForm>;

export const Playground: Story = {
  args: {},
};
