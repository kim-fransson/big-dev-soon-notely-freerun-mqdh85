import { useState } from "react";
import { Listbox } from "@headlessui/react";

export type SelectOption = {
  key: string | number;
  value: string;
  disabled?: boolean;
};

export type SelectProps<T extends SelectOption> = {
  options: T[];
  placeholder?: string;
};

export const Select = <T extends SelectOption>(props: SelectProps<T>) => {
  const { options, placeholder } = props;
  const [selectedOption, setSelectedOption] = useState<T>(options[0]);

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <Listbox.Button>
        {selectedOption?.value || placeholder || "Select"}
      </Listbox.Button>
      <Listbox.Options>
        {options.map((option) => (
          <Listbox.Option
            key={option.key}
            value={option}
            disabled={option.disabled}
          >
            {option.value}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
