import { AddNoteForm } from "@/components/molecules/AddNoteForm";
import { Dialog } from "@/components/molecules/Dialog";
import { Navbar } from "@/components/organisms/Navbar";
import { NoteList } from "@/components/organisms/NoteList";
import { NotesContext } from "@/contexts";
import { notesReducer } from "@/reducers";
import { useReducer, useState } from "react";

export const Notes = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const closeAddNoteDialog = () => setShowAddNoteDialog(false);
  const openAddNoteDialog = () => setShowAddNoteDialog(true);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <Navbar onSearch={() => {}} onAdd={openAddNoteDialog} />
      <main className="p-8 max-w">
        <NoteList />
      </main>
      <Dialog
        open={showAddNoteDialog}
        onClose={closeAddNoteDialog}
        title="add note"
        dialogChildren={
          <AddNoteForm
            onAdd={closeAddNoteDialog}
            onCancel={closeAddNoteDialog}
          />
        }
      />
    </NotesContext.Provider>
  );
};
