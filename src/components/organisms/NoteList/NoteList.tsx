import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/molecules/Dialog";
import { NoteCard } from "@/components/molecules/NoteCard";
import { NoteForm, NoteFormValues } from "@/components/molecules/NoteForm";
import { NotesContext } from "@/contexts";
import { filterByCategory, filterByState, sortNotes } from "@/utils";
import Fuse, { IFuseOptions } from "fuse.js";
import { useContext, useState } from "react";

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

  const fuse = new Fuse(notes, searchOptions);

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

  if (notes.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {searchTerm
          ? fuse
              .search(searchTerm)
              .map((res) => res.item)
              .filter(
                (note) =>
                  filterByCategory(note, categoryFilter) &&
                  filterByState(note, stateFilter),
              )
              .sort(sortNotes)
              .map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEditNote={() => onEditNote(note)}
                  onDeleteNote={() => onDeleteNote(note)}
                  onArchiveNote={() => onArchiveNote(note)}
                />
              ))
          : notes
              .filter(
                (note) =>
                  filterByCategory(note, categoryFilter) &&
                  filterByState(note, stateFilter),
              )
              .sort(sortNotes)
              .map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEditNote={() => onEditNote(note)}
                  onDeleteNote={() => onDeleteNote(note)}
                  onArchiveNote={() => onArchiveNote(note)}
                />
              ))}
      </div>
      <Dialog
        title="edit note"
        open={isEditNoteDialogOpen}
        onClose={closeEditNoteDialog}
        dialogChildren={
          <NoteForm
            note={selectedNote}
            onSubmit={handleSubmit}
            onCancel={closeEditNoteDialog}
          />
        }
      />
      <Dialog
        title="delete note"
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
