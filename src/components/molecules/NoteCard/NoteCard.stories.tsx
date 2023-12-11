import { NoteCard } from "./NoteCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NoteCard> = {
  component: NoteCard,
  parameters: {},
  argTypes: {
    onArchiveNote: { action: "archive note" },
    onDeleteNote: { action: "delete note" },
    onEditNote: { action: "edit note" },
  },
};
export default meta;

type Story = StoryObj<typeof NoteCard>;

export const Playground: Story = {
  args: {
    note: {
      id: "1",
      title: "Title",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      category: {
        key: "1",
        value: "personal",
      },
      state: "inbox",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const Personal: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      category: {
        key: "1",
        value: "personal",
      },
    } as Note,
  },
};

export const Business: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      category: {
        key: "2",
        value: "business",
      },
    } as Note,
  },
};

export const Home: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      category: {
        key: "3",
        value: "home",
      },
    } as Note,
  },
};

export const NoDescription: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      description: undefined,
    } as Note,
  },
};

export const LongDescription: Story = {
  args: {
    note: {
      ...Playground.args!.note,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi uti.",
    } as Note,
  },
};
