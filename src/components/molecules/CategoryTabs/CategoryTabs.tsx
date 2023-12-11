import { Tab, TabGroupProps } from "@headlessui/react";
import { categories } from "./categories";

export type CategoryTabsProps = {
  onCategoryChanged: (category: Category) => void;
} & Omit<TabGroupProps<"div">, "onChange">;

export const CategoryTabs = (props: CategoryTabsProps) => {
  const { onCategoryChanged } = props;
  return (
    <Tab.Group
      {...props}
      onChange={(index) => {
        const category = categories[index];
        onCategoryChanged(category);
      }}
    >
      <Tab.List className="border-b border-black/12 inline-block mb-8">
        {categories.map((category) => (
          <Tab
            className={`button-text relative transition-colors w-24 mb-2 outline-none text-gray-900/60 hover:text-gray-900/87 capitalize ui-selected:text-blue-400
            after:absolute after:-bottom-[0.6rem] after:left-0 after:h-0.5 after:w-full after:opacity-0 after:bg-blue-400 after:transition-all after:content-[''] 
            ui-selected:after:opacity-100 ui-focus-visible:outline-blue-400`}
          >
            {category.value}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};
