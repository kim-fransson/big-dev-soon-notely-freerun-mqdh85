import { Button } from "@/components/atoms/Button";
import { Category } from "@/components/atoms/Category";
import { DateTime } from "luxon";
import PenIcon from "@icons/edit-icon.svg?react";
import TrashIcon from "@icons/delete-icon.svg?react";
import CheckboxIcon from "@icons/checkbox-icon.svg?react";

export type NoteCardProps = {
  note: Note;
  onArchiveNote: () => void;
  onDeleteNote: () => void;
  onEditNote: () => void;
};

// todo: modal for full description?
// todo: tooltip for icon buttons
export const NoteCard = (props: NoteCardProps) => {
  const { onArchiveNote, onDeleteNote, onEditNote } = props;
  const { title, description, category, createdAt } = props.note;
  const timestamp = DateTime.fromJSDate(createdAt).toFormat("dd.MM.yyyy");
  return (
    <div className="rounded-2xl bg-white shadow-md p-5 overflow-hidden max-w-sm">
      <div className="flex justify-end items-center mb-3">
        <Category
          className="mr-auto"
          color={mapCategoryToColor(category.value)}
        >
          {category.value}
        </Category>
        <Button className="ml-4" intent="icon" onClick={() => onArchiveNote()}>
          <CheckboxIcon />
        </Button>
        <Button intent="icon" onClick={() => onEditNote()}>
          <PenIcon />
        </Button>
        <Button intent="icon" onClick={() => onDeleteNote()}>
          <TrashIcon />
        </Button>
      </div>
      <h2 className="header-s text-gray-900/87 leading-8 mb-2">{title}</h2>
      <div className="h-[75px] overflow-hidden">
        <p className="body text-gray-900/87 line-clamp-3 w-full">
          {description}
        </p>
      </div>
      <p className="mt-2 caption text-gray-900/60 text-right">{timestamp}</p>
    </div>
  );
};

const mapCategoryToColor = (
  categoryType: CategoryType,
): CategoryColorMap[CategoryType] => {
  switch (categoryType) {
    case "personal":
      return "orange";
    case "home":
      return "green";
    case "business":
      return "purple";
    default:
      return "orange"; // Default to orange if the category type is not recognized
  }
};
