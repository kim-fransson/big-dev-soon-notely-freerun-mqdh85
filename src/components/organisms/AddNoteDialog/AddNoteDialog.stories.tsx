import { useState } from "react";
import { AddNoteDialog, AddNoteDialogProps } from "./AddNoteDialog";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";

const DialogWithState = (props: AddNoteDialogProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} intent="primary">
        Open dialog
      </Button>
      <AddNoteDialog
        {...props}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

const meta: Meta<typeof AddNoteDialog> = {
  component: AddNoteDialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  render: (args) => <DialogWithState {...args} />,
};
export default meta;

type Story = StoryObj<typeof AddNoteDialog>;

export const Playground: Story = {
  args: {},
};
