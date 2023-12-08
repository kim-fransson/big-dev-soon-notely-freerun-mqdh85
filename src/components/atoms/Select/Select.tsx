import { Listbox, Transition } from "@headlessui/react";
import CarretDown from "@icons/carret-icon.svg?react";

export type SelectOption = {
  key: string | number;
  value: string;
  disabled?: boolean;
};

export type SelectProps<T extends SelectOption> = {
  options: T[];
  selectedValue: T;
  onChange: (value: T) => void;
  label: string;
};

export const Select = <T extends SelectOption>(props: SelectProps<T>) => {
  const { options, onChange, selectedValue, label } = props;

  return (
    <div className="w-full">
      <Listbox value={selectedValue} onChange={onChange}>
        <Listbox.Label className="label select-none text-gray-900/87 capitalize mb-1 block">
          {label}
        </Listbox.Label>
        <Listbox.Button className="w-full relative capitalize text-gray-900/87 input rounded-lg border border-black/12 bg-gray-200 flex px-3 py-2 gap-2.5 items-center active:outline-blue-500 truncate">
          {selectedValue?.value}
          <CarretDown className="ml-auto h-6 w-6 transition-transform ui-open:-rotate-180" />
        </Listbox.Button>
        <Transition
          enter="transition duration-100 ease-out origin-top"
          enterFrom="transform scale-y-95 opacity-0"
          enterTo="transform scale-y-100 opacity-100"
          leave="transition duration-75 ease-out origin-top"
          leaveFrom="transform scale-y-100 opacity-100"
          leaveTo="transform scale-y-95 opacity-0"
        >
          <Listbox.Options className="absolute w-full rounded-lg outline-none overflow-hidden mt-2 shadow-md border border-black/12">
            {options.map((option) => (
              <Listbox.Option
                key={option.key}
                value={option}
                disabled={option.disabled}
                className="capitalize input py-3 px-4 ui-active:bg-blue-500 ui-active:text-gray-100 ui-not-active:bg-white ui-not-active:text-gray-900/87 truncate"
              >
                {option.value}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
};
