import { Button } from "@/components/atoms/Button";
import { Category } from "@/components/atoms/Category";
import { DateTime } from "luxon";
import PenIcon from "@icons/edit-icon.svg?react";
import TrashIcon from "@icons/delete-icon.svg?react";
import { Checkbox } from "@/components/atoms/Checkbox";
import { mapCategoryToColor } from "@/utils";

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
  const { title, description, category, createdAt, state } = props.note;

  const isArchived = state === "archived";

  const timestamp = DateTime.fromJSDate(createdAt).toFormat("dd.MM.yyyy");
  return (
    <div
      className={`rounded-2xl shadow-md p-5 overflow-hidden max-w-sm ${
        isArchived ? "bg-white/24" : "bg-white"
      }`}
    >
      <div className="flex justify-end items-center mb-3">
        <Category
          className={`mr-auto ${
            isArchived && "bg-gray-900/36 text-gray-900/36"
          }`}
          color={mapCategoryToColor(category)}
        >
          {category}
        </Category>
        <Checkbox
          aria-label="archive note"
          isSelected={isArchived}
          onChange={onArchiveNote}
        />
        <Button intent="icon" onPress={() => onEditNote()}>
          <PenIcon />
        </Button>
        <Button intent="icon" onPress={() => onDeleteNote()}>
          <TrashIcon />
        </Button>
      </div>
      <h2
        className={`header-s leading-8 mb-2 ${
          isArchived
            ? "text-gray-900/36 line-through decoration-gray-900/36 decoration-2"
            : "text-gray-900/87"
        }`}
      >
        {title}
      </h2>
      <div className="h-[75px] overflow-hidden">
        <p
          className={`body line-clamp-3 w-full ${
            isArchived
              ? "text-gray-900/36 line-through decoration-gray-900/36 decoration-2"
              : "text-gray-900/87"
          }`}
        >
          {description}
        </p>
      </div>
      <p
        className={`mt-2 caption text-gray-900/60 text-right ${
          isArchived ? "text-gray-900/36" : "text-gray-900/60"
        }`}
      >
        {timestamp}
      </p>
    </div>
  );
};
