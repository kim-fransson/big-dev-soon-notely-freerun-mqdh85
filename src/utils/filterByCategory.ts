export const filterByCategory = (note: Note, category?: Category) => {
  if (!category || category.value === "all") {
    return true;
  }
  return note.category.value === category.value;
};
