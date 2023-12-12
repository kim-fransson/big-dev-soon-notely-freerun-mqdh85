import { NoteForm, NoteFormValues } from "@/components/molecules/NoteForm";
import { Dialog } from "@/components/molecules/Dialog";
import { Navbar } from "@/components/organisms/Navbar";
import { NoteList } from "@/components/organisms/NoteList";
import { NotesContext } from "@/contexts";
import { notesReducer } from "@/reducers";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import { CategoryTabs, categories } from "@/components/molecules/CategoryTabs";
import { Checkbox } from "@/components/atoms/Checkbox";

// todo: write interaction tests?
// todo: screen responsivness
export const Notes = () => {
  const [localStorageNotes, saveNotes] = useLocalStorage<Note[]>("notes", []);
  const [notes, dispatch] = useReducer(notesReducer, localStorageNotes);

  useEffect(() => {
    saveNotes(notes);
  }, [notes, saveNotes]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<Category>(categories[0]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const closeAddNoteDialog = () => setShowAddNoteDialog(false);
  const openAddNoteDialog = () => setShowAddNoteDialog(true);

  const handleSubmit = (values: NoteFormValues) => {
    dispatch({
      type: "ADD_NOTE",
      note: {
        ...values,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: uuidv4(),
        state: "inbox",
      },
    });
    closeAddNoteDialog();
    setCategoryFilter(values.category);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <Navbar
        onChange={handleSearch}
        onSearch={handleSearch}
        onAdd={openAddNoteDialog}
      />
      <main className="p-8">
        <h2 className="header-s text-gray-900/87 mb-7">Your Notes</h2>
        <div className="flex justify-between items-center mb-8">
          <CategoryTabs
            activeCategory={categoryFilter}
            onCategoryChanged={setCategoryFilter}
          />
          <Checkbox isSelected={showArchived} onChange={setShowArchived}>
            Show only completed notes
          </Checkbox>
        </div>
        <NoteList
          searchTerm={debouncedSearchTerm}
          categoryFilter={categoryFilter}
          stateFilter={showArchived ? "archived" : undefined}
        />
      </main>
      <Dialog
        open={showAddNoteDialog}
        onClose={closeAddNoteDialog}
        heading="add note"
        dialogChildren={
          <NoteForm onSubmit={handleSubmit} onCancel={closeAddNoteDialog} />
        }
      />
    </NotesContext.Provider>
  );
};
