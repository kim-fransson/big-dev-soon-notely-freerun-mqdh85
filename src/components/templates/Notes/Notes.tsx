import { AddNoteDialog } from "@/components/organisms/AddNoteDialog/AddNoteDialog";
import { Navbar } from "@/components/organisms/Navbar";
import { NotesContext } from "@/contexts";
import { notesReducer } from "@/reducers";
import { useReducer, useState } from "react";

export const Notes = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <Navbar onSearch={() => {}} onAdd={() => setShowAddNoteDialog(true)} />
      <main>
        <div className="grid grid-cols-4 gap-4">
          {notes.map((note) => (
            <div>{note.title}</div>
          ))}
        </div>
      </main>
      <AddNoteDialog
        open={showAddNoteDialog}
        onClose={() => setShowAddNoteDialog(false)}
      />
    </NotesContext.Provider>
  );
};
