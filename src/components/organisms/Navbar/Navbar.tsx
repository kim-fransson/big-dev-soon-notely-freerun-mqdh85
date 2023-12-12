import { Button } from "@components/atoms/Button";
import { SearchField } from "@components/atoms/SearchField/SearchField";

import PlusIcon from "@icons/add-icon.svg?react";

export type NavbarProps = {
  onSearch: (searchTerm: string) => void;
  onChange: (searchTerm: string) => void;
  onAdd: () => void;
};

export const Navbar = ({ onSearch, onAdd, onChange }: NavbarProps) => {
  return (
    <nav className="flex sticky top-0 left-0 right-0 z-20 gap-5 justify-center items-center p-4 overflow-hidden bg-white shadow-md">
      <SearchField
        placeholder="Search"
        aria-label="Search for notes"
        className="max-w-6xl w-full"
        onSubmit={onSearch}
        onChange={onChange}
      />
      <Button onPress={onAdd}>
        <PlusIcon />
        <span className="hidden md:inline-block">Add</span>
      </Button>
    </nav>
  );
};
