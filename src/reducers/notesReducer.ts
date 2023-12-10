export const notesReducer = (notes: Note[], action: NoteAction) => {
  switch (action.type) {
    case "ADD_NOTE": {
      return [...notes, { ...action.note }];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
