import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select/Select";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { TextField } from "@/components/atoms/TextField/TextField";

export const AddNoteForm = () => {
  const categories = [
    { key: 1, value: "personal" },
    { key: 2, value: "home" },
    { key: 3, value: "business" },
  ];
  return (
    <form className="flex flex-col gap-8">
      <div className="flex gap-6">
        <TextField label="title" placeholder="Add title" />
        <Select
          label="category"
          options={categories}
          selectedValue={categories[0]}
          onChange={() => {}}
        />
      </div>
      <TextArea
        label="description"
        placeholder="Add description"
        isRequired
        maxLength={200}
      />
      <div className="flex justify-end gap-4">
        <Button intent="ghost" className="col-start-2">
          Cancel
        </Button>
        <Button intent="primary" className="col-start-2">
          Add
        </Button>
      </div>
    </form>
  );
};
