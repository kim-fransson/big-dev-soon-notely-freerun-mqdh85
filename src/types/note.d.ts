type CategoryType = "business" | "personal" | "home";
type Category = {
  key: number | string;
  value: CategoryType;
};

type CategoryColorMap = {
  personal: "orange";
  home: "green";
  business: "purple";
};

type NoteState = "inbox" | "archived";

type Note = {
  id: string;
  title: string;
  category: Category;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  state: NoteState;
};

type NoteAction =
  | AddNoteAction
  | DeleteNoteAction
  | UpdateNoteAction
  | ArchiveNoteAction;

type AddNoteAction = {
  type: "ADD_NOTE";
  note: Note;
};

type UpdateNoteAction = {
  type: "UPDATE_NOTE";
  note: Omit<Note, "createdAt" | "state">;
};

type DeleteNoteAction = {
  type: "DELETE_NOTE";
  noteId: string;
};

type ArchiveNoteAction = {
  type: "TOGGLE_ARCHIVE_NOTE";
  noteId: string;
};
