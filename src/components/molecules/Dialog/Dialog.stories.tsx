import { useState } from "react";
import { Dialog, DialogProps } from "./Dialog";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/atoms/Button";

const DialogWithState = (props: DialogProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onPress={() => setIsOpen(true)} intent="primary">
        Open dialog
      </Button>
      <Dialog
        {...props}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        heading="dialog"
        dialogChildren={<div>Children goes here</div>}
      />
    </>
  );
};

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  render: (args) => <DialogWithState {...args} />,
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  args: {},
};
