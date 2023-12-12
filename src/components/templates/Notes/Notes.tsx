import { NoteForm, NoteFormValues } from "@/components/molecules/NoteForm";
import { Dialog } from "@/components/molecules/Dialog";
import { Navbar } from "@/components/organisms/Navbar";
import { NoteList } from "@/components/organisms/NoteList";
import { NotesContext } from "@/contexts";
import { notesReducer } from "@/reducers";
import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDebounce } from "@uidotdev/usehooks";
import { CategoryTabs, categories } from "@/components/molecules/CategoryTabs";
import { Checkbox } from "@/components/atoms/Checkbox";
import EmptyStateIcon from "@icons/no-notes-illustration.svg?react";

export const Notes = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
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
        createdAt: new Date(),
        updatedAt: new Date(),
        id: uuidv4(),
        state: "inbox",
      },
    });
    closeAddNoteDialog();
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
          <CategoryTabs onCategoryChanged={setCategoryFilter} />
          <Checkbox isSelected={showArchived} onChange={setShowArchived}>
            Show only completed notes
          </Checkbox>
        </div>
        <NoteList
          searchTerm={debouncedSearchTerm}
          categoryFilter={categoryFilter}
          stateFilter={showArchived ? "archived" : undefined}
        />
        {notes.length === 0 && !searchTerm && (
          <div className="mx-auto flex flex-col gap-4 items-center mt-20">
            <EmptyStateIcon />
            <span className="header-xs text-gray-900">
              You don't have any notes
            </span>
          </div>
        )}
      </main>
      <Dialog
        open={showAddNoteDialog}
        onClose={closeAddNoteDialog}
        title="add note"
        dialogChildren={
          <NoteForm onSubmit={handleSubmit} onCancel={closeAddNoteDialog} />
        }
      />
    </NotesContext.Provider>
  );
};
