import { Button } from "@/components/atoms/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { TextField } from "@/components/atoms/TextField/TextField";
import { useForm, Controller } from "react-hook-form";
import { RefObject } from "react";
import { categories } from "../CategoryTabs";
import { Select } from "@/components/atoms/Select/Select";
import { Item } from "react-stately";

export type NoteFormValues = {
  title: string;
  category: Category;
  description?: string;
};

export type NoteFormProps = {
  note?: Note;
  onCancel: () => void;
  onSubmit: (values: NoteFormValues) => void;
};

export const NoteForm = ({ onCancel, onSubmit, note }: NoteFormProps) => {
  const { handleSubmit, control } = useForm<NoteFormValues>({
    defaultValues: {
      title: note?.title || "",
      category: note?.category || categories[1],
      description: note?.description || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6 items-center">
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
        <Controller
          name="category"
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <Select<{ key: Category; value: Category }>
              label="category"
              items={categories
                .filter((category) => category !== "all")
                .map((category) => ({ key: category, value: category }))}
              selectedKey={value}
              onSelectionChange={onChange}
              name={name}
            >
              {(item) => <Item key={item.key}>{item.value}</Item>}
            </Select>
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
          onPress={onCancel}
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
