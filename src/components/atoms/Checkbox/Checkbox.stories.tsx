import { useState } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};
export default meta;

const CheckboxWithState = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  return <Checkbox {...args} isSelected={checked} onChange={setChecked} />;
};

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  args: {},
  render: (args) => (
    <CheckboxWithState {...args}>Checkbox label</CheckboxWithState>
  ),
};
