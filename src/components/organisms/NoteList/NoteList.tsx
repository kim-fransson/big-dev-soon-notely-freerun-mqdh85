import { Dialog } from "@/components/molecules/Dialog";
import { NoteCard } from "@/components/molecules/NoteCard";
import { NoteForm, NoteFormValues } from "@/components/molecules/NoteForm";
import { NotesContext } from "@/contexts";
import { useContext, useState } from "react";

export type NoteListProps = {
  onArchiveNote?: () => void;
  onDeleteNote?: () => void;
};

const noop = () => {};

export const NoteList = (props: NoteListProps) => {
  const { onArchiveNote = noop, onDeleteNote = noop } = props;

  const [isEditNoteDialogOpen, setIsEditNoteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const { notes, dispatch } = useContext(NotesContext);

  const closeEditNoteDialog = () => setIsEditNoteDialogOpen(false);
  const openEditNoteDialog = () => setIsEditNoteDialogOpen(true);

  const events = {
    onArchiveNote,
    onDeleteNote,
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    openEditNoteDialog();
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
    </>
  );
};
