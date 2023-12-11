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
  state: NoteState;
};

type NoteAction = AddNoteAction | DeleteNoteAction;

type AddNoteAction = {
  type: "ADD_NOTE";
  note: Note;
};

type DeleteNoteAction = {
  type: "delete_note";
  noteId: number;
};
