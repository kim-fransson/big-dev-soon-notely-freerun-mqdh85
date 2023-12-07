import { Button } from "@components/atoms/Button";
import { SearchField } from "@components/atoms/SearchField/SearchField";

import PlusIcon from "@icons/add-icon.svg?react";

export type NavbarProps = {
  onSearch: (searchTerm: string | React.FormEvent<HTMLDivElement>) => void;
  onAdd: () => void;
};

export const Navbar = ({ onSearch, onAdd }: NavbarProps) => {
  return (
    <nav className="flex gap-5 justify-center items-center p-4 overflow-hidden bg-white shadow-md">
      <SearchField
        placeholder="Search"
        aria-label="Search for notes"
        className="max-w-6xl w-full"
        onSubmit={onSearch}
      />
      <Button onClick={onAdd}>
        <PlusIcon />
        <span className="hidden md:inline-block">Add</span>
      </Button>
    </nav>
  );
};
