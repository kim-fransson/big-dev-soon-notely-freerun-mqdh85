import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select/Select";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { TextField } from "@/components/atoms/TextField/TextField";
import { useForm, Controller } from "react-hook-form";
import { RefObject } from "react";

const categories: Category[] = [
  { key: 1, value: "personal" },
  { key: 2, value: "home" },
  { key: 3, value: "business" },
];

export type AddNoteFormValues = {
  title: string;
  category: Category;
  description?: string;
};

export type AddNoteFormProps = {
  onSubmit: (values: AddNoteFormValues) => void;
  onCancel: () => void;
};

export const AddNoteForm = ({ onSubmit, onCancel }: AddNoteFormProps) => {
  const { handleSubmit, control } = useForm<AddNoteFormValues>({
    defaultValues: {
      title: "",
      category: categories[0],
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({
            field: { name, value, onChange, onBlur, ref },
            fieldState: { invalid, error },
          }) => (
            <TextField
              placeholder="Add tile"
              label="title"
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref as unknown as RefObject<HTMLInputElement>}
              isRequired={true}
              isInvalid={invalid}
              errorMessage={error?.message}
            />
          )}
        />
        {/* // todo: having some issue that the option list is not focusable when open */}
        <Controller
          name="category"
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <Select
              label="category"
              options={categories}
              selectedValue={value}
              name={name}
              onChange={onChange}
            />
          )}
        />
      </div>
      <Controller
        name="description"
        control={control}
        render={({ field: { name, value, onChange, onBlur, ref } }) => (
          <TextArea
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            textAreaRef={ref as unknown as RefObject<HTMLTextAreaElement>}
            label="description"
            placeholder="Add description"
            maxLength={200}
            className="min-h-[190px]"
          />
        )}
      />
      <div className="flex justify-end gap-4">
        <Button
          onClick={onCancel}
          type="button"
          intent="ghost"
          className="col-start-2"
        >
          Cancel
        </Button>
        <Button type="submit" intent="primary" className="col-start-2">
          Add
        </Button>
      </div>
    </form>
  );
};
