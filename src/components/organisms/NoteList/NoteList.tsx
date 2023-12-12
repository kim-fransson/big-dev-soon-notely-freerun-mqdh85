import { Button } from "@/components/atoms/Button";
import { Category } from "@/components/atoms/Category";
import { Dialog } from "@/components/molecules/Dialog";
import { NoteCard } from "@/components/molecules/NoteCard";
import { NoteForm, NoteFormValues } from "@/components/molecules/NoteForm";
import { NotesContext } from "@/contexts";
import {
  filterByCategory,
  filterByState,
  mapCategoryToColor,
  sortNotes,
} from "@/utils";
import Fuse, { IFuseOptions } from "fuse.js";
import { useContext, useEffect, useState } from "react";
import NoNotesIcon from "@icons/no-notes-illustration.svg?react";
import NoResultsIcon from "@icons/no-search-results-illustration.svg?react";

export type NoteListProps = {
  searchTerm: string;
  categoryFilter?: Category;
  stateFilter?: NoteState;
};

const searchOptions: IFuseOptions<Note> = {
  keys: ["title"] as Array<NoteKeys>,
  threshold: 0.4,
};

export const NoteList = (props: NoteListProps) => {
  const { searchTerm, categoryFilter, stateFilter } = props;

  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false);
  const [isDeleteNoteDialogOpen, setIsDeleteNoteDialogOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note>();
  const { notes, dispatch } = useContext(NotesContext);

  const [activeList, setActiveList] = useState(notes);

  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(notes, searchOptions);
      setActiveList(fuse.search(searchTerm).map((res) => res.item));
    } else {
      setActiveList(notes);
    }
    setActiveList((curr) =>
      curr
        .filter(
          (note) =>
            filterByCategory(note, categoryFilter) &&
            filterByState(note, stateFilter),
        )
        .sort(sortNotes),
    );
  }, [searchTerm, notes, categoryFilter, stateFilter]);

  const closeEditNoteDialog = () => setIsEditNoteDialogOpen(false);
  const openEditNoteDialog = () => setIsEditNoteDialogOpen(true);

  const closeDeleteNoteDialog = () => setIsDeleteNoteDialogOpen(false);
  const openDeleteNoteDialog = () => setIsDeleteNoteDialogOpen(true);

  const onEditNote = (note: Note) => {
    setSelectedNote(note);
    openEditNoteDialog();
  };

  const onDeleteNote = (note: Note) => {
    setSelectedNote(note);
    openDeleteNoteDialog();
  };

  const onArchiveNote = (note: Note) => {
    dispatch({
      type: "TOGGLE_ARCHIVE_NOTE",
      noteId: note.id,
    });
  };

  const handleSubmit = (values: NoteFormValues) => {
    dispatch({
      type: "UPDATE_NOTE",
      note: {
        ...values,
        id: selectedNote!.id,
        updatedAt: new Date(),
      },
    });
    closeEditNoteDialog();
  };

  const handleDelete = () => {
    dispatch({
      type: "DELETE_NOTE",
      noteId: selectedNote!.id,
    });
    closeDeleteNoteDialog();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {activeList.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEditNote={() => onEditNote(note)}
            onDeleteNote={() => onDeleteNote(note)}
            onArchiveNote={() => onArchiveNote(note)}
          />
        ))}
      </div>
      <MessageDisplay
        notes={activeList}
        showArchived={stateFilter === "archived"}
        category={categoryFilter}
        searchTerm={searchTerm}
      />
      <Dialog
        heading="edit note"
        open={isEditNoteDialogOpen}
        onClose={closeEditNoteDialog}
        dialogChildren={
          <NoteForm
            note={selectedNote}
            onSubmit={handleSubmit}
            onCancel={closeEditNoteDialog}
            confirmButtonText="update"
          />
        }
      />
      <Dialog
        heading="delete note"
        open={isDeleteNoteDialogOpen}
        onClose={closeDeleteNoteDialog}
        dialogChildren={
          <div className="flex flex-col gap-6">
            <p className="body text-gray-900/87">
              Are you sure you want to delete this note?
            </p>
            <div className="flex gap-5 justify-end items-center">
              <Button intent="ghost" onPress={closeDeleteNoteDialog}>
                Cancel
              </Button>
              <Button intent="danger" onPress={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
};

const MessageDisplay = (props: {
  notes: Note[];
  showArchived: boolean;
  category?: Category;
  searchTerm?: string;
}) => {
  const { notes, showArchived, category, searchTerm } = props;
  if (notes.length > 0) {
    return null;
  }

  let icon: JSX.Element = <NoNotesIcon />;
  let text: string | JSX.Element = "";

  if (notes.length > 0 && (!category || category === "all")) {
    return null;
  }

  if (notes.length === 0 && !searchTerm) {
    icon = <NoNotesIcon />;
    text = "Oops! No notes here. Time to start your note-taking adventure!";
  }

  if (notes.length === 0 && searchTerm) {
    icon = <NoResultsIcon />;
    text = "Sorry, no notes found. Time to create some magic!";
  }

  if (notes.length === 0 && category && category !== "all" && !searchTerm) {
    icon = <NoNotesIcon />;
    text = (
      <span>
        Sorry, no{" "}
        <Category color={mapCategoryToColor(category)}>{category}</Category>{" "}
        notes found. Time to create some magic!
      </span>
    );
  }

  if (notes.length === 0 && showArchived && !searchTerm) {
    icon = <NoNotesIcon />;
    text = "Oops! No completed notes yet. Keep going, the finish line is near!";
  }

  return (
    <div className="mx-auto flex flex-col gap-4 items-center mt-20">
      {icon}
      <span className="header-xs text-gray-900">{text}</span>
    </div>
  );
};
