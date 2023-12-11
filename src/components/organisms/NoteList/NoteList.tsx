import { NoteCard } from "@/components/molecules/NoteCard";
import { NotesContext } from "@/contexts";
import { useContext } from "react";

export type NoteListProps = {
  onArchiveNote?: () => void;
  onDeleteNote?: () => void;
  onEditNote?: () => void;
};

const noop = () => {};

export const NoteList = (props: NoteListProps) => {
  const {
    onArchiveNote = noop,
    onDeleteNote = noop,
    onEditNote = noop,
  } = props;
  const events = { onArchiveNote, onDeleteNote, onEditNote };

  const { notes } = useContext(NotesContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {notes
        .sort((n1, n2) => (n1.createdAt >= n2.createdAt ? -1 : 1))
        .map((note) => (
          <NoteCard key={note.id} note={note} {...events} />
        ))}
    </div>
  );
};
