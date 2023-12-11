import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/molecules/Dialog";
import { NoteCard } from "@/components/molecules/NoteCard";
import { NoteForm, NoteFormValues } from "@/components/molecules/NoteForm";
import { NotesContext } from "@/contexts";
import { useContext, useState } from "react";

export type NoteListProps = {
  onArchiveNote?: () => void;
};

const noop = () => {};

export const NoteList = (props: NoteListProps) => {
  const { onArchiveNote = noop } = props;

  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false);
  const [isDeleteNoteDialogOpen, setIsDeleteNoteDialogOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note>();
  const { notes, dispatch } = useContext(NotesContext);

  const closeEditNoteDialog = () => setIsEditNoteDialogOpen(false);
  const openEditNoteDialog = () => setIsEditNoteDialogOpen(true);

  const closeDeleteNoteDialog = () => setIsDeleteNoteDialogOpen(false);
  const openDeleteNoteDialog = () => setIsDeleteNoteDialogOpen(true);

  const events = {
    onArchiveNote,
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    openEditNoteDialog();
  };

  const handleDeleteNote = (note: Note) => {
    setSelectedNote(note);
    openDeleteNoteDialog();
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
        {notes
          .sort((n1, n2) => (n1.updatedAt >= n2.updatedAt ? -1 : 1))
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              {...events}
              onEditNote={() => handleEditNote(note)}
              onDeleteNote={() => handleDeleteNote(note)}
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
