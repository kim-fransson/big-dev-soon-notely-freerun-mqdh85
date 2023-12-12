import { RefObject, useRef } from "react";
import { AriaListBoxProps, useListBox, useOption } from "react-aria";
import { ListState, Node, useListState } from "react-stately";

export type ListBoxProps<T extends object> = {
  listBoxRef?: RefObject<HTMLUListElement>;
  state?: ListState<T>;
} & AriaListBoxProps<T>;

export const ListBox = <T extends object>(props: ListBoxProps<T>) => {
  const ref = useRef(null);
  const listState = useListState(props);
  const { listBoxRef = ref, state = listState } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full rounded-lg outline-none overflow-hidden mt-2 shadow-md border-black/12"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
};

const Option = ({
  item,
  state,
}: {
  item: Node<unknown>;
  state: ListState<unknown>;
}) => {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    ref,
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`capitalize input py-3 px-4 truncate outline-none cursor-pointer ${
        isSelected || isFocused
          ? "bg-blue-500 text-gray-100"
          : "bg-white text-gray-900/87"
      }`}
    >
      {item.rendered}
    </li>
  );
};
