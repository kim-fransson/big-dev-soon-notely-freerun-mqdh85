import { useState } from "react";
import { Select, SelectOption, SelectProps } from "./Select";
import type { Meta, StoryObj } from "@storybook/react";

const demigods = [
  { key: 1, value: "Starscourge Radahn" },
  { key: 2, value: "Malenia, The Blade Of Miquella" },
  { key: 3, value: "Morgott The Omen King" },
  { key: 4, value: "Ranni The Witch" },
  { key: 5, value: "Godwyn The Golden" },
  { key: 6, value: "Mohg, Lord Of Blood" },
  { key: 7, value: "Rykard, Lord Of Blasphemy" },
  { key: 8, value: "Miquella" },
  { key: 9, value: "Godrick The Grafted" },
];

const SelectWithState = (args: SelectProps<SelectOption>) => {
  const [selected, setSelected] = useState(args.options[0]);

  return <Select {...args} selectedValue={selected} onChange={setSelected} />;
};

const meta: Meta<typeof Select> = {
  component: Select,
  args: {},
  argTypes: {
    onChange: {
      actions: "option selected",
    },
  },
  render: (args) => <SelectWithState {...args} />,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  args: {
    options: demigods,
    label: "Select your demigod",
  },
};
