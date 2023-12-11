import { AddNoteDialog } from "@/components/organisms/AddNoteDialog";
import { Navbar } from "@/components/organisms/Navbar";
import { NoteList } from "@/components/organisms/NoteList";
import { NotesContext } from "@/contexts";
import { notesReducer } from "@/reducers";
import { useReducer, useState } from "react";

export const Notes = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <Navbar onSearch={() => {}} onAdd={() => setShowAddNoteDialog(true)} />
      <main className="p-8 max-w">
        <NoteList />
      </main>
      <AddNoteDialog
        open={showAddNoteDialog}
        onClose={() => setShowAddNoteDialog(false)}
      />
    </NotesContext.Provider>
  );
};
