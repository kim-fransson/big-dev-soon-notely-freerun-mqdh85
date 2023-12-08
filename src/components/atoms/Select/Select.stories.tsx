import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  component: Select,
  args: {},
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  args: {
    placeholder: "Select",
    options: [
      { key: 1, value: "Starscourge Radahn" },
      { key: 2, value: "Malenia, The Blade Of Miquella" },
      { key: 3, value: "Morgott The Omen King" },
      { key: 4, value: "Ranni The Witch" },
      { key: 5, value: "Godwyn The Golden" },
      { key: 6, value: "Mohg, Lord Of Blood" },
      { key: 7, value: "Rykard, Lord Of Blasphemy" },
      { key: 8, value: "Miquella" },
      { key: 9, value: "Godrick The Grafted" },
    ],
  },
};
