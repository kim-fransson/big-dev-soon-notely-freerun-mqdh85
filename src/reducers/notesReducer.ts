export const notesReducer = (notes: Note[], action: NoteAction): Note[] => {
  switch (action.type) {
    case "ADD_NOTE": {
      return [...notes, { ...action.note }];
    }

    case "UPDATE_NOTE": {
      return notes.map((note) =>
        note.id === action.note.id ? { ...note, ...action.note } : note,
      );
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
